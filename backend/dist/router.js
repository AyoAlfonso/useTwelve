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
const express_1 = require("express");
const models_1 = __importDefault(require("./models"));
const router = (0, express_1.Router)();
router.get("/emails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emails = yield models_1.default.Emails.findAll({
        order: [["createdAt", "DESC"]],
    });
    res.json(emails);
}));
router.post("/emails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email_data = req.body;
    const new_email = yield models_1.default.Emails.create(email_data);
    res.json(new_email);
}));
router.put("/emails/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const email_data = req.body;
    let email = yield models_1.default.Emails.findByPk(id);
    if (email) {
        email = yield email.update(email_data, {
            where: { id },
            returning: true,
        });
        res.json(email);
    }
    else {
        res.status(404).json({ error: "Email not found" });
    }
}));
router.delete("/emails/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const email = yield models_1.default.Emails.findByPk(id);
    if (email) {
        console.log(email, "email");
        yield email.destroy();
        res.json({ message: "Email deleted" });
    }
    else {
        res.status(404).json({ error: "Email not found" });
    }
}));
router.get("/emails/count", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield models_1.default.Emails.count();
    res.json({ count });
}));
exports.default = router;
