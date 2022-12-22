import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
await mongoose.connect(process.env.URL_MONGO)
export { mongoose }