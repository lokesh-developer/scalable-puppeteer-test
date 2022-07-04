"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinksByQuery = void 0;
const browser_1 = __importDefault(require("./browser"));
function getLinksByQuery(query) {
    return (0, browser_1.default)(async (page) => {
        await page.goto('https://www.google.com/', {
            timeout: 0,
            waitUntil: 'networkidle2',
        });
        await page.type('input', query);
        await page.keyboard.press('Enter');
        await page.waitForSelector('div.yuRUbf > a');
        return page.evaluate(() => {
            const data = [];
            document.querySelectorAll('div.yuRUbf > a').forEach((ele) => {
                var _a;
                data.push({
                    title: (_a = ele.querySelector('h3')) === null || _a === void 0 ? void 0 : _a.textContent,
                    link: ele.href,
                });
            });
            return data;
        });
    });
}
exports.getLinksByQuery = getLinksByQuery;
