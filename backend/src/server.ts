import express from "express";
// import cors from "cors";
import * as Sequelize from "./models";
import { Email } from "./models/Emails";

const app = express();
// app.use(cors());
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

app.put("/api/emails/:id", async (req, res) => {
  const { id } = req.params;
  const { name, amount, comments } = req.body;
  const email = await Email.findByPk(id);
  if (email) {
    email.name = name;
    email.amount = amount;
    email.comments = comments;
    await email.save();
    res.json(email);
  } else {
    res.status(404).json({ error: "Email not found" });
  }
});

app.delete("/api/emails/:id", async (req, res) => {
  const { id } = req.params;
  const email = await Email.findByPk(id);
  if (email) {
    await email.destroy();
    res.json({ message: "Email deleted" });
  } else {
    res.status(404).json({ error: "Email not found" });
  }
});

app.listen(3001, async () => {
  await sequelize.sync();
  console.log("Server is running on port 3001");
});
