import express, { Request, Response } from "express";
import cors from "cors";
import DB from "./models";
import fetchEmails from "./fetcher";

import router from "./router";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("*", async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Welcome to the Email Data API" });
});
app.listen(3001, async () => {
  fetchEmails();
  if (typeof DB.sequelize.sync === "function") {
    await DB.sequelize.sync({ alter: false, logging: false, benchmark: true });
    console.log("Database is synced!");
  } else {
    console.error("The connection object does not support syncing.");
  }
  console.log("Server is running on port 3001");
});
