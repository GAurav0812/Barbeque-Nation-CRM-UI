/**
 * Created by Sandeep on 9/9/2016.
 */
(function () {
    'use strict';


    angular.module('UApps.services')
        .factory("AuthenticationService", AuthenticationService);


    /** @ngInject */
    function AuthenticationService(Base64, $http,  $q, HttpService, $cookieStore, $rootScope) {
        var httpService = new HttpService("user");

        var AuthenticationService = {};

        AuthenticationService.authenticate = function () {
            return angular.isDefined($rootScope.globals.currentUser);
        };

        AuthenticationService.getUserId = function () {
            return angular.isDefined($rootScope.globals.currentUser.userId);
        };

        AuthenticationService.init = function () {
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                if (!$rootScope.globals.currentUser.userid)
                    $rootScope.globals = {};
                else
                $http.defaults.headers.common['Auth'] = $rootScope.globals.currentUser.authdata; // jshint ignore:line
                $http.defaults.headers.common['sessionId'] = $rootScope.globals.currentUser.sessionId; // jshint ignore:line
            }
        };

        AuthenticationService.login = function (username, password) {
            var self = this;
            /*return httpService.post('login', {
                "userName": username,
                "password": password
            });*/

            //OFFLINE LOGIN
            var loginResponse = {
                message : "1280918200@1"
            }
                        return $q.resolve(loginResponse);
        };

        AuthenticationService.logout = function () {
            return httpService.post('logout', {
                "userId": AuthenticationService.getUserId()
            });
        };

        AuthenticationService.setCredentials = function (username, password, sessionId) {
            var sessionTimeStamp = sessionId.split("@")[0];
            var authdata = Base64.encode(username + ':' + password + ":" + sessionTimeStamp);
            $rootScope.globals = {
                currentUser: {
                    userid: sessionId.split("@")[1],
                    authdata: authdata,
                    sessionId: sessionId
                }
            };
            $http.defaults.headers.common['Auth'] = authdata; // jshint ignore:line
            $http.defaults.headers.common['sessionId'] = sessionId; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        };

        AuthenticationService.clearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = '';
        };

        return AuthenticationService;

    }


})();