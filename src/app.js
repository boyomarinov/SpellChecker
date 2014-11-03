window.onload = function () {
    spellChecker.init();
    stopwatch.init('stopwatch-placeholder');

    var textElem = document.getElementById('spellcheck-input'),
        resultsContainer = document.getElementById('results-container'),
        loading = document.getElementById('loading'),
        previousContent = '';

    document.getElementById('check-button').onclick = function () {
        // var word = document.getElementById('word-input').value;
        // console.log(spellChecker.check(word));
        handleInput();
    }

    function handleInput() {
        // loading.style.display = "inline-block";
        stopwatch.start();


        var content = textElem.value,
            words;
        // if content did not change, do not update spell check
        if(content && content !== previousContent) {
            previousContent = content;
            words = parseWords(content);
            handleWordsSpellCheck(words).then(function (res) {
                constructResultsList(res);
            });
        }

        stopwatch.stop();
    }

    function parseWords(content) {
        return content
            .replace(/[^\w\s]|_/g, function ($1) { return ' ' + $1 + ' ';})
            .replace(/[ ]+/g, ' ')
            .split(' ')
            .filter(function (elem) { return elem.length > 1; });
    }

    function handleWordsSpellCheck(words) {
        var deferred = Q.defer();
        var spellCheckResults = [];

        if(words.length > 0) {
            words.forEach(function (word) {
                spellChecker.check(word).then(function (suggestions) {
                    if(suggestions !== 1 && suggestions.length > 0) {
                        spellCheckResults[word] = suggestions;
                    }
                });
            });
        }

        deferred.resolve(spellCheckResults);

        return deferred.promise;
    }

    function constructResultsList(results) {
        if(results.length > 0) {
            var list = document.createElement("ul");

            for (var word in results) {
                var item = document.createElement("li"),
                    itemText = document.createTextNode(word + ": " + results[word].join(", "));
                item.appendChild(itemText);
                list.appendChild(item);
            }

            resultsContainer.appendChild(list);
        }
    }
};