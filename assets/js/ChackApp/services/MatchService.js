/**
 * Created by nackjicholson on 12/7/13.
 */

angular.module('ChackApp').factory(
    'MatchService',
    [
        '$resource',
        function($resource) {
            return $resource('/match/:id');
        }
    ]
);