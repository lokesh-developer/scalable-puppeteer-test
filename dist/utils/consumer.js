"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("./utils/scraper");
const scraper_queue_1 = require("./utils/scraper-queue");
const scraper_transaction_1 = require("./utils/scraper-transaction");
(async () => {
    await (0, scraper_queue_1.consume)(async (item) => {
        await (0, scraper_transaction_1.updateTransactionToProcessing)(item.transactionId.toString());
        const links = await (0, scraper_1.getLinksByQuery)(item.query);
        await (0, scraper_transaction_1.updateTransactionToDone)(item.transactionId.toString(), {
            query: item.query,
            links,
            took: (Date.now() - item.transactionId) / 1000,
        });
    });
})();
