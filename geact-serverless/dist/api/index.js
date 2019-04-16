"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const dev_1 = __importDefault(require("./dev"));
const auth_1 = __importDefault(require("./auth"));
const router = new koa_router_1.default();
router.use('/dev', dev_1.default.routes());
// if (process.env.NODE_ENV === 'development') {
//     router.use('/dev', dev.routes());
// }
router.use('/auth', auth_1.default.routes());
exports.default = router;
