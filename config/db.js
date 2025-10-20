import mongoose from "mongoose";

export const connect = () => {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Successfully connected to Mongo database");
      })
      .catch((error) => {
        console.error(error.message);
        process.exit(1);
      });
  };