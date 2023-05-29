import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./db";
import userRoutes from "./routes/user";

dotenv.config();

async function main() {
  await connectToDatabase();

  const app = express();
  app.use(express.json());

  const port = process.env.PORT || "1337";

  app.get("/ping", (req: Request, res: Response) => {
    res.send("pong");
  });

  app.use("/user", userRoutes);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

main();
