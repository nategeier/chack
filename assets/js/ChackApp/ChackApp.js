/**
 * Created by nackjicholson on 12/7/13.
 */

angular.module('ChackApp', ['ngResource','ngRoute'])
    .config([
        '$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'MatchIndexCtrl',
                    templateUrl: '/js/ChackApp/partials/match-index.html'
                })
                .when('/:id', {
                    controller: 'ScoreboardCtrl',
                    templateUrl: '/js/ChackApp/partials/scoreboard.html'
                })
                .otherwise({
                    controller: 'MatchIndexCtrl',
                    templateUrl: '/js/ChackApp/partials/match-index.html'
                });
        }
    ]);