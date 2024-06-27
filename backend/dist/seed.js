"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("./models"));
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.default.sequelize.sync({ force: true }); // This will drop the table if it already exists and create a new one
    let emails = [
        {
            email: "example1@test.com",
            messageId: "123456789",
            name: "John Doe",
            amount: 100,
            comments: "This is a test email",
        },
        {
            email: "example2@test.com",
            messageId: "12345qw289",
            name: "Jane Smith",
            amount: 200,
            comments: "This is another test email",
        },
        {
            email: "example3@test.com",
            messageId: "12312dskfn23456789",
            name: "John Doe",
            amount: 300,
            comments: "This is a test email",
        },
        {
            email: "example4@test.com",
            messageId: "1212122ejiandd",
            name: "Jane Smith",
            amount: 400,
            comments: "This is another test email",
        },
        {
            email: "example5@test.com",
            messageId: "34434212122ejiandd",
            name: "Norra Smit",
            amount: 500,
            comments: "This is a test email",
        },
    ];
    yield models_1.default.Emails.bulkCreate(emails);
    console.log("Database seeded successfully.");
});
seedData().catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
});
