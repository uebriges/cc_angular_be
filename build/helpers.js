var extractUrls = function (params) {
    return Array.isArray(params) ? params : [params];
};
var mostSpeechesOnTopic = function (topic, data) {
    var speechesOnTopic = {};
    var politianWithMostSpeechesOnTopic;
    // Collect all entries with speeches about "Internal security"
    data.forEach(function (speech) {
        if (speech.Topic !== topic)
            return;
        if (topic in speech) {
            speechesOnTopic["".concat(speech.Speaker)] += 1;
        }
        else {
            speechesOnTopic["".concat(speech.Speaker)] = 1;
        }
    });
    if (Object.keys(speechesOnTopic).length < 1)
        return null;
    // Create object with
    // key -> topic; value -> count
    politianWithMostSpeechesOnTopic = Object.keys(speechesOnTopic).reduce(function (prev, current) {
        return speechesOnTopic[prev] > speechesOnTopic[current] ? prev : current;
    });
    return politianWithMostSpeechesOnTopic;
};
var viewestWordsInTotal = function (data) {
    var politian;
    var numberOfWords = data.reduce(function (prev, current) {
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
var mostSpeechesIn = function (year, data) {
    var speechesPerPolitican = {};
    var politicianWithMostSpeeches;
    // Count speeches per politian
    data.forEach(function (speech) {
        if (speech.Date.getFullYear() !== year)
            return;
        if (speech.Speaker in speechesPerPolitican) {
            speechesPerPolitican["".concat(speech.Speaker)] += 1;
        }
        else {
            speechesPerPolitican["".concat(speech.Speaker)] = 1;
        }
    });
    if (Object.keys(speechesPerPolitican).length < 1)
        return null;
    // Get politian with most speeches
    politicianWithMostSpeeches = Object.keys(speechesPerPolitican).reduce(function (prev, current) {
        return speechesPerPolitican[prev] > speechesPerPolitican[current]
            ? prev
            : current;
    });
    return politicianWithMostSpeeches;
};
export { extractUrls, mostSpeechesIn, mostSpeechesOnTopic, viewestWordsInTotal, };
