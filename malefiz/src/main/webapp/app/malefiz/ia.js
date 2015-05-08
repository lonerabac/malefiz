var IA = function(player, game){
	var m = this;
	m.player = player;
	m.game = game;
	function getBestMoveFromSq(sq, player, moves, wallsblock){
		var options = sq.reachableSquares(moves, player, sq, wallsblock);
		var best = null;
		if (options.length !== 0){
			for (var i = 0; i < options.length; i++){
				var advance = sq.getDistanceToWin(false) - options[i].getDistanceToWin(false);
				if (best === null || advance > best[2]){
					best = [sq, options[i], advance];
				}
			}
		}
		return best;
	}
	function getBestMove(pawnsNot, moves){
		var best = null;
		for (var i = 0; i < pawnsNot.length; i++){
			var pawn = m.game.board.getSq(pawnsNot[i]);
			var bestMovePawn = getBestMoveFromSq(pawn, pawn.occupying, m.game.moves, true);
			if (bestMovePawn !== null && (best === null || bestMovePawn[2] > best[2])){
				best = bestMovePawn;
			}	
		}
		return best;
	}
	m.play = function(){
		if (m.game.cantmove){
			m.game.changeTurn();
		} else {
			var p = m.game.board.getPlayersAndWallsSquares();
			var bestMove = getBestMove(p[m.player-1]);
			bestMove[0].click();
			bestMove[1].click();
			if (m.game.playerTurn === m.player){
				var bestPlace = null;
				var places;
				var squaresToWall = otherPlayerPawnsOrdered(p);
				if (m.game.board.getSq(squaresToWall[0]).coord[0]===13){
					if (m.player < 3 ){
						places = ["m3", "m5", "o3", "k3", "k5"];
					} else {
						places = ["e3", "e5", "c3", "g3", "g5"];
					}
					var i = 0;
					while (bestPlace=== null && i < places.length){
						var sq = m.game.board.getSq(places[i]);
						if (!sq.isOccupied()){
							bestPlace = sq;
						}
						i++;
					}
					
				}
				var i = 0;
				while (bestPlace === null && i < squaresToWall.length){
					var sq = m.game.board.getSq(squaresToWall[i]);
					bestPlace = wallBefore(sq, sq.occupying, 1, 2);
					i++;
				}
				if (bestPlace === null){
					m.game.board.allSquaresFunction(function(sq) {
						if (sq.playable && !sq.isOccupied()
								&& sq.coord[0] !== 13) {
							bestPlace = sq;
						}
					});
				}
				bestPlace.click();
				
			}
			
		}
	}
	
	function wallBefore(sq, player, numBefore, limit){
		var place = null;
		if (numBefore <= limit){
			var bestMoveOne = getBestMoveFromSq(sq, player, 1, false);
			if (bestMoveOne !== null && bestMoveOne[1].occupying !== m.player && bestMoveOne[2]>0){
				if (bestMoveOne[1].isOccupied()){
					place = wallBefore(bestMoveOne[1], player, numBefore + 1, limit);
				} else if (bestMoveOne[1].notation !=="i14"){
					place = bestMoveOne[1];
				}
			}
		}
		return place;
	}
	function mostAdvancedOtherPlayer(playerAndWallsSquares){
		var mostAdvanced = null;
		for(var i =  0; i < playerAndWallsSquares.length -1; i++){
			if (m.player!== i+1){
				for (var j = 0; j < playerAndWallsSquares[i].length; j++){
					var pawn = m.game.board.getSq(playerAndWallsSquares[i][j]);
					if (mostAdvanced === null || mostAdvanced.getDistanceToWin(false) > pawn.getDistanceToWin(false)){
						mostAdvanced = pawn;
					}
				}
			}
		}
		return mostAdvanced;
	}
	
	function otherPlayerPawnsOrdered (playerAndWallsSquares){
		var otherPlayerPawns = []
		for(var i =  0; i < playerAndWallsSquares.length -1; i++){
			if (m.player!== i+1){
				otherPlayerPawns = otherPlayerPawns.concat(playerAndWallsSquares[i]);
			}
		}
		otherPlayerPawns.sort(compareAdvanceNot);
		return otherPlayerPawns;
	}
	
	function compareAdvanceNot(sq1not, sq2not){
		 return compareAdvance(m.game.board.getSq(sq1not), m.game.board.getSq(sq2not));
	}
	
	function compareAdvance (sq1, sq2){
		return sq1.getDistanceToWin(false) - sq2.getDistanceToWin(false);
	}
	
}