import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./db";

dotenv.config();

(async () => {
  await connectToDatabase();

  const app = express();

  const port = process.env.PORT || "1337";

  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
})();
