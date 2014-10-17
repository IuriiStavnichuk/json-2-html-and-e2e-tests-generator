/*global $ angular */
/*jshint browser:true globalstrict:true */
'use strict';

// MainWebApp

var MainWebApp = angular.module('MainWebApp', ['CEDRIC', 'UI', 'ngResource', 'ngSanitize', 'payza.donutChart', 'payza.questionnaireCheckout', 'accountOverview', 'ui.bootstrap']).
    config(['$httpProvider', function ($httpProvider) {
        // adjust request headers (XSRF)
        var XSRF_token = angular.element('input[name="__RequestVerificationToken"]').val() || '';

        $httpProvider.defaults.headers.common.__RequestVerificationToken = XSRF_token;

        // AngularJS removed this header; it is needed so that the backend can differentiate
        // between regular and AJAX requests
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        // disable caching
        $httpProvider.defaults.cache = false;
    }]);
