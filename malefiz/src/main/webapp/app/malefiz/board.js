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

    m.initEmptyGrid = function (cols, rows) {
        m.rows = [];
        for (var i = 0; i < rows; i++) {
            var row = [];
            for (var j = 0; j < cols; j++) {
                row.push(new Square(m.game, NotationUtils.toNotation(i, j), NotationUtils));
            }
            m.rows.push(row);
        }
    };

    m.initPlayable = function () {
        var playables = m.getSquares("i14a-q13a12q12a-q11i10g-k9g8k8e-m7e6m6c-o5c4g4k4o4a-q3a2e2i2m2q2a-q1");
        for (var i = 0; i < playables.length; i++) {
            playables[i].playable = true;
        }
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

