"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const environments_1 = __importDefault(require("./environments"));
let client;
async function getRedisClient() {
    if (!client) {
        client = (0, redis_1.createClient)({ url: environments_1.default.redisUrl });
        await client.connect();
    }
    return client;
}
exports.default = getRedisClient;
