var Square = function (paramBoard, paramNotation, NotationUtils) {
    var m = this;
    m.board = paramBoard;
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
    m.distanceToWin = null;
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

    m.reachableSquares = function (numMoves, player, previous, wallsblock) {
        var reachable = [];
        if (numMoves === 0) {
            if (m.occupying !== player) {
                reachable.push(m);
            }
        } else if (!wallsblock || m.occupying !== 5) {
            var adj = m.adjacentSquares();
            for (var i = 0; i < adj.length; i++) {
                if (adj[i] !== previous) {
                    reachable = reachable.concat(adj[i].reachableSquares(numMoves - 1, player, m, wallsblock));
                }
            }
        }
        return reachable;
    };
    
    m.distance = function (dest, wallsblock){
    	var reach = []
    	var i = 0;
    	while (reach.indexOf(dest)===-1 && i < 80){
    		i++;
    		reach = m.reachableSquares(i, 7, m, wallsblock);
    	}
    	
    	return i;
    }
    
    m.getDistanceToWin = function (wallsblock){
    	if (!wallsblock && m.distanceToWin !== null){
    		return m.distanceToWin;
    	} else {
    		return m.distance(m.board.getSq("i14"), wallsblock);
    	}
    }
    
    m.path = function (path, dest, wallsblock, cangodown){
    	if (m === dest){
    		path.push(m);
    	} else {
    		var adj = adjacentSquares();
    		var bestPath = null;
    		for (var i = 0; i < adj.length; i++) {
    			if (path.indexOf(adj[i])===-1 && 
    					(!wallsblock || adj[i].occupying!==5) && 
    					(cangodown || adj[i].coord[0]<=m.coord[0])) {
    				var pathAdj = [];
    				pathAdj.push(m);
    				adj[i].path(pathAdj, dest, wallsblock, cangodown);
    				if ((bestPath === null || pathAdj.length < bestPath.length) && pathAdj.indexOf(dest)!==-1){
    					bestPath = pathAdj;
    					console.log(bestPath);
    				}
    			}
    		}
    		if  (bestPath !== null){
    			path = path.concat(bestPath);
    		}
    	}
    }
    
    function pushIfPlayable(array, coord1, coord2){
    	var sq = m.board.rows[coord1][coord2];
    	if (sq.playable){
    		array.push(sq);
    	}
    }
    
    m.adjacentSquares = function() {
        var adj = [];
        var sq = null;
        if (m.coord[0] > 0) {
        	pushIfPlayable(adj, m.coord[0] - 1, m.coord[1]);
        }
        if (m.coord[1] > 0) {
        	pushIfPlayable(adj, m.coord[0], m.coord[1] - 1);
        }
        if (m.coord[0] < m.board.rows.length - 1) {
        	pushIfPlayable(adj, m.coord[0] + 1, m.coord[1]);
        }
        if (m.coord[1] < m.board.rows[0].length - 1) {
        	pushIfPlayable(adj, m.coord[0], m.coord[1] + 1);
        }
        return adj;
    }

    function setAttribReachable() {
        if (m.board.game.rules) {
            var reachable = m.reachableSquares(m.board.game.moves, m.board.game.playerTurn, m, true);
            for (var i = 0; i < reachable.length; i++) {
                reachable[i].reachable = true;
            }
        }
    }

    function resetReachable() {
        m.board.allSquaresFunction(function (sq) {
            sq.reachable = false;
        });
    }

    function takePawn() {
        m.board.game.moving = m;
        m.moving = true;
        setAttribReachable();
    }
    function undoTakingPawn() {
        m.board.game.moving.moving = false;
        m.board.game.moving = null;
        resetReachable();
    }
    function isNotPawnTaken() {
        return m.board.game.moving === null;
    }
    function isPawnInThisSquare() {
        if (m.board.game.rules) {
            return m.occupying === m.board.game.playerTurn;
        } else {
            return m.occupying > 0;
        }
    }
    function isPawnInThisSquareTaken() {
        return m.notation === m.board.game.moving.notation;
    }
    function isOccupableSquare() {
        if (m.board.game.rules) {
            if (m.board.game.moving.occupying === 5) {
                return m.playable && m.occupying === 0 && m.coord[0] !== 13;
            } else {
                var reachable = m.board.game.moving.reachableSquares(m.board.game.moves, m.board.game.playerTurn, m.board.game.moving, true);
                return reachable.indexOf(m) !== -1;
            }
        } else {
            return m.playable && (m.board.game.moving.occupying !== 5 || m.occupying === 0) && m.occupying !== m.board.game.moving.occupying;
        }
    }

    function checkWin() {
        if (m.occupying !== 5 && m.notation === "i14") {
            m.board.game.setWinner();
            return true;
        }
        return false;
    }
    function putTakenPawnOnSquare(prevOccupying) {
        if (prevOccupying === 5) {
            if (!checkWin()) {
            	m.playerSetWall = 0;
                m.board.game.setWallTaken();
            }
        } else {
            m.board.game.movingWall = false;
            if (prevOccupying === 0) {
                m.numOccupying++;
            } else {
                var eatenHouse = m.board.getSquare(NotationUtils.toCoord("x" + prevOccupying)[0]);
                eatenHouse.numOccupying++;
                eatenHouse.occupying = prevOccupying;
            }
            if (!checkWin()){
                m.board.game.changeTurn();
            }
        }
        resetReachable();
    }
    function removeTakenPawnFromOldSquare() {
        m.board.game.moving.moving = false;
        m.board.game.moving.numOccupying--;
        if (m.board.game.lastSquareLeft[m.board.game.moving.occupying - 1]){
        	m.board.game.lastSquareLeft[m.board.game.moving.occupying - 1].prevOccupying = 0;
        }
        m.board.game.moving.prevOccupying = m.board.game.moving.occupying;
        m.board.game.lastSquareLeft[m.board.game.moving.occupying - 1] = m.board.game.moving;
        if (m.board.game.moving.occupying === 5){
        	m.playerSetWall = m.board.game.playerTurn;
        } else {
        	 if (m.board.game.lastPawnMoved[m.board.game.moving.occupying - 1]){
             	m.board.game.lastPawnMoved[m.board.game.moving.occupying - 1].lastMoved = false;
             }
             m.lastMoved = true;
             m.board.game.lastPawnMoved[m.board.game.moving.occupying - 1] = m;
        }
        if (!m.board.game.moving.isHouse() || m.board.game.moving.numOccupying === 0) {
        	m.board.game.moving.occupying = 0;
		}
		m.board.game.moving = null;
    }
    m.click = function () {
        if (m.board.game.winner === null) {
            if (isNotPawnTaken()) {
                if (isPawnInThisSquare()) {
                    takePawn();
                }
            } else if (isPawnInThisSquareTaken()) {
                undoTakingPawn();
            } else if (isOccupableSquare()) {
                var prevOccupying = m.occupying;
                m.occupying = m.board.game.moving.occupying;
                removeTakenPawnFromOldSquare();
                putTakenPawnOnSquare(prevOccupying);
            }
            m.board.game.notation = m.board.game.getNotation();
        }
    };
};