var spellChecker = (function () {
    var tree,
        words,
        suggestionsCount;

    function init() {
        tree = new BKTree();
        words = readWords('data/en_dict.txt');
        suggestionsCount = 10;

        populateTree();
    }

    function populateTree() {
        words.forEach(function (word) {
           tree.add(word);
        });
    }

    function checkTerm (term) {
        var results = tree.search(term, 2);
        if (containsProp(results, term)) {
            return 1;
        }

        var keys = Object.keys(results);
        if (keys. length > suggestionsCount) {
            return keys.slice(0, suggestionsCount);
        }

        return Object.keys(results);
    }

    function containsProp(obj, term) {
        for (var prop in obj) {
            if(prop.trim() == term) {
                return true;
            }
        }

        return false;
    }

    function readWords(filePath) {
        var content = readDictionary(filePath);
        return content.replace( /\n/g, " " ).split( " " );
    }

    function readDictionary(filePath) {
        var charset = "ISO8859-1";

        var req = new XMLHttpRequest();
        req.open("GET", filePath, false);

        if (req.overrideMimeType)
            req.overrideMimeType("text/plain; charset=" + charset);

        req.send(null);

        return req.responseText;
    }

    return {
        init: init,
        check: checkTerm
    }
}());