/**
 * Created by nackjicholson on 12/7/13.
 */

angular.module('ChackApp').controller(
    'MatchIndexCtrl',
    [
        '$scope', 'MatchService',
        function($scope, MatchService) {
            $scope.matches = MatchService.query();
        }
    ]
);