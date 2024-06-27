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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const models_1 = __importDefault(require("./models"));
const fetcher_1 = __importDefault(require("./fetcher"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", router_1.default);
app.get("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ message: "Welcome to the Email Data API" });
}));
app.listen(3001, () => __awaiter(void 0, void 0, void 0, function* () {
    (0, fetcher_1.default)();
    if (typeof models_1.default.sequelize.sync === "function") {
        yield models_1.default.sequelize.sync({ alter: false, logging: false, benchmark: true });
        console.log("Database is synced!");
    }
    else {
        console.error("The connection object does not support syncing.");
    }
    console.log("Server is running on port 3001");
}));
