var NotationUtils = function () {
    function _simpleToCoord(notation) {
        var coord;
        if (notation === "x1") {
            coord = [14, 2];
        } else if (notation === "x2") {
            coord = [14, 6];
        } else if (notation === "x3") {
            coord = [14, 10];
        } else if (notation === "x4") {
            coord = [14, 14];
        } else {
            coord = [14 - notation.substring(1, notation.length), notation.charCodeAt(0) - 97];
        }
        return coord;
    }
    
    function _split(notation) {
        var splitNotation = [];
        var squareNotation;
        for (var i = 0; i < notation.length; i++) {
            var c = notation.charAt(i);
            if (isNaN(c) && c !== "-" && (!(squareNotation !== undefined && squareNotation.charAt(squareNotation.length - 1) === "-"))) {
                if (squareNotation !== undefined) {
                    splitNotation.push(squareNotation);
                }
                squareNotation = c;
            } else {
                squareNotation = squareNotation.concat(c);
            }
        }
        if (squareNotation !== undefined) {
            splitNotation.push(squareNotation);
        }
        return splitNotation;
    }

    function _toNotation(i, j) {
        if (i === 14) {
            if (j === 2) {
                return "x1";
            } else if (j === 6) {
                return "x2";
            } else if (j === 10) {
                return "x3";
            } else if (j === 14) {
                return "x4";
            }
        }
        return String.fromCharCode(j + 97).concat(new String(-1 * (i - 14)));
    }
    
    function _complexToCoord(notation) {
        var coords = [];
        var splitNotation = notation.split("-");

        if (splitNotation[0].length === 1) {
            var num = splitNotation[1].substring(1, splitNotation[1].length);
            for (var j = splitNotation[0].charCodeAt(0); j <= splitNotation[1].charCodeAt(0); j++) {
                coords.push(_simpleToCoord(String.fromCharCode(j).concat(num)));
            }
        } else {
            var letter = splitNotation[0].substring(0, 1);
            var num = parseInt(splitNotation[0].substring(1, splitNotation[0].length));
            for (var j = num; j <= splitNotation[1]; j++) {
                coords.push(_simpleToCoord(letter.concat(j)));
            }
        }
        return coords;
    }
    
    function _toCoord(notation) {        
        var splitNotation = _split(notation);
        var oneNotation;
        var coords = [];
        for (var i = 0; i < splitNotation.length; i++) {
            oneNotation = splitNotation[i];
            if (oneNotation.indexOf("-") !== -1) {
                coords = coords.concat(_complexToCoord(oneNotation));
            } else {
                coords.push(_simpleToCoord(oneNotation));
            }
        }
        return coords;
    }
    return {
        toCoord: _toCoord,
        toNotation: _toNotation
    };
};

