var IA = function(player, game){
	var m = this;
	m.player = player;
	m.game = game;
	function getBestMoveFromSq(sq, player, moves){
		var options = sq.reachableSquares(moves, player, sq, true);
		var best = null;
		if (options.length !== 0){
			for (var i = 0; i < options.length; i++){
				var advance = sq.distanceToWin - options[i].distanceToWin;
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
			var bestMovePawn = getBestMoveFromSq(pawn, pawn.occupying, m.game.moves);
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
				var squaresToWall = otherPlayerPawnsOrdered(p);
				if (m.game.board.getSq(squaresToWall[0]).coord[0]===13){
					if (m.player < 3 ){
						squaresToWall = ["n5", "l5", "p3", "n3"];
					} else {
						squaresToWall = ["d5", "f5", "b3", "d3"];
					}
				}
				var place = null;
				var i = 0;
				while (place === null && i < squaresToWall.length){
					var sq = m.game.board.getSq(squaresToWall[i]);
					place = wallBefore(sq, sq.occupying, 1, 3);
					i++;
				}
				if (place === null){
					m.game.board.allSquaresFunction(function(sq) {
						if (sq.playable && !sq.isOccupied()
								&& sq.coord[0] !== 13) {
							place = sq;
						}
					});
				}
				place.click();
				
			}
			
		}
	}
	function wallBefore(sq, player, numBefore, limit){
		var place = null;
		if (numBefore <= limit){
			var bestMoveOne = getBestMoveFromSq(sq, player, 1);
			if (bestMoveOne !== null){
				if (bestMoveOne[1].isOccupied() || bestMoveOne[1].coord[0]===13){
					place = wallBefore(bestMoveOne[1], player, numBefore + 1, limit);
				} else if (bestMoveOne[1].notation !=="i14"){
					place = bestMoveOne[1];
				}
			}
		}
		return place;
		
		
//		var adj = sq.adjacentSquares();
//		for (var i = 0; i< adj.length; i++){
//			if(!adj[i].isOcupied())
//		}
	}
	function mostAdvancedOtherPlayer(playerAndWallsSquares){
		var mostAdvanced = null;
		for(var i =  0; i < playerAndWallsSquares.length -1; i++){
			if (m.player!== i+1){
				for (var j = 0; j < playerAndWallsSquares[i].length; j++){
					var pawn = m.game.board.getSq(playerAndWallsSquares[i][j]);
					if (mostAdvanced === null || mostAdvanced.distanceToWin > pawn.distanceToWin){
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
		return sq1.distanceToWin - sq2.distanceToWin;
	}
	
}