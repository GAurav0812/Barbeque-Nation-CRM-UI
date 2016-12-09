/**
 * @author v.lugovsky
 * created on 15.12.2015
 */
(function () {
    'use strict';


    angular.module('UApps.pages')
        .constant("clientDetails", {
            id : 1,
            name: "The Unique Media Solution",
            site : "www.theuniquemedia.in"
        })
        .constant("assignedSubjectTypes", [
            {id: '1', text: 'Year-Wise'},
            {id: '2', text: 'Semester-Wise'}
        ]);


})();
