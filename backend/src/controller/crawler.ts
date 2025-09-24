import { PlaywrightCrawler } from 'crawlee';
import * as cheerio from 'cheerio';
import Page from '../models/schema.js';
import axios from 'axios';
export async function getSitemapUrls(sitemapUrl: string): Promise<string[]> {
    const res = await axios.get(sitemapUrl);
    const $ = cheerio.load(res.data, { xmlMode: true });
    const urls: string[] = [];
    $('loc').each((_, el) => {
        urls.push($(el).text());
    });
    return urls;
}
export async function crawlPage(sitemapUrl: string) {
    const urls = await getSitemapUrls(sitemapUrl);
    const crawler = new PlaywrightCrawler({
        maxRequestsPerCrawl: 100,
        async requestHandler({ request, page, enqueueLinks, log }) {
            try {
                const url = request.loadedUrl;
                const html = await page.content();
                const $ = cheerio.load(html);

                // Collect outgoing links
                const outgoingLinks: string[] = [];
                $('a[href]').each((_, el) => {
                    const link = $(el).attr('href');
                    if (link) {
                        try {
                            outgoingLinks.push(new URL(link, url).toString());
                        } catch {
                            console.log("invalid link");
                            return;
                        }
                    }
                });

                const uniqueOutgoing = [...new Set(outgoingLinks)];

                await Page.findOneAndUpdate(
                    { url },
                    { url, outgoingLinks: uniqueOutgoing, lastCrawledAt: new Date() },
                    { upsert: true, new: true }
                );

                for (const link of uniqueOutgoing) {
                    await Page.findOneAndUpdate(
                        { url: link },
                        { $addToSet: { incomingLinks: url } },
                        { upsert: true }
                    );
                }

                log.info(`Crawled ${url}, found ${uniqueOutgoing.length} outgoing links.`);

                await enqueueLinks({ strategy: 'same-origin' });
            } catch (error) {
                log.error(`Failed to crawl ${request.url}: ${error}`);
            }
        },
    });

    await crawler.run(urls);

    await Page.updateMany({}, [
        { $set: { incomingLinks: { $setUnion: ['$incomingLinks', []] } } }
    ]);

    return await Page.find({ url: { $in: urls } });
}

