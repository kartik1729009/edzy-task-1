import { Router } from 'express';
import {
    crawlAndGetLinks,
    getIncomingLinks,
    getOutgoingLinks,
    getTopLinkedPages,
} from '../controller/pageController.js';

const router = Router();

router.post('/crawl', crawlAndGetLinks);

router.post('/incoming', getIncomingLinks);

router.post('/outgoing', getOutgoingLinks);

router.post('/top', getTopLinkedPages);

export default router;
