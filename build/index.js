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
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const papaparse_1 = __importDefault(require("papaparse"));
const helpers_1 = require("./helpers");
// const express = require('express');
// const fetch = (...args) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));
// const Papa = require('papaparse');
const helpers = require('./helpers');
const app = (0, express_1.default)();
let aggregatedData = [];
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!('url' in req.query))
        res.end("No parameter 'url' is given.");
    const urlArr = (0, helpers_1.extractUrls)(req.query.url);
    let response;
    let text;
    let csvArr = [];
    let data;
    // Collect all CSV contents in an array
    yield Promise.all(urlArr.map((url) => __awaiter(void 0, void 0, void 0, function* () {
        response = yield (0, node_fetch_1.default)(url);
        text = yield response.text();
        csvArr.push(text);
    })));
    // Parse CSVs to array of objects
    csvArr.forEach((csv) => {
        data = papaparse_1.default.parse(csv, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            transform: (value, field) => {
                if (field === 'Date')
                    return new Date(value);
                return value;
            },
        }).data;
        aggregatedData = [...aggregatedData, ...data];
    });
    console.log('Aggregated data: ', aggregatedData);
    const answer = {
        mostSpeeches: (0, helpers_1.mostSpeechesIn)(2012, aggregatedData),
        mostSecurity: (0, helpers_1.mostSpeechesOnTopic)('Internal Security', aggregatedData),
        leastWordy: (0, helpers_1.viewestWordsInTotal)(aggregatedData),
    };
    res.status(200).send(answer);
}));
app.listen(3100, () => {
    console.log('running...');
});
