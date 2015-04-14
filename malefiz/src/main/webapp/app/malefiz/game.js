var Game = function (NotationUtils) {
    var m = this;
    m.moving = null;
    m.rules = true;
    m.playerTurn = 1;
    m.movingWall = false;
    m.moves = rollDice();
    m.board;
    m.winner = null;
    m.cantmove = false;
    m.notation = "1"+m.moves+"x1x1x1x1x1x2x2x2x2x2x3x3x3x3x3x4x4x4x4x4i13i9-11g7k7a3e3i3m3q3";
    m.lastSquareLeft = [];
    m.lastPawnMoved = [];

    m.setFromNotation = function () {
    	m.playerTurn = parseInt(m.notation.charAt(0));
    	var charAt1 = m.notation.charAt(1);
    	if (charAt1==="w"){
    		m.setWallTaken();
    	} else {
    		m.movingWall = false;
    		m.moves = parseInt(charAt1);
    	}
        m.board = new Board(m, m.notation.substring(2), NotationUtils);
    };
    
    m.setWallTaken = function() {
        m.movingWall = true;
        m.moving = {occupying: 5, isHouse: function () {
                return false;
            }};
    }

    m.setFromNotation();
    
    m.getNotation = function(){
    	return m.playerTurn +""+ (m.movingWall?"w":m.moves) + m.board.getNotation();
    }
    
    function cantMove(player, numMoves){
    	var sqPawns = getPlayerSquarePawns(player);
    	var cantMove = true;
    	var i = 0; 
    	while (i < sqPawns.length && cantMove){
    		cantMove = cantMove && sqPawns[i].reachableSquares(numMoves, player).length === 0;
    		i++;
    	}
    	return cantMove;
    	
    };
    
    m.changeTurn = function(){
        if (m.rules){
        	m.playerTurn = m.playerTurn % 4 + 1;
        	m.board.allSquaresFunction(function(sq) {
        		if (sq.playerSetWall === m.playerTurn){
        			sq.playerSetWall = 0;
        		}
        	});
            m.moves = rollDice();
            m.cantmove = cantMove(m.playerTurn, m.moves);
        } 
    };
    
    function getPlayerSquarePawns(player){
    	var sqPawns = [];
    	m.board.allSquaresFunction(function(sq) {
    		if (sq.occupying === player){
    			sqPawns.push(sq);
    		}
    	});
    	return sqPawns;
    }
    
    m.setWinner = function(player){
        m.winner = m.playerTurn;
    };
    
    function rollDice(){
        return Math.floor((Math.random() * 6) + 1);
    }
};

