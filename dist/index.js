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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
exports.app = (0, express_1.default)();
const db_1 = require("./db");
exports.app.use(express_1.default.json());
const sumInput = zod_1.z.object({
    a: zod_1.z.number(),
    b: zod_1.z.number()
});
exports.app.post('/sum', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = sumInput.safeParse(req.body);
    if (!response.success) {
        return res.status(211).json({
            msg: 'Invalid input'
        });
    }
    const { a, b } = req.body;
    const result = a + b;
    yield db_1.prisma.sum.create({
        data: {
            a,
            b,
            result
        }
    });
    res.status(200).json({
        result
    });
}));
