"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionResult = exports.updateTransactionToDone = exports.updateTransactionToProcessing = exports.addTransaction = void 0;
const redis_1 = __importDefault(require("./redis"));
async function addTransaction(transactionId) {
    const redisClient = await (0, redis_1.default)();
    await redisClient.set(transactionId, JSON.stringify({ status: 'ON_QUEUE' }), { EX: 15 * 60 });
}
exports.addTransaction = addTransaction;
async function updateTransactionToProcessing(transactionId) {
    const redisClient = await (0, redis_1.default)();
    await redisClient.set(transactionId, JSON.stringify({ status: 'PROCESSING' }), { KEEPTTL: true });
}
exports.updateTransactionToProcessing = updateTransactionToProcessing;
async function updateTransactionToDone(transactionId, result) {
    const redisClient = await (0, redis_1.default)();
    await redisClient.set(transactionId, JSON.stringify({ status: 'DONE', data: result }), { KEEPTTL: true });
}
exports.updateTransactionToDone = updateTransactionToDone;
async function getTransactionResult(transactionId) {
    const redisClient = await (0, redis_1.default)();
    const valueString = await redisClient.get(transactionId);
    if (!valueString) {
        throw new Error('Transaction not found!');
    }
    return JSON.parse(valueString);
}
exports.getTransactionResult = getTransactionResult;
