import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 4000;

const prisma = new PrismaClient();

app.listen(port, async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (err) {
    console.error("DB connect failed", err);
  }

  console.log(`Server running at http://localhost:${port}`);
});
