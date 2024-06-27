const Imap = require("imap");
import { simpleParser } from "mailparser";
import { storeEmail } from "./storeEmail";

const imap = new Imap({
  user: process.env.EMAIL,
  password: process.env.EMAIL_PASSWORD,
  host: "imap.gmail.com",
  port: 993,
  tls: true,
});

const openInbox = (cb: Function) => {
  imap.openBox("INBOX", true, cb);
};

imap.once("ready", () => {
  openInbox((err: any, box: any) => {
    if (err) throw err;

    imap.search(["ALL"], (err: any, results: any) => {
      if (err) throw err;

      const f = imap.fetch(results, { bodies: "" });
      f.on("message", (msg: { on: (arg0: string, arg1: (stream: any, info: any) => void) => void; }, seqno: any) => {
        msg.on("body", (stream: any, info: any) => {
          simpleParser(stream, (err: any, parsed: { text: { match: (arg0: RegExp) => any[]; }; }) => {
            if (err) throw err;

            const name = parsed.text.match(/Name: (.*)/)?.[1];
            const amount = parsed.text.match(/Amount: \$(.*)/)?.[1];
            const comments = parsed.text.match(/Comment: (.*)/)?.[1];

            // Store the extracted data in the database
            if (name && amount && comments) {
              storeEmail(name, parseFloat(amount), comments)
                .then(() => console.log("Email stored successfully"))
                .catch((error) => console.error("Error storing email", error));
            }
          });
        });
      });
      f.once("end", () => {
        console.log("Done fetching all messages!");
        imap.end();
      });
    });
  });
});

imap.connect();
