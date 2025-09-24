import mongoose, { Schema, Document } from "mongoose";

export interface IPage extends Document {
  url: string;
  outgoingLinks: string[];
  incomingLinks: string[];
  lastCrawledAt: Date;
}

const PageSchema: Schema<IPage> = new Schema({
  url: { type: String, required: true, unique: true },
  outgoingLinks: { type: [String], default: [] },
  incomingLinks: { type: [String], default: [] },
  lastCrawledAt: { type: Date, default: Date.now },
});

const Page = mongoose.model<IPage>("Page", PageSchema);
export default Page;
