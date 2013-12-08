/**
 * Created by nackjicholson on 12/7/13.
 */

angular.module('ChackApp').controller(
    'ScoreboardCtrl',
    [
        '$scope', '$routeParams', 'MatchService',
        function($scope, $routeParams, MatchService) {
            var match = MatchService.get($routeParams);

            $scope.addWin = function(player) {
                player.wins += 1;
                match.$save();
            };

            $scope.removeWin = function(player) {
                player.wins -= 1;
                match.$save();
            };

            $scope.match = match;
        }
    ]
);