var Game = function (NotationUtils) {
    var m = this;
    m.moving = null;
    m.rules = true;
    m.playerTurn = 1;
    m.movingWall = false;
    m.moves = rollDice();
    m.board;
    m.winner = null;
    m.notation = "x1x1x1x1x1x2x2x2x2x2x3x3x3x3x3x4x4x4x4x4i13i9-11g7k7a3e3i3m3q3";

    m.setFromNotation = function () {
        //todo turns
        m.board = new Board(m, m.notation, NotationUtils);
    };

    m.setFromNotation();
    
    m.changeTurn = function(){
        if (m.rules){
            m.playerTurn = m.playerTurn % 4 + 1;
            m.moves = rollDice();
        } 
    };
    
    m.setWinner = function(player){
        m.winner = m.playerTurn;
    };
    
    function rollDice(){
        return Math.floor((Math.random() * 6) + 1);
    }
};

