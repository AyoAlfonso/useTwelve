import DB from "./models";
import * as Email from "./models/Emails"; // Ensure this path is correct
import { IEmail } from "./models/Emails";

const seedData = async () => {
  await DB.sequelize.sync({ force: true }); // This will drop the table if it already exists and create a new one

  let emails: IEmail[] = [
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

  await DB.Emails.bulkCreate(emails);

  console.log("Database seeded successfully.");
};

seedData().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
