import dotenv from "dotenv";
dotenv.config();

import express from "express";
import prisma from './config/prisma'

const app = express();
const port = 4000;

app.listen(port, async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (err) {
    console.error("DB connect failed", err);
  }

  console.log(`Server running at http://localhost:${port}`);
});
