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
    m.notation = "x1x1x1x1x1x2x2x2x2x2x3x3x3x3x3x4x4x4x4x4i13i9-11g7k7a3e3i3m3q3";

    m.setFromNotation = function () {
        m.board = new Board(m, m.notation, NotationUtils);
    };

    m.setFromNotation();
    
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

