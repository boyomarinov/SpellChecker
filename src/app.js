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
        if(content && content !== previousContent) {
            previousContent = content;
            words = parseWords(content);
            handleWordsSpellCheck(words);
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
        if(words.length > 0) {
            var list = document.createElement("ul");

            words.forEach(function (word) {
                var suggestions = spellChecker.check(word);
                if(suggestions !== 1 && suggestions.length > 0) {
                    var li = document.createElement("li"),
                        textNode = document.createTextNode(word + ": " + suggestions.join(", "));

                    li.appendChild(textNode);
                    list.appendChild(li);
                }
            });

            resultsContainer.appendChild(list);
        }
    }
};