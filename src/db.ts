import mongoose from 'mongoose'

export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URL) throw new Error('MONGODB_URL not found')

  const connection = await mongoose.connect(process.env.MONGODB_URL)

  if (connection) {
    console.log('Successfully connected to DB')
  }
}
