var IA = function(player, game){
	var m = this;
	m.player = player;
	m.game = game;
	m.play = function(){
		if (m.game.cantmove){
			m.game.changeTurn();
		} else {
			var p = m.game.board.getPlayersAndWallsSquares();
			var i = 0;
			var end = false;
			while(!end){
				var sq = m.game.board.getSquares(p[m.player-1][i])[0];
				sq.click();
				var options = sq.reachableSquares(m.game.moves, m.player, sq);
				if (options.length === 0){
					sq.click();
					i++;
				} else {
					options[0].click();
					end = true;
				}
			}
			if (m.game.playerTurn === m.player){
				var place = null;
				m.game.board.allSquaresFunction(function(sq) {
					if (sq.playable && !sq.isOccupied() && sq.coord[0]!==13){
						place = sq;						
					}
				});
				place.click();
				
			}
			
		}
	}
	
}