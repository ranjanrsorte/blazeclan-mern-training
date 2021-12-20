var StringOperations = function () {

    this.getBlankSpaces = function (str) {
        var countOfBlankSpaces = 0;
        for (var i in str) {
            if (str[i] === " ") countOfBlankSpaces++;
        }
        return countOfBlankSpaces;
    }

    this.getStatements = function (str) {
        var countOfStatements = 0;
        for (var i in str) {
            if (str[i] === ".") countOfStatements++;
        }
        return countOfStatements;
    }

    this.getCommas = function (str) {
        var countOfCommas = 0;
        for (var i in str) {
            if (str[i] === ",") countOfCommas++;
        }
        return countOfCommas;
    }

    this.convertToTitleCase = function (str) {
        var tempString = "";
        //str = "ranjan sorte chandrapur";
        var outputString = str[0].toUpperCase();
        for (var i = 1; i <= str.length - 1; i++) {
            var currentChar = str[i - 1];
            var prevChar = str[i - 1];
            if (prevChar == ' ') {
                currentChar = str[i].toUpperCase();
            } else {
                currentChar = str[i];
            }
            outputString = outputString + currentChar;
        }
        return outputString;
    }

    this.getVowels = function (str) {
        var a = 0, e = 0, i = 0, o = 0, u = 0;
        for (var k in str) {
            if (str[k] == "a") a++;
            if (str[k] == "e") e++;
            if (str[k] == "i") i++;
            if (str[k] == "o") o++;
            if (str[k] == "u") u++;
        }
        var countOfVowels = { a: a, e: e, i: i, o: o, u: u };
        return JSON.stringify(countOfVowels);
    }

    this.getWordCount = function (str) {
        var count = 0;
        if (str.length > 0) {
            count = 1;
            for (var i in str) {
                if (str[i] === " ") count++;
            }
        } else {
            return count;
        }
        return count;
    }

    this.countSpecificWord = function (strToFind, str) {
        var i = 0;
        var n = 0;
        while (true) {
            i = str.indexOf(strToFind, i);
            if (i >= 0) {
                n++;
                i++;
            } else
                break;
        }
        return n;
    }
};