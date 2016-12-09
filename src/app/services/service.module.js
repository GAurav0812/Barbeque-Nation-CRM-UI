/**
 * Created by Sandeep on 9/9/2016.
 */
(function () {
    'use strict';

    angular.module('UApps.services', [])
        .factory('HttpService', function ($http, $q, $location, toastr) {
            var apiRoot = "../rest/";

            var HttpService = function (apiModule) {
                this.apiModule = apiModule;
            };

            function makeRequestSuccess(response) {
                if (response.data.messageType == "SUCCESS") {
                    return response.data;
                } else if(response.data.messageType == "UNAUTHORIZED") {
                    toastr.error("Unauthorized access!","Error");
                } else {
                    return $q.reject(response.data.message);
                }
            }

            function makeRequestFailed(response) {
                var errMsg = "Some problem in server, try reloading the page. If the issue still persist contact admin.";
                return $q.reject("Error#" + response.status +": " + errMsg);
            }

            HttpService.prototype.get = function (url) {
                var self = this;
                return $http.get(apiRoot + self.apiModule + "/" + url).then(makeRequestSuccess, makeRequestFailed);
            };
            HttpService.prototype.post = function (url, params) {
                var self = this;
                return $http.post(apiRoot + self.apiModule + "/" + url, params).then(makeRequestSuccess, makeRequestFailed);
            };
            HttpService.prototype.delete = function (url) {
                var self = this;
                return $http.delete(apiRoot + self.apiModule + "/" + url).then(makeRequestSuccess, makeRequestFailed);
            };
            return HttpService;
        })
        .factory('DataObject', function(){
            var DataObject = function(){
                this.rows = [];
            };
            DataObject.prototype ={
                getList : function(){
                    return this.rows;
                },
                getRowById: function (id, safedata) {
                    var self = this;
                    for (var i in self.rows) {
                        if (self.rows[i].id == id) {
                            return self.rows[i];
                        }
                    }
                    return safedata;
                },
                getRowIndexById: function (id) {
                    var self = this;
                    for (var i in self.rows) {
                        if (self.rows[i].id == id) {
                            return i;
                        }
                    }
                    return -1;
                }
            };

            return DataObject;
        })
        .factory('Base64', function () {
            /* jshint ignore:start */

            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

            return {
                encode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;

                    do {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);

                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;

                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }

                        output = output +
                            keyStr.charAt(enc1) +
                            keyStr.charAt(enc2) +
                            keyStr.charAt(enc3) +
                            keyStr.charAt(enc4);
                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";
                    } while (i < input.length);

                    return output;
                }
            };

            /* jshint ignore:end */
        });

})();
