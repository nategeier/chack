/**
 * Created by nackjicholson on 12/7/13.
 */

angular.module('ChackApp').controller(
    'ScoreboardCtrl',
    [
        '$scope', '$routeParams', 'MatchService',
        function($scope, $routeParams, MatchService) {
            $scope.match = MatchService.get($routeParams);
        }
    ]
);