"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = require("amqplib");
const environments_1 = __importDefault(require("./environments"));
let connection;
const channels = {};
async function getChannel(queue) {
    if (channels[queue]) {
        return channels[queue];
    }
    if (!connection) {
        connection = await (0, amqplib_1.connect)({
            hostname: environments_1.default.rabbitMQHostname,
            port: environments_1.default.rabbitMQPort,
            username: environments_1.default.rabbitMQUsername,
            password: environments_1.default.rabbitMQPassword,
        });
    }
    channels[queue] = await connection.createChannel();
    await channels[queue].assertQueue(queue, {
        durable: true,
        autoDelete: false,
    });
    await channels[queue].prefetch(1);
    return channels[queue];
}
exports.default = getChannel;
