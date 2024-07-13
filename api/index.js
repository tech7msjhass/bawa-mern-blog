import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("mongoDb is connected");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.listen(4000, () => {
  console.log("Server is Running on port 4000");
});
