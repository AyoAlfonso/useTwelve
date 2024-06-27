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
exports.checkEmailExists = exports.storeEmail = void 0;
const models_1 = __importDefault(require("./models"));
const storeEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.default.Emails.create(data);
});
exports.storeEmail = storeEmail;
const checkEmailExists = (messageId) => __awaiter(void 0, void 0, void 0, function* () {
    const database = yield models_1.default.Emails.findOne({ where: { messageId } });
    return !!database;
});
exports.checkEmailExists = checkEmailExists;
