"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const express_1 = __importDefault(require("express"));
const environments_1 = __importDefault(require("./utils/environments"));
const scraper_queue_1 = require("./utils/scraper-queue");
const scraper_transaction_1 = require("./utils/scraper-transaction");
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});
app.get('/search', async (req, res) => {
    try {
        const { query = '' } = req.query;
        if (!query) {
            return res.status(500).json({ message: 'Query string is required!' });
        }
        const transactionId = Date.now();
        await (0, scraper_queue_1.sendQueryToQueue)({
            query,
            transactionId,
        });
        await (0, scraper_transaction_1.addTransaction)(transactionId.toString());
        return res.json({
            transactionId,
            message: 'The query is already in the queue',
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});
app.get('/transactions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, scraper_transaction_1.getTransactionResult)(id);
        return res.json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
});
app.listen(environments_1.default.apiPort, () => {
    console.log(`Server is running on: ${environments_1.default.apiPort}`);
});
