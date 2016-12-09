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

    function customerCtrl($scope, $location, $uibModal, $http, $filter) {

        var editModalBox;

        $scope.selected = {};

        /* $scope.customersData = [
         {

         "CustomerId": 2272582,
         "Name": "MR. RAGUVEER",
         "PhoneNo": 8980005172,
         "EmailId": "raghu@gmail.com",
         "DOB": "12-Jul",
         "DOA": "01-Apr",
         "CompanyName": "CARL Pvt Ltd",

         "visitDetails": [
         {
         "VisitId": 71,
         "OutletName": "AMD-DRIVEIN",
         "ReservationDate": "01-04-13",
         "ReservationTime": "1754-01-01 13:57:16.983",
         "Session": "Lunch",
         "TotalPax": 4,
         "Adult": 4,
         "Child": 0,
         "ConfirmTime": "1754-01-01 13:57:36.297",
         "SeatedTime": "1754-01-01 13:57:35.127",
         "SettlementTime": "1754-01-01 14:05:45.500",
         "Status": "Lunch",
         "TableNo": 33,
         "BillNo": "00000P0007000006503",
         "Amount": 3312,
         "ReservationType": "Walk-in",
         "BBQFestival": "NULL",
         "CalendarFestival": "NULL",
         "VisitRemark": "Seating near to AC",
         "CarNo": "KN 04 4567",
         "orderDetails": {
         "DetailId": 16,
         "items": [
         {
         "ItemNo": "I00006871",
         "ItemName": "LUNCH VEG",
         "Category": "FOOD - VEG",
         "ProductGroup": "BUFFET VEG",
         "Division": "FOOD 1",
         "Quantity": 3,
         "TotalAmount": 1356
         },
         {
         "ItemNo": "I00006872",
         "ItemName": "LUNCH NON VEG",
         "Category": "FOOD - NON VEG",
         "ProductGroup": "BUFFET NONVEG",
         "Division": "FOOD 1",
         "Quantity": 1,
         "TotalAmount": 1956
         }
         ]

         }

         },

         {
         "VisitId": 72,
         "OutletName": "AMD-DRIVEIN",
         "ReservationDate": "01-04-13",
         "ReservationTime": "1754-01-01 13:57:16.983",
         "Session": "Lunch",
         "TotalPax": 4,
         "Adult": 4,
         "Child": 0,
         "ConfirmTime": "1754-01-01 13:57:36.297",
         "SeatedTime": "1754-01-01 13:57:35.127",
         "SettlementTime": "1754-01-01 14:05:45.500",
         "Status": "Lunch",
         "TableNo": 33,
         "BillNo": "00000P0007000006503",
         "Amount": 500,
         "ReservationType": "Walk-in",
         "BBQFestival": "NULL",
         "CalendarFestival": "NULL",
         "VisitRemark": "Seating near to AC",
         "CarNo": "KN 04 4567",
         "orderDetails": {
         "DetailId": 18,
         "items": [
         {
         "ItemNo": "I00006872",
         "ItemName": "LUNCH NON VEG",
         "Category": "FOOD - NON VEG",
         "ProductGroup": "BUFFET NONVEG",
         "Division": "FOOD 1",
         "Quantity": 1,
         "TotalAmount": 500
         }
         ]
         }
         }
         ]
         },
         {
         "CustomerId": 2272583,
         "Name": "MR. Vikrant",
         "PhoneNo": 8981115172,
         "EmailId": "vikrant@gmail.com",
         "DOB": "13-Oct",
         "DOA": "22-Feb",
         "CompanyName": "THE UNIQUE MEDIA SULUTION",

         "visitDetails": [
         {
         "VisitId": 78,
         "OutletName": "AMD-DRIVEIN",
         "ReservationDate": "01-04-13",
         "ReservationTime": "1754-01-01 13:57:16.983",
         "Session": "Lunch",
         "TotalPax": 4,
         "Adult": 4,
         "Child": 0,
         "ConfirmTime": "1754-01-01 13:57:36.297",
         "SeatedTime": "1754-01-01 13:57:35.127",
         "SettlementTime": "1754-01-01 14:05:45.500",
         "Status": "Lunch",
         "TableNo": 44,
         "BillNo": "00000P0007000006603",
         "Amount": 1400,
         "ReservationType": "Walk-in",
         "BBQFestival": "NULL",
         "CalendarFestival": "NULL",
         "VisitRemark": "Seating near to AC",
         "CarNo": "KN 05 4567",
         "orderDetails": {
         "DetailId": 10,
         "items": [
         {
         "ItemNo": "I00006871",
         "ItemName": "LUNCH VEG",
         "Category": "FOOD - VEG",
         "ProductGroup": "BUFFET VEG",
         "Division": "FOOD 1",
         "Quantity": 4,
         "TotalAmount": 600
         },
         {
         "ItemNo": "I00006872",
         "ItemName": "LUNCH NON VEG",
         "Category": "FOOD - NON VEG",
         "ProductGroup": "BUFFET NONVEG",
         "Division": "FOOD 1",
         "Quantity": 4,
         "TotalAmount": 800
         }
         ]

         }

         }]
         }
         ];*/

        // $scope.myData = $scope.customersData[0];
        $scope.urgentFeedback = false;
        $scope.notUrgentFeedback = false;


        $scope.checkCustomerData = function () {
            $http.get("assets/data/visitHead.json").then(function (response) {
                $scope.visitsMasterData = response.data;
                $scope.visitsMasterData = $filter('filter')($scope.visitsMasterData, {CustomerId: $scope.selected.customer.ID});
                $scope.visitsInfo = [].concat($scope.visitsMasterData);
                $scope.getRowByVisitId();
                $scope.numberOfVisits = $scope.visitsInfo.length;
                $scope.CustomersOrderData = $filter('filter')($scope.orderData, {CustomerId: $scope.selected.customer.ID});
                $scope.numberOfOrder = $scope.CustomersOrderData.length;
                $scope.myData = $scope.selected.customer;

                $scope.visitDetailData = $filter('filter')($scope.orderData, {CustomerId: $scope.selected.customer.ID});

                $scope.totalAmount = 0;

                for (var i = 0; i < $scope.visitDetailData.length; i++) {
                    $scope.totalAmount = (parseInt($scope.totalAmount + $scope.visitDetailData[i].TotalAmount));
                }
                $scope.avgAmountSpent = Math.round(($scope.totalAmount / $scope.visitDetailData.length) * 100) / 100;
                $scope.avgAmountSpent = -($scope.avgAmountSpent);

                $http.get("assets/data/feedbackHead.json").then(function (response) {
                    $scope.feedbackData = response.data;
                    $scope.CustomerFeedbackData = $filter('filter')($scope.feedbackData, {CustomerId: $scope.selected.customer.ID});
                    $scope.chart();
                    $scope.totalFeedback = 0;
                    for (var i = 0; i < $scope.CustomerFeedbackData.length; i++) {
                        $scope.totalFeedback = (parseInt($scope.totalFeedback + $scope.CustomerFeedbackData[i].GSI));
                    }
                    $scope.avgFeedback = Math.round(($scope.totalFeedback / $scope.CustomerFeedbackData.length) * 100) / 100;


                    $scope.numberOfFeedback = $scope.CustomerFeedbackData.length;
                });
            });
        };


        getCustomersData();

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
        }

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
            $scope.visitData = item;
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
            $scope.orderInfo = $filter('filter')($scope.orderData, {VisitId: item.VisitId});
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
                }else {
                    $scope.notUrgentFeedback = true;
                }
            }
        };

        var ratingIndexes = ["Excellent", "Good", "Average"];
        $scope.ratings = ["Excellent", "Good", "Average"];
        $scope.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthIndexes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        $scope.category = ["Food & Beverages", "Service", "Ambiance & Hygiene", "Booking"];
        $scope.subCategory = ["Attentive", "Beverages", "Buffet", "Clean &Crisp", "Relaxing & Comfortable", "Reservation Experience", "Kulfi Nation", "Courteous & Concern", "Starters"];
        var ratingIndexes2 = ["Food & Beverages", "Service", "Ambiance & Hygiene", "Booking"];

        $scope.openFeedbackWindow = function (item) {
            $scope.noFeedback = false;
            $scope.feedbackByVisitsInfo = $filter('filter')($scope.CustomerFeedbackData, {VisitId: item.VisitId});
            $scope.FeedbackVisitId = item.VisitId;
            $scope.FeedId = $scope.getFeedbackIdByVisitId(item.VisitId);
            $scope.category = ["Food & Beverages", "Service", "Ambiance & Hygiene", "Booking"];
            if (angular.isDefined($scope.FeedId)) {
                var feedbackDetailsData = $filter('filter')($scope.feedbackDetailsMasterData, {FeedbackId: $scope.FeedId});
            } else {
                $scope.noFeedback = true;
            }
            console.info(feedbackDetailsData);


            $scope.feedbackInfoData = [];
            if ($scope.selected.customer.ID == 2168832) {
                $scope.feedbackInfoData = [4, 2, 2, 0];
            }
            else if ($scope.selected.customer.ID == 2286670 || $scope.selected.customer.ID == 980645) {
                $scope.feedbackInfoData = [2, 1, 3, 0];
            } else {
                $scope.feedbackInfoData = [5, 0, 3, 1];
            }

            /* var feedbackChartArr = [];
             var ratingIndexes2 = ["Food & Beverages", "Service", "Ambiance & Hygiene", "Booking"];
             for (var r in ratingIndexes2) {
             var forThisFeedbackArr = $filter('FilterByCategory')(feedbackDetailsData, "" + ratingIndexes2[r] + "");
             feedbackChartArr.push(forThisFeedbackArr.length);
             }
             $scope.feedbackInfoData.push(feedbackChartArr);*/


            if ($scope.selected.customer.ID == 2168832) {
                $scope.subcategory_wiseFeedbackInfoData = [100, 25, 100, 75, 0, 75, 0, 25, 100];
            }
            else if ($scope.selected.customer.ID == 2286670 || $scope.selected.customer.ID == 980645) {
                $scope.subcategory_wiseFeedbackInfoData = [100, 25, 100, 75, 0, 75, 0, 25, 100];
            } else {
                $scope.subcategory_wiseFeedbackInfoData = [100, 25, 100, 75, 0, 75, 0, 25, 100];
            }


            $scope.feedbackRatingCount = [];

            if ($scope.selected.customer.ID == 2168832) {
                $scope.feedbackRatingCount = [4, 2, 1, 2];
            }
            else if ($scope.selected.customer.ID == 2286670 || $scope.selected.customer.ID == 980645) {
                $scope.feedbackRatingCount = [3, 1, 4, 1];
            } else {
                $scope.feedbackRatingCount = [2, 4, 1, 0];
            }
            /*         var feedbackWiseArr = [];
             for (var f in ratingIndexes) {
             var forThisArr = $filter('FilterByRating')(feedbackDetailsData, "" + ratingIndexes[f] + "");
             feedbackWiseArr.push(forThisArr.length);
             }
             $scope.feedbackRatingCount = feedbackWiseArr;*/

            $scope.pieOptions = {legend: {display: true}};
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

        $scope.chart = function () {
            //graph2

            $scope.visitorData = [];
            if ($scope.selected.customer.ID == 2168832) {
                $scope.categoryWiseFeedbackData = [100, 50, 75, 25];
            }
            else if ($scope.selected.customer.ID == 2286670 || $scope.selected.customer.ID == 980645) {
                $scope.categoryWiseFeedbackData = [25, 50, 100, 75];
            } else {
                $scope.categoryWiseFeedbackData = [75, 25, 100, 50];
            }


            var visitorArr = $scope.visitsInfo;
            var chartArr = [];
            for (var m in monthIndexes) {
                var forThisMonthArr = $filter('FilterByMonth')(visitorArr, "" + monthIndexes[m] + "/");
                chartArr.push(forThisMonthArr.length);
            }
            $scope.visitorData.push(chartArr);

            //graph1
            var feedBackGraphData = $filter('filter')($scope.feedbackData, {CustomerId: $scope.selected.customer.ID});
            console.info(feedBackGraphData);

            $scope.feedbackCountReportData = [2, 1, 0];

            if ($scope.selected.customer.ID == 2168832) {
                $scope.feedbackCountReportData = [2, 1, 0];
            }
            else if ($scope.selected.customer.ID == 2286670 || $scope.selected.customer.ID == 980645) {
                $scope.feedbackCountReportData = [0, 2, 1];
            } else {
                $scope.feedbackCountReportData = [1, 0, 2];
            }
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
            /*  var chart2Arr = [];
             for (var f in ratingIndexes) {
             var forThisArr = $filter('FilterByOverallRating')(feedBackGraphData, "" + ratingIndexes[f] + "");
             chart2Arr.push(forThisArr.length);
             }
             $scope.feedbackCountReportData.push(chart2Arr);*/

        };

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
                url: '/customer',
                controller: customerCtrl,
                templateUrl: 'app/pages/customer/customer.html',
                title: 'Customer',
                sidebarMeta: {
                    icon: 'fa fa-user fa-lg',
                    order: 0,
                },
            });

    }

})();
