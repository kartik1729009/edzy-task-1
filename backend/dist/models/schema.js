import mongoose, { Schema, Document } from "mongoose";
const PageSchema = new Schema({
    url: { type: String, required: true, unique: true },
    outgoingLinks: { type: [String], default: [] },
    incomingLinks: { type: [String], default: [] },
    lastCrawledAt: { type: Date, default: Date.now },
});
const Page = mongoose.model("Page", PageSchema);
export default Page;
//# sourceMappingURL=schema.js.map