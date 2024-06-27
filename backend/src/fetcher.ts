// import { Imap } from "node-imap";
var Imap = require("imap");
import { ParsedMail, simpleParser } from "mailparser";
import { storeEmail, checkEmailExists } from "./storeEmail";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const imap = new Imap({
  user: process.env.EMAIL,
  password: process.env.EMAIL_PASSWORD,
  host: "imap.gmail.com",
  port: 993,
  tls: true,
});

const openInbox = (cb: Function) => {
  console.log("Inbox Ready");
  imap.openBox("INBOX", true, cb);
};

const processMessage = (msg: any): void => {
  msg.on("body", (stream: any, info: any) => {
    simpleParser(stream, async (err: any, parsed: ParsedMail) => {
      if (err) throw err;

      const amountMatch = parsed.text?.match(
        /Amount: [^\d]*([0-9,]+(?:\.[0-9]+)?)/
      );
      let amount = amountMatch ? amountMatch[1].replace(/[^0-9.]/g, "") : null;

      const comments = parsed.text?.match(
        /(?:Comment|comment|comment_): (.*)/i
      )?.[1];

      const email = parsed.from?.value[0].address;
      const name = parsed.from?.value[0].name;
      const messageId = parsed.messageId;

      if (!messageId) {
        console.error("Message-ID is missing, skipping email.");
        return;
      }
      const emailExists = await checkEmailExists(messageId);
      if (emailExists) {
        console.log(
          `Email with Message-ID ${messageId} already exists in the database, skipping.`
        );
        return;
      }

      if (email && messageId && name && amount && comments) {
        const amountNumber = parseFloat(amount);
        const modifiedMsgId = messageId.replace(/[<>]/g, "");

        storeEmail({
          email,
          messageId: modifiedMsgId,
          name,
          amount: amountNumber,
          comments,
        })
          .then(() =>
            console.log(
              `Email with Message-ID ${messageId} stored successfully`
            )
          )
          .catch((error) => console.error("Error storing email", error));
      } else {
        // console.error("One of the required fields is missing, skipping email.");
        return;
      }
    });
  });
};

const fetchEmails = () => {
  imap.on("mail", () => {
    console.log("New mail arrived!");

    openInbox((err: any, box: any) => {
      if (err) throw err;

      const now = new Date();
      const oneHourAgo = new Date(
        now.getTime() - 60 * parseFloat(process.env.HRS_TO_FETCH || "1") * 1000
      ); // 1 hour ago default

      const searchCriteria = [["SINCE", oneHourAgo.toUTCString()]];

      imap.search(searchCriteria, (err: any, results: any) => {
        if (err) throw err;

        const f = imap.fetch(results, { bodies: "" });
        f.on("message", processMessage);
        f.once("end", () => {
          console.log("Done fetching new messages!");
        });
      });
    });
  });

  imap.once("ready", () => {
    openInbox((err: any, box: any) => {
      if (err) throw err;
    });
  });

  imap.once("error", (err: any) => {
    console.error("IMAP error:", err);
  });

  imap.once("end", () => {
    console.log("Connection ended");
  });

  imap.connect();
};

export default fetchEmails;
