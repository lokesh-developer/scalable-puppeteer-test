"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
async function withPage(func) {
    const browser = await puppeteer_core_1.default.launch({
        executablePath: '/usr/bin/google-chrome',
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-background-networking',
            '--disable-default-apps',
            '--disable-extensions',
            '--disable-sync',
            '--disable-translate',
            '--headless',
            '--hide-scrollbars',
            '--metrics-recording-only',
            '--mute-audio',
            '--no-first-run',
            '--safebrowsing-disable-auto-update',
            '--ignore-certificate-errors',
            '--ignore-ssl-errors',
            '--ignore-certificate-errors-spki-list',
            '--user-data-dir=/tmp',
        ],
    });
    const page = await browser.newPage();
    try {
        return await func(page);
    }
    finally {
        await page.close();
        await browser.close();
    }
}
exports.default = withPage;
