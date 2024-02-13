import mongoose from "mongoose";
import dotenv from "dotenv";

export const createDBConnection = async () => {
  try {
    dotenv.config();
    const dbURL = process.env.DB_URL;
    await mongoose.connect(dbURL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while creating database connection");
  }
};
