import express from "express";
import { sequelize, Sequelize } from "./models";
import { Email } from "./models/Emails";

const app = express();
app.use(express.json());

app.get("/api/emails", async (req, res) => {
  const emails = await Email.findAll();
  res.json(emails);
});

app.post("/api/emails", async (req, res) => {
  const { name, amount, comments } = req.body;
  const email = await Email.create({ name, amount, comments });
  res.json(email);
});

app.listen(3000, async () => {
  await sequelize.sync(); // Ensure the database is synced
  console.log("Server is running on port 3000");
});
