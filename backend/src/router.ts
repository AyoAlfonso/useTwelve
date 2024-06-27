import express from "express";
import { Router } from "express";
import { CreateEmailDTO, UpdateEmailDTO } from "./dto";

import DB from "./models";
import { IEmail } from "./models/Emails";
const router = Router();

router.get("/api/emails", async (req, res) => {
  const emails: IEmail[] = await DB.Emails.findAll({
    order: [["createdAt", "DESC"]],
  });
  res.json(emails);
});

router.post("/api/emails", async (req, res) => {
  const email_data: CreateEmailDTO = req.body;
  const new_email = await DB.Emails.create(email_data);
  res.json(new_email);
});

router.put("/api/emails/:id", async (req, res) => {
  const { id } = req.params;
  const email_data: UpdateEmailDTO = req.body;
  let email = await DB.Emails.findByPk(id);
  if (email) {
    email = await email.update(email_data, {
      where: { id },
      returning: true,
    });

    res.json(email);
  } else {
    res.status(404).json({ error: "Email not found" });
  }
});

router.delete("/api/emails/:id", async (req, res) => {
  const { id } = req.params;
  const email: IEmail | null = await DB.Emails.findByPk(id);
  if (email) {
    await email.destroy();
    res.json({ message: "Email deleted" });
  } else {
    res.status(404).json({ error: "Email not found" });
  }
});

export default router;
