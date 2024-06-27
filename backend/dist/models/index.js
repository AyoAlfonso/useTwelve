"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// import * as Email from "./Emails"; // Assuming your Email model is exported from Email.ts
// import * as UserModel from "./Users";
const Emails_1 = __importDefault(require("./Emails"));
const sequelize = new sequelize_1.Sequelize({
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
    Emails: (0, Emails_1.default)(sequelize),
    sequelize,
    Sequelize: sequelize_1.Sequelize,
};
exports.default = DB;
