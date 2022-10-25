import mongoose from 'mongoose';
await mongoose.connect('mongodb://localhost:27017/suite_opa')

export { mongoose }