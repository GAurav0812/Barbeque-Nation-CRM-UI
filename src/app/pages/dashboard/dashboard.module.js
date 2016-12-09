/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.dashboard', [])
        .config(routeConfig).controller('DashboardCtrl', DashboardCtrl)

    function DashboardCtrl($location) {

    }


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                controller: DashboardCtrl,
                templateUrl: 'app/pages/dashboard/dashboard.html',
                title: 'Dashboard',
                sidebarMeta: {
                    icon: 'fa fa-dashboard fa-lg',
                    order: 0,
                }
            });

    }

})();
