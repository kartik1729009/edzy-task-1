import type { Request, Response } from 'express';
export declare const crawlAndGetLinks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getIncomingLinks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getOutgoingLinks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTopLinkedPages: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=pageController.d.ts.map