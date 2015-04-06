(function () {
    var app = angular.module('malefizMod', []);
    app.controller('MalefizCtrl',
            function () {
                var notationUtils = new NotationUtils();
                var m = this;
                m.game = new Game(notationUtils);
                m.setGame = function (notation) {
                    m.game.setFromNotation(notation, notationUtils);
                };

            });

})();