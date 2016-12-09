/**
 * Created by k.danovsky on 12.05.2016.
 */

(function () {
  'use strict';

  angular.module('UApps.theme')
    .service('themeLayoutSettings', themeLayoutSettings);

  /** @ngInject */
  function themeLayoutSettings(baConfig) {
    var isMobile = (/android|webos|iphone|ipad|ipod|blackberry|windows phone/).test(navigator.userAgent.toLowerCase());
    var mobileClass = isMobile ? 'mobile' : '';
    var blurClass = baConfig.theme.mint ? 'blur-theme' : '';
    angular.element(document.body).addClass(mobileClass).addClass(blurClass);

    return {
      blur: baConfig.theme.mint,
      mobile: isMobile,
    }
  }

})();