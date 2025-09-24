import type { Request, Response } from 'express';
import Page from '../models/schema.js';
import { crawlPage } from './crawler.js'; // your crawler function

export const crawlAndGetLinks = async (req: Request, res: Response) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: 'URL is required' });

    try {
        // crawlPage now returns an array of Page documents
        const pages = await crawlPage(url);

        if (!pages || pages.length === 0) 
            return res.status(404).json({ message: 'No pages found after crawling' });

        // Format the response
        const result = pages.map(pageDoc => ({
            url: pageDoc.url,
            outgoingLinks: pageDoc.outgoingLinks,
            incomingLinks: pageDoc.incomingLinks,
        }));

        return res.json(result);
    } catch (error: any) {
        console.error(error);         
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


export const getIncomingLinks = async (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ message: 'URL is required' });

        const page = await Page.findOne({ url });
        if (!page) return res.status(404).json({ message: 'Page not found' });

        return res.json({ url: page.url, incomingLinks: page.incomingLinks });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const getOutgoingLinks = async (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ message: 'URL is required' });

        const page = await Page.findOne({ url });
        if (!page) return res.status(404).json({ message: 'Page not found' });

        return res.json({ url: page.url, outgoingLinks: page.outgoingLinks });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
export const getTopLinkedPages = async (req: Request, res: Response) => {
    try {
        const { n } = req.body;
        if (!n || typeof n !== 'number') 
            return res.status(400).json({ message: 'n is required and must be a number' });

        const topPages = await Page.aggregate([
            {
                $project: {
                    url: 1,
                    incomingCount: { $size: '$incomingLinks' } // count incoming links
                }
            },
            { $sort: { incomingCount: -1 } }, // sort descending
            { $limit: n }
        ]);

        return res.json(topPages);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

