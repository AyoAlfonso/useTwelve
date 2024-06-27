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
// import { Imap } from "node-imap";
var Imap = require("imap");
const mailparser_1 = require("mailparser");
const storeEmail_1 = require("./storeEmail");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "../.env" });
const imap = new Imap({
    user: process.env.EMAIL,
    password: process.env.EMAIL_PASSWORD,
    host: "imap.gmail.com",
    port: 993,
    tls: true,
});
const openInbox = (cb) => {
    console.log("Inbox Ready");
    imap.openBox("INBOX", true, cb);
};
const processMessage = (msg) => {
    msg.on("body", (stream, info) => {
        (0, mailparser_1.simpleParser)(stream, (err, parsed) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            if (err)
                throw err;
            const amountMatch = (_a = parsed.text) === null || _a === void 0 ? void 0 : _a.match(/Amount: [^\d]*([0-9,]+(?:\.[0-9]+)?)/);
            let amount = amountMatch ? amountMatch[1].replace(/[^0-9.]/g, "") : null;
            const comments = (_c = (_b = parsed.text) === null || _b === void 0 ? void 0 : _b.match(/(?:Comment|comment|comment_): (.*)/i)) === null || _c === void 0 ? void 0 : _c[1];
            const email = (_d = parsed.from) === null || _d === void 0 ? void 0 : _d.value[0].address;
            const name = (_e = parsed.from) === null || _e === void 0 ? void 0 : _e.value[0].name;
            const messageId = parsed.messageId;
            if (!messageId) {
                console.error("Message-ID is missing, skipping email.");
                return;
            }
            const emailExists = yield (0, storeEmail_1.checkEmailExists)(messageId);
            if (emailExists) {
                console.log(`Email with Message-ID ${messageId} already exists in the database, skipping.`);
                return;
            }
            if (email && messageId && name && amount && comments) {
                const amountNumber = parseFloat(amount);
                const modifiedMsgId = messageId.replace(/[<>]/g, "");
                (0, storeEmail_1.storeEmail)({
                    email,
                    messageId: modifiedMsgId,
                    name,
                    amount: amountNumber,
                    comments,
                })
                    .then(() => console.log(`Email with Message-ID ${messageId} stored successfully`))
                    .catch((error) => console.error("Error storing email", error));
            }
            else {
                // console.error("One of the required fields is missing, skipping email.");
                return;
            }
        }));
    });
};
const fetchEmails = () => {
    imap.on("mail", () => {
        console.log("New mail arrived!");
        openInbox((err, box) => {
            if (err)
                throw err;
            const now = new Date();
            const oneHourAgo = new Date(now.getTime() - 60 * parseFloat(process.env.HRS_TO_FETCH || "1") * 1000); // 1 hour ago default
            const searchCriteria = [["SINCE", oneHourAgo.toUTCString()]];
            imap.search(searchCriteria, (err, results) => {
                if (err)
                    throw err;
                const f = imap.fetch(results, { bodies: "" });
                f.on("message", processMessage);
                f.once("end", () => {
                    console.log("Done fetching new messages!");
                });
            });
        });
    });
    imap.once("ready", () => {
        openInbox((err, box) => {
            if (err)
                throw err;
        });
    });
    imap.once("error", (err) => {
        console.error("IMAP error:", err);
    });
    imap.once("end", () => {
        console.log("Connection ended");
    });
    imap.connect();
};
exports.default = fetchEmails;
