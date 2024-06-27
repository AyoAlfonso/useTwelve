// import * as SequelizeOp from "sequelize-typescript";
import Sequelize from "sequelize";
import { Email } from "./Emails";
// import { logger } from "@utils/logger";
const options = {
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
  models: [Email], //
};
// export const sequelize = new Sequelize(options);

const sequelize = new Sequelize.Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),

    timezone: "+09:00",
    pool: {
      min: 0,
      max: 18,
    },
    logQueryParameters: process.env.NODE_ENV === "development",
    logging: (query: string, time: string) => {
      // logger.info(time + "ms" + " " + query);
    },
    benchmark: true,
    dialectOptions: process.env.REMOTE_ENV_DB && {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      keepAlive: true,
    },
    ssl: true,
    define: {
      timestamps: true,
      paranoid: true,
    },
  }
  // { query: { raw: true } },
);

if (sequelize) {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected.");
    })
    .catch((err: any) => {
      console.error("Database connection error:", err);
    });
}
