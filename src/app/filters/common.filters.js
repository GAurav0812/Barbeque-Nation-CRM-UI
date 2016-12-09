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
        .filter('noValueFilter', noValueFilter);


    function statusFullForm() {
        return function (value) {
            return value == "I" ? "InActive" : "Active";
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

})();
