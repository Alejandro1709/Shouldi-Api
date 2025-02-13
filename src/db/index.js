import mongoose from 'mongoose'

export const connectDb = async (uri) => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error(error)
    // process.exit(1);
  }
}
