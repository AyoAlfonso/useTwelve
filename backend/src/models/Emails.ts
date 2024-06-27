import { Table, Column, Model, DataType } from "sequelize-typescript";

export interface Email {
  id: number;
  name: string;
  amount: number;
  comments: string;
}

@Table
export class Email extends Model<Email> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comments!: string;
}
