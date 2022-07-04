"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consume = exports.sendQueryToQueue = void 0;
const environments_1 = __importDefault(require("./environments"));
const rabbitmq_1 = __importDefault(require("./rabbitmq"));
async function sendQueryToQueue(item) {
    const channel = await (0, rabbitmq_1.default)(environments_1.default.rabbitMQScraperQueue);
    const message = JSON.stringify(item);
    return channel.sendToQueue(environments_1.default.rabbitMQScraperQueue, Buffer.from(message));
}
exports.sendQueryToQueue = sendQueryToQueue;
async function consume(onQuery) {
    const channel = await (0, rabbitmq_1.default)(environments_1.default.rabbitMQScraperQueue);
    channel.consume(environments_1.default.rabbitMQScraperQueue, async (message) => {
        try {
            if (!message) {
                return;
            }
            const item = JSON.parse(message.content.toString());
            await onQuery(item);
        }
        finally {
            if (message) {
                channel.ack(message);
            }
        }
    });
}
exports.consume = consume;
