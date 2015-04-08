<!DOCTYPE html>
<html>
    <head>
        <title>Malefiz</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="libs/angular.js/angular.js"></script>
        <link rel="stylesheet" type="text/css" href="app/malefiz/malefiz.css"/>

        <script src="app/malefiz/notationUtils.js"></script>
        <script src="app/malefiz/game.js"></script>
        <script src="app/malefiz/board.js"></script>
        <script src="app/malefiz/square.js"></script>
        <script src="app/malefiz/malefizCtrl.js"></script>
        <script src="app/app.js"></script>
    </head>
    <body>
        <div ng-app="app">
            <div ng-controller= "MalefizCtrl as mlfz">
                <div class = "dice" ng-class="'occupying' + mlfz.game.playerTurn">
                    {{mlfz.game.winner===null?(mlfz.game.movingWall?' Set a wall':' Move '+mlfz.game.moves+' squares'):'Player '+mlfz.game.playerTurn+' wins!'}}
                </div>
                <table class ="board">
                    <tr ng-repeat="row in mlfz.game.board.rows">
                        <td ng-repeat="square in row track by $index"
                            ng-class="[
                                        square.coord[0]!==13 && mlfz.game.movingWall?'movingwall':'',
                                        square.reachable?'reachable'+mlfz.game.playerTurn:'',
                                        square.moving?'moving':'', 
                                        square.playable?'playable':'notplayable',
                                        square.isHouse()?'house':'',
                                        square.notation === 'x1'?'occupying1':'',
                                        square.notation === 'x2'?'occupying2':'',
                                        square.notation === 'x3'?'occupying3':'',
                                        square.notation === 'x4'?'occupying4':'',
                                        'occupying'+square.occupying
                                        ]"
                            ng-click="square.click()">
                            <span ng-if="square.isHouse()">{{square.numOccupying}} </span>
                        </td>
                    </tr>
                </table>
                <br>
                <% if (request.getParameter("d") != null){%>
                <div class ="boardnotation">
                    <input ng-model="mlfz.game.notation" type="text"/>
                    <button ng-click="mlfz.setGame()">Apply</button>
                </div>
                <%} %>
            </div>
        </div>
    </body>
</html>
