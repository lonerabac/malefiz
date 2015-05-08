var Board = function (paramGame, notation, NotationUtils) {
    var m = this;
    m.game = paramGame;
    m.rows;

    m.init = function (notation) {
        if (notation !== undefined) {
            m.set(notation);
        }
    };

    m.getSquare = function (coords) {
        return m.rows[coords[0]][coords[1]];
    };

    m.getSquares = function (notation) {
        var squares = [];
        var coords = NotationUtils.toCoord(notation);
        for (var i = 0; i < coords.length; i++) {
            squares.push(m.getSquare(coords[i]));
        }
        return squares;
    };
    
    m.getSq = function (notation){
    	return m.getSquares(notation)[0];
    }

    m.initEmptyGrid = function (cols, rows) {
        m.rows = [];
        for (var i = 0; i < rows; i++) {
            var row = [];
            for (var j = 0; j < cols; j++) {
                row.push(new Square(m, NotationUtils.toNotation(i, j), NotationUtils));
            }
            m.rows.push(row);
        }
    };

    m.initPlayable = function () {
        var playables = m.getSquares("i14a-q13a12q12a-q11i10g-k9g8k8e-m7e6m6c-o5c4g4k4o4a-q3a2e2i2m2q2a-q1");
        for (var i = 0; i < playables.length; i++) {
            playables[i].playable = true;
        }
        var playablesAndHouses = playables.concat(m.getSquares("x1x2x3x4"));
        var i = 0;
        playablesAndHouses[i++].distanceToWin = 0;
        playablesAndHouses[i++].distanceToWin = 9;
        playablesAndHouses[i++].distanceToWin = 8;
        playablesAndHouses[i++].distanceToWin = 7;
        playablesAndHouses[i++].distanceToWin = 6;
        playablesAndHouses[i++].distanceToWin = 5;
        playablesAndHouses[i++].distanceToWin = 4;
        playablesAndHouses[i++].distanceToWin = 3;
        playablesAndHouses[i++].distanceToWin = 2;
        playablesAndHouses[i++].distanceToWin = 1;
        playablesAndHouses[i++].distanceToWin = 2;
        playablesAndHouses[i++].distanceToWin = 3;
        playablesAndHouses[i++].distanceToWin = 4;
        playablesAndHouses[i++].distanceToWin = 5;
        playablesAndHouses[i++].distanceToWin = 6;
        playablesAndHouses[i++].distanceToWin = 7;
        playablesAndHouses[i++].distanceToWin = 8;
        playablesAndHouses[i++].distanceToWin = 9;
        playablesAndHouses[i++].distanceToWin = 10;
        playablesAndHouses[i++].distanceToWin = 10;
        playablesAndHouses[i++].distanceToWin = 11;
        playablesAndHouses[i++].distanceToWin = 12;
        playablesAndHouses[i++].distanceToWin = 13;
        playablesAndHouses[i++].distanceToWin = 14;
        playablesAndHouses[i++].distanceToWin = 15;
        playablesAndHouses[i++].distanceToWin = 16;
        playablesAndHouses[i++].distanceToWin = 17;
        playablesAndHouses[i++].distanceToWin = 18;
        playablesAndHouses[i++].distanceToWin = 19;
        playablesAndHouses[i++].distanceToWin = 18;
        playablesAndHouses[i++].distanceToWin = 17;
        playablesAndHouses[i++].distanceToWin = 16;
        playablesAndHouses[i++].distanceToWin = 15;
        playablesAndHouses[i++].distanceToWin = 14;
        playablesAndHouses[i++].distanceToWin = 13;
        playablesAndHouses[i++].distanceToWin = 12;
        playablesAndHouses[i++].distanceToWin = 11;
        playablesAndHouses[i++].distanceToWin = 20;
        playablesAndHouses[i++].distanceToWin = 23;
        playablesAndHouses[i++].distanceToWin = 22;
        playablesAndHouses[i++].distanceToWin = 21;
        playablesAndHouses[i++].distanceToWin = 22;
        playablesAndHouses[i++].distanceToWin = 23;
        playablesAndHouses[i++].distanceToWin = 24;
        playablesAndHouses[i++].distanceToWin = 24;
        playablesAndHouses[i++].distanceToWin = 27;
        playablesAndHouses[i++].distanceToWin = 26;
        playablesAndHouses[i++].distanceToWin = 25;
        playablesAndHouses[i++].distanceToWin = 26;
        playablesAndHouses[i++].distanceToWin = 27;
        playablesAndHouses[i++].distanceToWin = 26;
        playablesAndHouses[i++].distanceToWin = 25;
        playablesAndHouses[i++].distanceToWin = 26;
        playablesAndHouses[i++].distanceToWin = 27;
        playablesAndHouses[i++].distanceToWin = 28;
        playablesAndHouses[i++].distanceToWin = 28;
        playablesAndHouses[i++].distanceToWin = 31;
        playablesAndHouses[i++].distanceToWin = 30;
        playablesAndHouses[i++].distanceToWin = 29;
        playablesAndHouses[i++].distanceToWin = 30;
        playablesAndHouses[i++].distanceToWin = 31;
        playablesAndHouses[i++].distanceToWin = 32;
        playablesAndHouses[i++].distanceToWin = 33;
        playablesAndHouses[i++].distanceToWin = 32;
        playablesAndHouses[i++].distanceToWin = 31;
        playablesAndHouses[i++].distanceToWin = 30;
        playablesAndHouses[i++].distanceToWin = 29;
        playablesAndHouses[i++].distanceToWin = 30;
        playablesAndHouses[i++].distanceToWin = 31;
        playablesAndHouses[i++].distanceToWin = 32;
        playablesAndHouses[i++].distanceToWin = 32;
        playablesAndHouses[i++].distanceToWin = 32;
        playablesAndHouses[i++].distanceToWin = 32;
        playablesAndHouses[i++].distanceToWin = 35;
        playablesAndHouses[i++].distanceToWin = 34;
        playablesAndHouses[i++].distanceToWin = 33;
        playablesAndHouses[i++].distanceToWin = 34;
        playablesAndHouses[i++].distanceToWin = 35;
        playablesAndHouses[i++].distanceToWin = 34;
        playablesAndHouses[i++].distanceToWin = 33;
        playablesAndHouses[i++].distanceToWin = 34;
        playablesAndHouses[i++].distanceToWin = 35;
        playablesAndHouses[i++].distanceToWin = 34;
        playablesAndHouses[i++].distanceToWin = 33;
        playablesAndHouses[i++].distanceToWin = 34;
        playablesAndHouses[i++].distanceToWin = 35;
        playablesAndHouses[i++].distanceToWin = 34;
        playablesAndHouses[i++].distanceToWin = 33;
        playablesAndHouses[i++].distanceToWin = 34;
        playablesAndHouses[i++].distanceToWin = 35;
        playablesAndHouses[i++].distanceToWin = 36;
        playablesAndHouses[i++].distanceToWin = 36;
        playablesAndHouses[i++].distanceToWin = 36;
        playablesAndHouses[i++].distanceToWin = 36;
        playablesAndHouses[i++].distanceToWin = 36;
        playablesAndHouses[i++].distanceToWin = 37;
        playablesAndHouses[i++].distanceToWin = 38;
        playablesAndHouses[i++].distanceToWin = 39;
        playablesAndHouses[i++].distanceToWin = 38;
        playablesAndHouses[i++].distanceToWin = 37;
        playablesAndHouses[i++].distanceToWin = 38;
        playablesAndHouses[i++].distanceToWin = 39;
        playablesAndHouses[i++].distanceToWin = 38;
        playablesAndHouses[i++].distanceToWin = 37;
        playablesAndHouses[i++].distanceToWin = 38;
        playablesAndHouses[i++].distanceToWin = 39;
        playablesAndHouses[i++].distanceToWin = 38;
        playablesAndHouses[i++].distanceToWin = 37;
        playablesAndHouses[i++].distanceToWin = 38;
        playablesAndHouses[i++].distanceToWin = 39;
        playablesAndHouses[i++].distanceToWin = 38;
        playablesAndHouses[i++].distanceToWin = 37;
        playablesAndHouses[i++].distanceToWin = 40;
        playablesAndHouses[i++].distanceToWin = 40;
        playablesAndHouses[i++].distanceToWin = 40;
        playablesAndHouses[i++].distanceToWin = 40;
//        for (var i = 0; i < playablesAndHouses.length; i++) {
//        	playablesAndHouses[i].getDistanceToWin(false);
//        }
       
    };

    m.initEmpty = function () {
        m.initEmptyGrid(17, 15);
        m.initPlayable();
    };

    m.set = function (notation) {
        m.initEmpty();
        var squares = m.getSquares(notation);
        var squaresIndex = 0;
        for (var player = 1; player <= 4; player++) {
            for (var i = 0; i < 5; i++) {
                var index = ((player - 1) * 5) + i;
                squares[index].occupying = player;
                squares[index].numOccupying++;
                squaresIndex++;
            }
        }
        while (squaresIndex < squares.length) {
            squares[squaresIndex].occupying = 5;
            squares[squaresIndex].numOccupying++;
            squaresIndex++;
        }
    };
    m.allSquaresFunction = function (func){
         for (var i = 0; i < m.rows.length; i++) {
            var row = m.rows[i];
            for (var j = 0; j < row.length; j++) {
                func(row[j]);
            }
        }
    };
    m.getNotation = function () {
        var p = m.getPlayersAndWallsSquares();

        return p[0].join("") + p[1].join("") + p[2].join("") + p[3].join("") + p[4].join("");
    };
    
    m.getPlayersAndWallsSquares = function (){
    	 var p = [[], [], [], [], []];

         m.allSquaresFunction(function (sq) {
             if (sq.occupying !== 0) {
                 for (var z = 0; z < sq.numOccupying; z++) {
                     p[sq.occupying - 1].push(sq.notation);
                 }
             }
         });
         return p;
    }
    m.init(notation);
};

