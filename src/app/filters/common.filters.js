/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.filters', [])
        .filter('statusFullForm', statusFullForm)
        .filter('subjectAssignTypeFilter', subjectAssignTypeFilter)
        .filter('emptyInputFilter', emptyInputFilter)
        .filter('noValueFilter', noValueFilter)
        .filter('dateFilter', dateFilter)
        .filter('timeFilter', timeFilter)
        .filter('starFilter', starFilter)
        .filter('ratingFilter', ratingFilter);


    function statusFullForm() {
        return function (value) {
            return value == "I" ? "InActive" : "Active";
        };
    }

    function dateFilter($filter) {
        return function (value) {
            var dt = new Date(value);
            return $filter('date')(dt, 'yyyy-MM-dd')
        };
    }

    function timeFilter($filter) {
        return function (value) {
            var dt = new Date(value);
            return $filter('date')(dt, 'hh:mm:ss a')
        };
    }

    function subjectAssignTypeFilter(assignedSubjectTypes) {
        return function (value) {
            return value == "1" ? assignedSubjectTypes[0].text : assignedSubjectTypes[1].text;
        };
    }

    function emptyInputFilter() {
        return function (value) {
            return value == "" || value == "NULL" ? "-" : value;
        };
    }

    function noValueFilter() {
        return function (value) {
            return value == "" ? "<em class='text-color-muted'><small>No Value</small></em>" : value;
        };
    }

    function ratingFilter() {
        return function (value) {
            if (value == "Good") {
                return "<span><i class='fa fa-star green-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star green-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star green-icon-text' aria-hidden='true'></i>  </span> "
            }
            else if (value == "Average") {
                return "<span><i class='fa fa-star red-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star red-icon-text ' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-o red-icon-text' aria-hidden='true'></i>  </span>"
            }
            else  if (value == "Poor") {
                return "<span><i class='fa fa-star red-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-o red-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-o red-icon-text' aria-hidden='true'></i>  </span>"
            }

        };
    }

    function starFilter() {
        return function (value) {
            if (value > 75 && value <= 10075) {
                return "<span><i class='fa fa-star green-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star green-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star green-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star green-icon-text' aria-hidden='true'></i>  </span> "
            }
            else if (value > 50 && value <= 75) {
                return "<span><i class='fa fa-star red-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star red-icon-text ' aria-hidden='true'></i> " +
                    "<i class='fa fa-star red-icon-text ' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-o red-icon-text' aria-hidden='true'></i>  </span>"
            }
            else if (value > 25 && value <= 50) {
                return "<span><i class='fa fa-star red-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star red-icon-text ' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-o red-icon-text ' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-o red-icon-text' aria-hidden='true'></i>  </span>"
            }
            else if (value > 0 && value <=25) {
                return "<span><i class='fa fa-star red-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-o red-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-o red-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-o red-icon-text' aria-hidden='true'></i>  </span>"
            }
            else if (value < 0) {
                return "<span><i class='fa fa-star-0 red-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-o red-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-o red-icon-text' aria-hidden='true'></i> " +
                    "<i class='fa fa-star-o red-icon-text' aria-hidden='true'></i>  </span>"
            }

        };
    }


})();
