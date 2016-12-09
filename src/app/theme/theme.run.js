/**
 * @author v.lugovksy
 * created on 15.12.2015
 */
(function () {
  'use strict';

  angular.module('UApps.theme')
    .run(themeRun);

  /** @ngInject */
  function themeRun($timeout, $rootScope, layoutPaths, preloader, $q, baSidebarService, themeLayoutSettings) {
    var whatToWait = [
    ];

    /*$q.all(whatToWait).then(function () {
      $rootScope.$pageFinishedLoading = true;
    });*/

    $timeout(function () {
      if (!$rootScope.$pageFinishedLoading) {
        $rootScope.$pageFinishedLoading = true;
      }
    }, 100);

    $rootScope.$baSidebarService = baSidebarService;
  }

})();