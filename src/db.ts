import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL!);
    if (connection) {
      console.log("Successfully connected to DB");
    }
  } catch (error) {
    throw error;
  }
};
