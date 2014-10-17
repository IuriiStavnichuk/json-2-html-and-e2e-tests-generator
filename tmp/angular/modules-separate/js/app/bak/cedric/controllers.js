angular.module('cedric.controllers', []).
    controller('CedricSearch', ['$scope', '$http', 'CedricSearchValue', function ($scope, $http, CedricSearchValue) {
        $scope.searchParameter = CedricSearchValue;
        $scope.currentPage = 0;
        $scope.pageSize = 10;

        $scope.ddlCaseReasons = [];
        $scope.ddlCountries = [];
        $scope.ddlAllStatus = [];
        $scope.ddlAccountTypes = [];

        $scope.cedricCases = [];

        //Case Reason DDL
        $http({
            method: 'GET',
            url: 'JSON/AuthorizationCases/GetAllCaseReason'
        }).
            success(function (data) {
                $scope.ddlCaseReasons = data;
            });

        //Country DDL
        $http({
            method: 'GET',
            url: 'JSON/AuthorizationCases/GetSpecificCountry'
        }).
            success(function (data) {
                $scope.ddlCountries = data;
            });

        //Status DDL
        $http({
            method: 'GET',
            url: 'JSON/AuthorizationCases/GetCaseStatus'
        }).
            success(function (data) {
                $scope.ddlAllStatus = data;
            });

        //Account Type DDL
        $http({
            method: 'GET',
            url: 'JSON/AuthorizationCases/GetAllAccountType'
        }).
            success(function (data) {
                $scope.ddlAccountTypes = data;
            });


        $scope.updateSearch = function (searchParameter, currentPage) {
            $http({
                method: 'POST',
                url: 'JSON/AuthorizationCases/GetSearch',
                data: searchParameter
            }).
                success(function (data) {
                    $scope.currentPage = currentPage || 0;
                    $scope.cedricCases = data;

                    if (typeof data[0] !== 'undefined') {
                        $scope.showResults = "true";
                    }
                    else {
                        $scope.showResults = "false";
                    }
                }).
                error(function (status) {
                    $scope.showResults = "error";
                });
        };
        $scope.reset = function () {
            $scope.searchParameter = {};
        };

        $scope.numberOfPages = function () {
            return Math.ceil($scope.cedricCases.length / $scope.pageSize);
        };
    }]).
    controller('CedricDetails', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
        $scope.cedricCaseDetails = [{}];
        $scope.isBusiness = false;
        $scope.isOwner = false;
        $scope.isIndian = false;
        $scope.hasCaseDocuments = false;
        $scope.needsUpdate = false;
        $scope.currentCaseId = -1;
        $scope.ddlDocumentReasons = [];


        $scope.updateDetailsView = function () {
            //Case Details
            $http({
                method: 'GET',
                url: 'JSON/AuthorizationCases/getCaseDetail/' + $routeParams.referenceNumber
            }).
                success(function (data) {
                    $scope.cedricCaseDetails = data;

                    if (data !== null) {
                        var accountTypeCheck;
                        var indianCheck;

                        $scope.showResults = true;
                        if ($scope.cedricCaseDetails.isCaseAssignToMe === true) {
                            $scope.isOwner = $scope.cedricCaseDetails.caseStatus;
                        }
                        $scope.currentCaseId = $scope.cedricCaseDetails.caseNumber;

                        indianCheck = $scope.cedricCaseDetails.caseReason;
                        accountTypeCheck = $scope.cedricCaseDetails.accountType;

                        $scope.updateCaseView();
                        $scope.updateCaseHistory();

                        if (accountTypeCheck.indexOf('Business') > -1) {
                            $scope.isBusiness = true;
                        }

                        if (indianCheck.indexOf('(IN)') > -1) {
                            $scope.isIndian = true;
                        }

                    }
                    else {
                        $scope.showResults = "false";
                    }
                }).
                error(function () {
                    $scope.showResults = "error";
                    $('loading').hide();
                });
        };

        //You're on The Case
        $scope.takeThisCase = function () {
            $http({
                method: 'POST',
                url: 'JSON/AuthorizationCases/AssignCase',
                data: { "caseId": $scope.currentCaseId }
            }).
                success(function (status) {
                    if (status == 400) {
                        $scope.isOwner = false;
                        $('.caseTakenError').show();
                    }
                    $scope.updateDetailsView();
                    $scope.updateCaseHistory();
                }).
                error(function () {
                });
        };

        //CaseHistory
        $scope.updateCaseHistory = function () {
            $scope.hasCaseHistory = true;
            $http({
                method: 'GET',
                url: 'JSON/AuthorizationCases/GetCaseLogs/' + $scope.currentCaseId
            }).
                success(function (data) {
                    $scope.cedricCaseHistories = data;
                    if (data === '') {
                        $scope.hasCaseHistory = false;
                    }
                });
        };

        //Case Documents
        $scope.updateCaseView = function () {
            $http({
                method: 'GET',
                url: 'JSON/AuthorizationCases/GetCaseDocuments/' + $scope.currentCaseId
            }).
                success(function (data) {
                    $scope.cedricDocuments = data;
                }).
                error(function () {

                });
        };

        //If Document is declined, show conditionally a set of list of Reasons based on the documentCategoryId.
        //This is an Array so that it indexes when there are more than one Case Document attached to a case.
        $scope.caseDeclineByDocumentCategory = function (documentCategoryId, index) {
            $http({
                method: 'GET',
                url: 'JSON/AuthorizationCases/GetAllDocumentResponseByDocumentCategoryId/' + documentCategoryId
            }).
                success(function (data) {
                    $scope.ddlDocumentReasons[index] = data;
                });
        };


        //Mapping for Document Type
        $http({
            method: 'GET',
            url: 'JSON/AuthorizationCases/GetAllDocumentType'
        }).
            success(function (data) {
                $scope.mapDocumentTypes = data;
            });

        //Dropdown for Document Status
        $http({
            method: 'GET',
            url: 'JSON/AuthorizationCases/GetAllStatus'
        }).
            success(function (data) {
                $scope.ddlDocumentStatuses = data;
            });

        //Dropdown for Reason if declined
        //$http({
        //  method: 'GET',
        //  url: 'JSON/AuthorizationCases/GetAllDocumentResponseByDocumentCategoryId',
        //}).
        //success(function (data) {
        //  $scope.ddlDocumentReasons = data;
        //});

        //Case Documents state change
        $scope.change = function () {
            $scope.needsUpdate = true;
            $('.expirationDate').hide();
            $('.generalError').hide();
        };




        //Update Documents
        $scope.applyChanges = function (cedricDocuments) {
            $http({
                method: 'POST',
                url: 'JSON/AuthorizationCases/UpdateDocuments',
                data: cedricDocuments
            }).
                success(function (status) {
                    $scope.updateDetailsView();
                    $scope.updateCaseHistory();
                    $scope.needsUpdate = false;

                    if (status == 400) {
                        for (var i = 0; i < cedricDocuments.length; i++) {
                            var isdate = cedricDocuments[i].expirationDate;
                            if (isdate === null) {
                                $('.expirationDate').show();
                            } else {
                                $('.generalError').show();
                            }
                        }
                    }
                    if (status == 202) {
                        $('.applyChangeSuccess').show();
                    }
                }).
                error(function () {
                    $('.generalError').show();
                });
        };

        $scope.updateDetailsView();
    }]).
    controller('XSSCall', ['$scope', '$http', function ($scope, $http) {
        $http({
            method: 'GET',
            url: 'JSON/AuthorizationCases/XSS/'
        }).
            success(function (data) {
                $scope.xss = data;
            });
    }])
;