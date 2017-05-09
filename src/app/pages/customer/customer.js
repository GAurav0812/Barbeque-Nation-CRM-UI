/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.customer', [])
        .config(routeConfig).controller('customerCtrl', customerCtrl)
        .filter("FilterByMonth", FilterByMonth)
        .filter("FilterByRating", FilterByRating)
        .filter("FilterByCategory", FilterByCategory)
        .filter("FilterByOverallRating", FilterByOverallRating);

    function customerCtrl($scope, $stateParams, $location, $uibModal, toastr, $http, $filter, $timeout) {

        var editModalBox;

        $scope.selected = {};
        $scope.urgentFeedback = false;
        $scope.notUrgentFeedback = false;
        $scope.dataLoading = false;
        $scope.noValidCustomer = false;
        $scope.isChartTabSelected = false;
        $scope.newMobileNumber = {
            form: {},
            info: {
                mobile: ""
            }
        };
        $scope.alcoholic = false;
        $scope.noAlcoholic = false;

        $scope.alcoholicFilter = function (item) {
            return item.Category === 'ALCOHLIC BEVERAGES';
        };


        $scope.nonAlcoholicFilter = function (item) {
            return item.Category === 'NON-ALCOHLIC BEVERAGES';


        };
        var LoadingModal;
        $scope.customerData = {};
        $scope.searchCustomer = function (isValid) {
            if (isValid) {
                LoadingModal = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/pages/Loading.html',
                    size: 'sm',
                    backdrop: 'static',
                    keyboard: false,
                    scope: $scope
                });
                /*//$http.jsonp('http://crm.bnhl.in/CRMProfile/Service1.svc/GetCustomerProfile/' + number + '&callback=JSON_CALLBACK')

                 $http({
                 method: 'JSONP',
                 url: 'http://api.worldbank.org/countries/all/indicators/SP.POP.TOTL?format=jsonP&prefix=Getdata', // + $scope.newMobileNumber.info.mobile,
                 params: {
                 format: 'jsonp',
                 json_callback: 'JSON_CALLBACK'
                 }
                 }).then(function (data) {

                 console.log(data)
                 });*/

                // $http.get("../Service1.svc/GetCustomerProfile/" + $scope.newMobileNumber.info.mobile).then(function (response) {
                $http.get("/GetCustomerProfile/" + $scope.newMobileNumber.info.mobile).then(function (response) {
                    //console.info(response.data);
                    $scope.customerData = response.data.customerinfo;
                    $scope.dataLoading = true;
                    $scope.visitMasterData = response.data.customerinfo.Visits;
                    $scope.visitsData = [].concat($scope.visitMasterData);//storing visitData
                    // $scope.visitsItemData = [];
                    console.info($scope.visitsData);
                    //Counting of totalfeedbackavg
                    $scope.totalFeedback = 0;
                    $scope.countUrgentFeedBack = 0;
                    $scope.countResolvedUrgentFeedBack = 0;

                    for (var i = 0; i < $scope.visitsData.length; i++) {
                        if ($scope.visitsData[i].Feedback != null) {
                            $scope.totalFeedback = (parseInt($scope.totalFeedback + $scope.visitsData[i].Feedback.GSI));
                            $scope.countUrgentFeedBack = $scope.countUrgentFeedBack + ($scope.visitsData[i].Feedback.UrgentFeed ? 1 : 0);
                            $scope.countResolvedUrgentFeedBack = $scope.countResolvedUrgentFeedBack + ($scope.visitsData[i].Feedback.UrgentFeedStatus.toUpperCase() == "CLOSE" ? 1 : 0);
                        }
                    }
                    $scope.avgFeedback = Math.round(($scope.totalFeedback / $scope.visitsData.length) * 100) / 100;
                    var dt = new Date($scope.customerData.LastVisitedOn);
                    $scope.LastVisitMonth = getMonthDiff(new Date(), dt);
                    //VisitDetailsArrayStoring
                    $scope.visitDetailsData = $scope.visitsData.VisitDetails;
                    LoadingModal.close();
                    loadMainChart($scope);
                }, function (errorMsg) {
                    toastr.error("No customer with this number");
                    $scope.dataLoading = false;
                });
            }
        };

        function getMonthDiff(to, from) {
            var months = to.getMonth() - from.getMonth()
                + (12 * (to.getFullYear() - from.getFullYear()));

            if (to.getDate() < from.getDate()) {
                months--;
            }
            return months;

        }


        /*  getCustomersData();

         function getCustomersData() {
         $http.get("assets/data/customers.json").then(function (response) {
         $scope.customersData = response.data;
         var customerArr = response.data;
         });
         $http.get("assets/data/visitDetail.json").then(function (response) {
         $scope.orderData = response.data;
         });
         $http.get("assets/data/feedbackDetails.json").then(function (response) {
         $scope.feedbackDetailsMasterData = response.data;
         });
         }*/

        /*   function getCustomerDetailsById(id) {
         for (var i in $scope.customersData) {
         if ($scope.customersData[i].ID == id)
         return $scope.customersData[i];
         }
         }*/


        $scope.editCustomerInfo = function () {
            editModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/customer/edit.customer.html',
                size: 'lg',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };
        $scope.openVisitDetailForm1 = function (item) {
            $scope.visitInfo = item;
            editModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/customer/view/view.visitingDetails1.html',
                size: 'lg',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };

        $scope.openFeedStatusForm = function () {
            editModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/customer/view/view.feedStatus.html',
                size: 'lg',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };
        $scope.openFeedStatusForm2 = function () {
            editModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/customer/view/view.feedbackStatus2.html',
                size: 'lg',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };

        $scope.openOrderForm1 = function (item) {
            $scope.visitInfo = item;
            $scope.visitDetailsData = item.VisitDetails;
            console.info($scope.visitDetailsData);
            console.info(item);
            $scope.orderInfo = $filter('filter')($scope.visitDetailsData, {VisitId: item.VisitId});

            /*  if (item.VisitId == $scope.orderInfo.VisitId);
             for (var i in $scope.orderInfo) {
             $scope.DetailId = $scope.orderInfo.DetailId;
             console.info($scope.orderInfo);
             }*/
            $scope.visitData = item;
            editModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/customer/view/view.orderDetails1.html',
                size: 'lg',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };
        $scope.getFeedbackIdByVisitId = function (VisitId) {
            for (var i in $scope.feedbackByVisitsInfo) {
                if ($scope.feedbackByVisitsInfo[i].VisitId == VisitId)
                    return $scope.feedbackByVisitsInfo[i].FeedbackId;
            }
        };

        $scope.getRowByVisitId = function () {
            for (var i in $scope.visitsInfo) {
                console.info($scope.visitsInfo);
                if ($scope.visitsInfo[i].VisitId == 3066480 || $scope.visitsInfo[i].VisitId == 1908737) {
                    $scope.urgentFeedback = true;
                } else {
                    $scope.notUrgentFeedback = true;
                }
            }
        };
        $scope.isParamNumber = false;
        if ($stateParams.phoneno != "") {
            $scope.newMobileNumber.info.mobile = $stateParams.phoneno;
            $scope.searchCustomer(true);
            /*  $scope.isParamNumber=true;*/
        }

        var ratingIndexes = ["Excellent", "Good", "Average"];
        $scope.ratings = ["Excellent", "Good", "Average"];
        $scope.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthIndexes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        $scope.category = ["Food & Beverages", "Service", "Ambiance & Hygiene", "Booking"];
        $scope.subCategory = ["Attentive", "Beverages", "Buffet", "Clean &Crisp", "Relaxing & Comfortable", "Reservation Experience", "Kulfi Nation", "Courteous & Concern", "Starters"];
        var ratingIndexes2 = ["Food & Beverages", "Service", "Ambiance & Hygiene", "Booking"];


        $scope.openFeedbackWindow = function (item) {
            $scope.feedback = item.Feedback.Feedback;
            $scope.noFeedback = false;
            $scope.category = ["Food & Beverages", "Service", "Ambiance & Hygiene", "Booking"];
            var feedbackDetailsData = [];
            if (item.Feedback != null && angular.isDefined(item.Feedback.FeedbackId)) {
                feedbackDetailsData = item.Feedback.FeedbackDetails;
            } else {
                $scope.noFeedback = true;
            }
            console.info(feedbackDetailsData);
            $timeout(function () { // THE FIX


                $scope.feedbackInfoData = [4, 2, 2, 0];
                $scope.subcategory_wiseFeedbackInfoData = [100, 25, 100, 75, 0, 75, 0, 25, 100];
                $scope.feedbackRatingCount = [4, 2, 1, 2];


                //graph1
                var countFB = 0;
                var gsiFB = 0;
                var countSV = 0;
                var gsiSV = 0;
                var countAM = 0;
                var gsiAM = 0;
                var countBK = 0;
                var gsiBK = 0;

                var countExe = 0;
                var countGood = 0;
                var countAvg = 0;


                var fullDetailGraphGSI = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                var fullDetailGraphGSICount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                for (var i = 0; i < feedbackDetailsData.length; i++) {

                    if (feedbackDetailsData[i].Category == "Food & Beverages") {
                        countFB++;
                        gsiFB += feedbackDetailsData[i].GSI;
                    } else if (feedbackDetailsData[i].Category == "Service") {
                        countSV++;
                        gsiSV += feedbackDetailsData[i].GSI;
                    } else if (feedbackDetailsData[i].Category == "Ambiance & Hygiene") {
                        countAM++;
                        gsiAM += feedbackDetailsData[i].GSI;
                    } else if (feedbackDetailsData[i].Category == "Booking") {
                        countBK++;
                        gsiBK += feedbackDetailsData[i].GSI;
                    }

                    if (feedbackDetailsData[i].Rating == "Excellent") {
                        countExe++;
                    } else if (feedbackDetailsData[i].Rating == "Good") {
                        countGood++;
                    } else if (feedbackDetailsData[i].Rating == "Average") {
                        countAvg++;
                    }


                    var subCategory = ["Attentive", "Beverages", "Buffet", "Clean &Crisp", "Relaxing & Comfortable", "Reservation Experience", "Kulfi Nation", "Courteous & Concern", "Starters"];

                    for (var s = 0; s < subCategory.length; s++) {
                        if (feedbackDetailsData[i].SubCategory == subCategory[s]) {
                            fullDetailGraphGSICount[s]++;
                            fullDetailGraphGSI[s] += feedbackDetailsData[i].GSI;
                        }
                    }


                }

                $scope.feedbackInfoData = [Math.round(gsiFB / countFB), Math.round(gsiSV / countSV),
                    Math.round(gsiAM / countAM), Math.round(gsiBK / countBK)];

                $scope.subcategory_wiseFeedbackInfoData = [
                    Math.round(fullDetailGraphGSI[0] / fullDetailGraphGSICount[0]),
                    Math.round(fullDetailGraphGSI[1] / fullDetailGraphGSICount[1]),
                    Math.round(fullDetailGraphGSI[2] / fullDetailGraphGSICount[2]),
                    Math.round(fullDetailGraphGSI[3] / fullDetailGraphGSICount[3]),
                    Math.round(fullDetailGraphGSI[4] / fullDetailGraphGSICount[4]),
                    Math.round(fullDetailGraphGSI[5] / fullDetailGraphGSICount[5]),
                    Math.round(fullDetailGraphGSI[6] / fullDetailGraphGSICount[6]),
                    Math.round(fullDetailGraphGSI[7] / fullDetailGraphGSICount[7]),
                    Math.round(fullDetailGraphGSI[8] / fullDetailGraphGSICount[8])
                ];

                $scope.feedbackRatingCount = [countExe, countGood, countAvg];


                $scope.pieOptions = {legend: {display: true}};
            });
            editModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/customer/view/view.feedbackDetails.html',
                size: 'lg',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };

        $scope.gotoVisitPage = function (item) {
            $location.path("/customer/view/" + item);
        };
        $scope.chartSelected = function () {
            $scope.isChartTabSelected = true;
        };
        $scope.chartDeSelected = function () {
            $scope.isChartTabSelected = false;
        };

    }


    function loadMainChart($scope) {
        //graph2

        // $scope.visitorData = [];

        $scope.categoryWiseFeedbackData = [100, 50, 75, 25];

        //graph1
        var countFB = 0;
        var gsiFB = 0;
        var countSV = 0;
        var gsiSV = 0;
        var countAM = 0;
        var gsiAM = 0;
        var countBK = 0;
        var gsiBK = 0;

        var countExe = 0;
        var countGood = 0;
        var countAvg = 0;

        for (var i = 0; i < $scope.visitsData.length; i++) {
            if ($scope.visitsData[i].Feedback != null) {
                var feedDetails = $scope.visitsData[i].Feedback.FeedbackDetails;
                for (var j = 0; j < feedDetails.length; j++) {
                    if (feedDetails[j].Category == "Food & Beverages") {
                        countFB++;
                        gsiFB += feedDetails[j].GSI;
                    } else if (feedDetails[j].Category == "Service") {
                        countSV++;
                        gsiSV += feedDetails[j].GSI;
                    } else if (feedDetails[j].Category == "Ambiance & Hygiene") {
                        countAM++;
                        gsiAM += feedDetails[j].GSI;
                    } else if (feedDetails[j].Category == "Booking") {
                        countBK++;
                        gsiBK += feedDetails[j].GSI;
                    }

                    if (feedDetails[j].Rating == "Excellent") {
                        countExe++;
                    } else if (feedDetails[j].Rating == "Good") {
                        countGood++;
                    } else if (feedDetails[j].Rating == "Average") {
                        countAvg++;
                    }
                }
            }

        }
        $scope.categoryWiseFeedbackData = [Math.round(gsiFB / countFB), Math.round(gsiSV / countSV),
            Math.round(gsiAM / countAM), Math.round(gsiBK / countBK)];

        $scope.feedbackCountReportData = [countExe, countGood, countAvg];
        $scope.chartOptions = {legend: {display: true}};
        $scope.options = {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Ratings'
                    }
                }]
            }
        };

        $scope.filterOutNull = function (p) {
            if (p.Feedback !== null) {
                return true;
            }
        };

        $scope.filterByAlcoholic = function (value) {
            if (value == null) {
                return true;
            }
        };
        $scope.filterByNonAlcoholic = function (value) {
            if (value == null) {
                return true;
            }
        };
        /*$scope.feedbackReasons = [{
         VisitedDate:""
         }];

         for (var i = 0; i < $scope.visitsData.length; i++) {
         if ($scope.visitsData[i].Feedback != null) {
         var feedReasons = $scope.visitsData[i].Feedback.FeedbackReason;
         for (var j = 0; j < feedReasons.length; j++) {
         $scope.feedbackReasons[j] = feedReasons[j];
         $scope.feedbackReasons[j].VisitedDate = $scope.visitsData[i].ReservationDate
         }
         }
         }*/

        console.info($scope.feedbackReasons)


    }

    function FilterByMonth() {
        return function (items, monthName) {
            var filtered = [];
            angular.forEach(items, function (el) {
                if (el.ReservationDate && el.ReservationDate.indexOf(monthName) == 0) {
                    filtered.push(el);
                }
            });
            return filtered;
        }
    }

    function FilterByOverallRating() {

        return function (items, rating) {
            var filteredFeedback = [];
            angular.forEach(items, function (el) {
                if (el.OverallRating && !el.OverallRating.indexOf(rating)) {
                    filteredFeedback.push(el);
                }
            });
            return filteredFeedback;
        }
    }


    function FilterByCategory() {

        return function (items, rating) {
            var filteredFeedback = [];
            angular.forEach(items, function (el) {
                if (el.Category && el.Category.indexOf(rating) > -1) {
                    filteredFeedback.push(el);
                }
            });
            return filteredFeedback;
        }
    }

    function FilterByRating() {

        return function (items, rating) {
            var filteredFeedback = [];
            angular.forEach(items, function (el) {
                if (el.Rating && el.Rating.indexOf(rating) > -1) {
                    filteredFeedback.push(el);
                }
            });
            return filteredFeedback;
        }
    }

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('customer', {
                url: '/customer/:phoneno',
                controller: customerCtrl,
                templateUrl: 'app/pages/customer/customer.html',
                sidebarMeta: {
                    icon: 'fa fa-user fa-lg',
                    order: 0,
                },
            });

    }

})();
