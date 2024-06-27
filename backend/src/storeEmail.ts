import * as Email from "./models/Emails"; // Assuming you have defined your models
import DB from "./models";
import { CreateEmailDTO } from "./dto";

export const storeEmail = async (data: CreateEmailDTO) => {
  await DB.Emails.create(data);
};
export const checkEmailExists = async (messageId: string): Promise<boolean> => {
  const database = await DB.Emails.findOne({ where: { messageId } });
  return !!database;
};
