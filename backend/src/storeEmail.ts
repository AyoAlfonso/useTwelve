import { Email } from "./models/Emails"; // Assuming you have defined your models

export const storeEmail = async (
  name: string,
  amount: number,
  comments: string
) => {
  await Email.create({ name, amount, comments });
};
