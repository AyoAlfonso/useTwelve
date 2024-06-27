import { Model, Sequelize } from "sequelize";
// import * as Email from "./Emails"; // Assuming your Email model is exported from Email.ts
// import * as UserModel from "./Users";
import EmailModel, { EmailModel as Email } from "./Emails";

const sequelize = new Sequelize({
  database: "./db.sqlite",
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
});

if (sequelize) {
  // sequelize.authenticate([Email]);

  // Email.EmailModel.sync({ force: true })
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      console.log("Database initialized");
    });
}

const DB = {
  Emails: EmailModel(sequelize),
  sequelize,
  Sequelize,
};
export default DB;
