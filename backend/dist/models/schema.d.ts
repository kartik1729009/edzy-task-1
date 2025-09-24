import mongoose, { Document } from "mongoose";
export interface IPage extends Document {
    url: string;
    outgoingLinks: string[];
    incomingLinks: string[];
    lastCrawledAt: Date;
}
declare const Page: mongoose.Model<IPage, {}, {}, {}, mongoose.Document<unknown, {}, IPage, {}, {}> & IPage & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Page;
//# sourceMappingURL=schema.d.ts.map