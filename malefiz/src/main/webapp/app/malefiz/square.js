var Square = function (paramGame, paramNotation, NotationUtils) {
    var m = this;
    m.game = paramGame;
    m.notation = paramNotation;
    m.coord = NotationUtils.toCoord(m.notation)[0];
    m.playable = false;
    m.occupying = 0;
    m.playerSetWall = 0;
    m.prevOccupying = 0;
    m.numOccupying = 0;
    m.lastMoved = false;
    m.moving = false;
    m.reachable = false;
    m.isOccupied = function(){
    	return m.occupying > 0 && m.occupying<=5;
    }
    m.isOccupyingPlayer = function(){
    	return m.occupying > 0 && m.occupying<5;
    }
    m.isPrevOccupyingPlayer = function(){
    	return m.prevOccupying > 0 && m.prevOccupying<5;
    }
    m.isHouse = function () {
        return m.notation.charAt(0) === "x";
    };

    m.reachableSquares = function (numMoves, player, previous) {
        var reachable = [];
        if (numMoves === 0) {
            if (m.occupying !== player) {
                reachable.push(m);
            }
        } else if (m.occupying !== 5) {
            var adj = adjacentSquares();
            for (var i = 0; i < adj.length; i++) {
                if (adj[i] !== previous) {
                    reachable = reachable.concat(adj[i].reachableSquares(numMoves - 1, player, m));
                }
            }
        }
        return reachable;
    };
    
    function pushIfPlayable(array, coord1, coord2){
    	var sq = m.game.board.rows[coord1][coord2];
    	if (sq.playable){
    		array.push(sq);
    	}
    }
    
    function adjacentSquares() {
        var adj = [];
        var sq = null;
        if (m.coord[0] > 0) {
        	pushIfPlayable(adj, m.coord[0] - 1, m.coord[1]);
        }
        if (m.coord[1] > 0) {
        	pushIfPlayable(adj, m.coord[0], m.coord[1] - 1);
        }
        if (m.coord[0] < m.game.board.rows.length - 1) {
        	pushIfPlayable(adj, m.coord[0] + 1, m.coord[1]);
        }
        if (m.coord[1] < m.game.board.rows[0].length - 1) {
        	pushIfPlayable(adj, m.coord[0], m.coord[1] + 1);
        }
        return adj;
    }

    function setAttribReachable() {
        if (m.game.rules) {
            var reachable = m.reachableSquares(m.game.moves, m.game.playerTurn, m);
            for (var i = 0; i < reachable.length; i++) {
                reachable[i].reachable = true;
            }
        }
    }

    function resetReachable() {
        if (m.game.rules) {
            m.game.board.allSquaresFunction(function (sq) {
                sq.reachable = false;
            });
        }
    }

    function takePawn() {
        m.game.moving = m;
        m.moving = true;
        setAttribReachable();
    }
    function undoTakingPawn() {
        m.game.moving.moving = false;
        m.game.moving = null;
        resetReachable();
    }
    function isNotPawnTaken() {
        return m.game.moving === null;
    }
    function isPawnInThisSquare() {
        if (m.game.rules) {
            return m.occupying === m.game.playerTurn;
        } else {
            return m.occupying > 0;
        }
    }
    function isPawnInThisSquareTaken() {
        return m.notation === m.game.moving.notation;
    }
    function isOccupableSquare() {
        if (m.game.rules) {
            if (m.game.moving.occupying === 5) {
                return m.playable && m.occupying === 0 && m.coord[0] !== 13;
            } else {
                var reachable = m.game.moving.reachableSquares(m.game.moves, m.game.playerTurn, m.game.moving);
                return reachable.indexOf(m) !== -1;
            }
        } else {
            return m.playable && (m.game.moving.occupying !== 5 || m.occupying === 0) && m.occupying !== m.game.moving.occupying;
        }
    }

    function checkWin() {
        if (m.occupying !== 5 && m.notation === "i14") {
            m.game.setWinner();
            return true;
        }
        return false;
    }
    function putTakenPawnOnSquare(prevOccupying) {
        if (prevOccupying === 5) {
            if (!checkWin()) {
            	m.playerSetWall = 0;
                m.game.setWallTaken();
            }
        } else {
            m.game.movingWall = false;
            if (prevOccupying === 0) {
                m.numOccupying++;
            } else {
                var eatenHouse = m.game.board.getSquare(NotationUtils.toCoord("x" + prevOccupying)[0]);
                eatenHouse.numOccupying++;
                eatenHouse.occupying = prevOccupying;
            }
            if (!checkWin()){
                m.game.changeTurn();
            }
        }
        resetReachable();
    }
    function removeTakenPawnFromOldSquare() {
        m.game.moving.moving = false;
        m.game.moving.numOccupying--;
        if (m.game.lastSquareLeft[m.game.moving.occupying - 1]){
        	m.game.lastSquareLeft[m.game.moving.occupying - 1].prevOccupying = 0;
        }
        m.game.moving.prevOccupying = m.game.moving.occupying;
        m.game.lastSquareLeft[m.game.moving.occupying - 1] = m.game.moving;
        if (m.game.moving.occupying === 5){
        	m.playerSetWall = m.game.playerTurn;
        } else {
        	 if (m.game.lastPawnMoved[m.game.moving.occupying - 1]){
             	m.game.lastPawnMoved[m.game.moving.occupying - 1].lastMoved = false;
             }
             m.lastMoved = true;
             m.game.lastPawnMoved[m.game.moving.occupying - 1] = m;
        }
        if (!m.game.moving.isHouse() || m.game.moving.numOccupying === 0) {
        	m.game.moving.occupying = 0;
		}
		m.game.moving = null;
    }
    m.click = function () {
        if (m.game.winner === null) {
            if (isNotPawnTaken()) {
                if (isPawnInThisSquare()) {
                    takePawn();
                }
            } else if (isPawnInThisSquareTaken()) {
                undoTakingPawn();
            } else if (isOccupableSquare()) {
                var prevOccupying = m.occupying;
                m.occupying = m.game.moving.occupying;
                removeTakenPawnFromOldSquare();
                putTakenPawnOnSquare(prevOccupying);
            }
            m.game.notation = m.game.getNotation();
        }
    };
};