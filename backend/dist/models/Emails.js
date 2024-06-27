"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModel = void 0;
const sequelize_1 = require("sequelize");
const HttpException_1 = require("../exceptions/HttpException");
class EmailModel extends sequelize_1.Model {
}
exports.EmailModel = EmailModel;
function default_1(sequelize) {
    try {
        EmailModel.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            messageId: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            amount: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: true,
            },
            comments: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            deletedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: null,
            },
        }, {
            sequelize,
            // paranoid: true,
            tableName: "emails",
        });
    }
    catch (error) {
        console.log(error);
        throw new HttpException_1.HttpException(400, "Errror in Email model");
    }
    return EmailModel;
}
exports.default = default_1;
