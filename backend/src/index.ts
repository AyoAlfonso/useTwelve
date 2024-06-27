import express from "express";
import cors from "cors";
import DB from "./models";
import * as Email from "./models/Emails";
import { IEmail } from "./models/Emails";
import router from "./router";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

// app.listen(3001, async () => {
//   await sequelize.sync();
//   console.log("Server is running on port 3001");
// });

app.listen(3001, async () => {
  if (typeof DB.sequelize.sync === "function") {
    await DB.sequelize.sync({ alter: false, logging: false, benchmark: true });
    console.log("Database is synced!");
  } else {
    console.error("The connection object does not support syncing.");
  }
  console.log("Server is running on port 3000");
});
