import {
  Column,
  DataType,
  // Sequelize,
  // Model,
} from "sequelize-typescript";
import { DataTypes, Optional, Sequelize, Model } from "sequelize";
import { HttpException } from "../exceptions/HttpException";

export interface IEmail {
  [x: string]: any;
  id?: string;
  email: string;
  messageId: string;
  name?: string;
  amount?: number;
  comments?: string;
  updatedAt?: Date;
  createdAt?: Date;
  deletedAt?: Date;
}

export type EmailCreationAttributes = Optional<
  IEmail,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;

export class EmailModel
  extends Model<IEmail, EmailCreationAttributes>
  implements IEmail
{
  public id!: string;
  public email!: string;
  public messageId!: string;
  public name!: string;
  public amount!: number;
  public comments!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;
}

export default function (sequelize: Sequelize): typeof EmailModel {
  try {
    EmailModel.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        messageId: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: true,
        },
        comments: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        sequelize,
        // paranoid: true,
        tableName: "emails",
      }
    );
  } catch (error) {
    console.log(error);
    throw new HttpException(400, "Errror in Email model");
  }

  return EmailModel;
}
