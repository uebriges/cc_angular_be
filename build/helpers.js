"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewestWordsInTotal = exports.mostSpeechesOnTopic = exports.mostSpeechesIn = exports.extractUrls = void 0;
const extractUrls = (params) => {
    return Array.isArray(params) ? params : [params];
};
exports.extractUrls = extractUrls;
const mostSpeechesOnTopic = (topic, data) => {
    let speechesOnTopic = {};
    let politianWithMostSpeechesOnTopic;
    // Collect all entries with speeches about "Internal security"
    data.forEach((speech) => {
        if (speech.Topic !== topic)
            return;
        if (topic in speech) {
            speechesOnTopic[`${speech.Speaker}`] += 1;
        }
        else {
            speechesOnTopic[`${speech.Speaker}`] = 1;
        }
    });
    if (Object.keys(speechesOnTopic).length < 1)
        return null;
    // Create object with
    // key -> topic; value -> count
    politianWithMostSpeechesOnTopic = Object.keys(speechesOnTopic).reduce((prev, current) => {
        return speechesOnTopic[prev] > speechesOnTopic[current] ? prev : current;
    });
    return politianWithMostSpeechesOnTopic;
};
exports.mostSpeechesOnTopic = mostSpeechesOnTopic;
const viewestWordsInTotal = (data) => {
    let politian;
    const numberOfWords = data.reduce((prev, current) => {
        if (prev.Words < current.Words) {
            politian = prev.Speaker;
            return prev;
        }
        else {
            politian = current.Speaker;
            return current;
        }
    });
    return politian;
};
exports.viewestWordsInTotal = viewestWordsInTotal;
const mostSpeechesIn = (year, data) => {
    let speechesPerPolitican = {};
    let politicianWithMostSpeeches;
    // Count speeches per politian
    data.forEach((speech) => {
        if (speech.Date.getFullYear() !== year)
            return;
        if (speech.Speaker in speechesPerPolitican) {
            speechesPerPolitican[`${speech.Speaker}`] += 1;
        }
        else {
            speechesPerPolitican[`${speech.Speaker}`] = 1;
        }
    });
    if (Object.keys(speechesPerPolitican).length < 1)
        return null;
    // Get politian with most speeches
    politicianWithMostSpeeches = Object.keys(speechesPerPolitican).reduce((prev, current) => {
        return speechesPerPolitican[prev] > speechesPerPolitican[current]
            ? prev
            : current;
    });
    return politicianWithMostSpeeches;
};
exports.mostSpeechesIn = mostSpeechesIn;
