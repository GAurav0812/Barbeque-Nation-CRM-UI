/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.auth',['UApps.services']).
        controller('LoginController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService', 'toastr',
            function ($scope, $rootScope, $location, AuthenticationService, toastr) {

                $scope.userLoginInfo = {
                    userName : "",
                    userPassword : ""
                };
                $scope.loginForm = {};

                // reset login status
                AuthenticationService.clearCredentials();

                $scope.login = function (isValid) {
                    if (isValid) {
                        $scope.dataLoading = true;
                        AuthenticationService.login($scope.userLoginInfo.userName, $scope.userLoginInfo.userPassword).then(function (response) {
                            $scope.dataLoading = false;
                            AuthenticationService.setCredentials($scope.userLoginInfo.userName, $scope.userLoginInfo.userPassword, response.message);
                            $location.path('/');
                        }, function(error){
                            $scope.dataLoading = false;
                            toastr.error(error,"Error");
                        });
                    }
                };

            }]).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('auth', {
                url: '/login',
                views: {
                    'auth': {
                        controller: 'LoginController',
                        templateUrl: 'app/auth/auth.html'
                    }
                },
                title: 'Login to Edu-Filer'
            });
    }
})();
