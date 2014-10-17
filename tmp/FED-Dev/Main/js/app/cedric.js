
// Initialization and configuration
angular.module('CEDRIC', []);


// Controllers

angular.module('CEDRIC').controller('CedricCasesCtrl', ['$scope', '$http', '$element', function ($scope, $http, $element) {         //By Cases
    $scope.cases = {};
    $scope.casesRequired = [];
    $scope.casesUnderReview = [];
    $scope.casesApproved = [];
    $scope.showDocumentArea = false;
    $scope.showSubmitButton = false;
    

    $scope.hasToSubmitDocuments = false;  //Check to see if we should show the Submit Documents Area
    $scope.hasDocuments = false;          //Check to see if we should show the Previously Documents Area
    $scope.retrievedCategories = 0;

    $scope.caseRequiredEmpty    = false;
    $scope.caseUnderReviewEmpty = false;
    $scope.caseApprovedEmpty = false;
    
    $scope.showSuccessMessage = false;

    // focus shift helper
    $scope.$watch('retrievedCategories', function (newValue) {
        if (newValue == 2) { // required and under_review cases were returned
            // if the user just submitted a document, check to see if the case moved to the 'In Review' tab;
            // if it did, switch the focus to it
            if (sessionStorage.hasOwnProperty('lastSubmittedCaseId')) {
                for (var i = 0; i < $scope.casesUnderReview.length; i++) {
                    if ($scope.casesUnderReview[i].caseId === parseInt(sessionStorage.getItem('lastSubmittedCaseId'), 10)) {
                        // expand the case details
                        $scope.documentAction($scope.casesUnderReview[i]);
                        $scope.casesUnderReview[i].showDocumentArea = true;

                        // put the case at the top of the list (if it's not already there)
                        if (i !== 0) {
                            $scope.casesUnderReview.unshift($scope.casesUnderReview.splice(i, 1)[0]);
                        }

                        // remove the session storage info now, we don't need it any longer
                        sessionStorage.removeItem('lastSubmittedCaseId');

                        // TODO_UI: somehow remove the jQuery dependency (class selectors are not supported by Angular as of now -- 1.0.7)
                        // switch to the 'In Review' tab
                        angular.element('.tabs .tab-labels .tab-label').eq(1).click();

                        // show success message
                        $scope.showSuccessMessage = true;
                    }
                }
            }
        }
    });

    //Getting the Case Counts
    $http.get(baseUrl + 'JSON/AuthorizationMemberCase/GetCaseCount').
        success(function (data) {
          $scope.cases = data;
          $scope.emptyCheck(data);
        });

    $scope.emptyCheck = function (cases) {
        if (cases[0].count == 0) {
            $scope.caseRequiredEmpty = true;
        } else {
            $scope.caseRequiredEmpty = false;
        }

        if (cases[1].count == 0) {
            $scope.caseUnderReviewEmpty = true;
        } else {
            $scope.caseUnderReviewEmpty = false;
        }

        if (cases[2].count == 0) {
            $scope.caseApprovedEmpty = true;
        } else {
            $scope.caseApprovedEmpty = false;
        }
    }

    //Getting the various case by status
    //Required
    $http.get(baseUrl + 'JSON/AuthorizationMemberCase/GetCasesByStatusId/7').
        success(function (data) {
            $scope.casesRequired = data;

            // Declined
            $http.get(baseUrl + 'JSON/AuthorizationMemberCase/GetCasesByStatusId/4').
                success(function (data) {
                    $scope.casesRequired = $scope.casesRequired.concat(data);
                    $scope.retrievedCategories++;

                    // go through the required cases and display the document area for the last submitted one;
                    // this happens in case there are more documents to be submitted, in order to keep the focus on the
                    // last case that the user interacted with
                    for (var i = 0; i < $scope.casesRequired.length; i++) {
                        if (sessionStorage.hasOwnProperty('lastSubmittedCaseId') &&
                                $scope.casesRequired[i].caseId === parseInt(sessionStorage.getItem('lastSubmittedCaseId'), 10)) {
                            $scope.documentAction($scope.casesRequired[i]);
                            $scope.casesRequired[i].showDocumentArea = true;

                            // remove the session storage info now, we don't need it any longer
                            sessionStorage.removeItem('lastSubmittedCaseId');
                        }
                    }
                });
        });

    //Under Review (Submitted)
    $http.get(baseUrl + 'JSON/AuthorizationMemberCase/GetCasesByStatusId/1').
        success(function (data) {
            $scope.casesUnderReview = data;

            //Under Review
            $http.get(baseUrl + 'JSON/AuthorizationMemberCase/GetCasesByStatusId/2').
                success(function (data) {
                    $scope.casesUnderReview = $scope.casesUnderReview.concat(data);
                    $scope.retrievedCategories++;
                });
        });

    //Approved
    $http.get(baseUrl + 'JSON/AuthorizationMemberCase/GetCasesByStatusId/3').
        success(function (data) {
            $scope.casesApproved = data;
        });

    //Case Description Text builder
    $scope.caseDescription = function (caseData) {
        var caseDescriptionText = "";
        var caseDocumentLength = caseData.cedricCategoryParent.length;
        var parentCategories = [];

        if (caseDocumentLength > 0) {
            // collect parent categories and retrieve child categories
            for (var i = 0; i < caseDocumentLength; i++) {
                parentCategories.push('<b>' + caseData.cedricCategoryParent[i].cedricCategoryParentName + '</b>');
            }

            caseDescriptionText += parentCategories.join(', ');
        }

        return caseDescriptionText;
    };


    //Documents Show
    $scope.documentAction = function (caseData) {
        var i, j, temp;

        // collapse all others
        for (i = 0; i < $scope.casesRequired.length; i++) {
            $scope.casesRequired[i].showDocumentArea = false;
        }
        for (i = 0; i < $scope.casesUnderReview.length; i++) {
            $scope.casesUnderReview[i].showDocumentArea = false;
        }
        for (i = 0; i < $scope.casesApproved.length; i++) {
            $scope.casesApproved[i].showDocumentArea = false;
        }

        // hide any upload areas that might be visible
        for (i = 0; i < $scope.casesRequired.length; i += 1) {
            for (j = 0; j < $scope.casesRequired[i].cedricCategoryParent.length; j += 1) {
                if ($scope.casesRequired[i].cedricCategoryParent[j].uploadAreaVisible) {
                    $scope.hideUploadArea($scope.casesRequired[i].cedricCategoryParent[j]);
                }
            }
        }

        caseData.showDocumentArea = !caseData.showDocumentArea; //Show the area toggle
        caseData.caseDocuments = {};


        for (i = 0; i < caseData.cedricCategoryParent.length; i++) {
            $http.post(baseUrl + 'JSON/AuthorizationMemberCase/GetCedricCategoryChildByCase', {
                caseId: caseData.caseId,
                cedricCategoryParentId: caseData.cedricCategoryParent[i].cedricCategoryParentId
            }).
            success(function (data, status, headers, config) {
                for (i = 0; i < caseData.cedricCategoryParent.length; i++) {
                    if (caseData.cedricCategoryParent[i].cedricCategoryParentId === config.data.cedricCategoryParentId) {
                        // remove 'Released' documents from the data
                        for (j = 0; j < data.length; j += 1) {
                            if (data[j].StatusID == 8) {
                                data.splice(j, 1);
                                j -= 1;
                            }
                        }

                        caseData.cedricCategoryParent[i].cedricCategoryChild = data;
                        
                        if (data.length === 1) {
                            caseData.cedricCategoryParent[i].selectedDocType = data[0].cedricCategoryChildName;
                        } else {
                            temp = new Array();
                            for (j = 0; j < data.length; j += 1) {
                                temp.push(data[j].cedricCategoryChildName);
                            }
                            caseData.cedricCategoryParent[i].docTypeOptions = temp.join("<br />");
                        }

                        break;
                    }
                }
            });
        }

        //Added a check to see if the area to submit a document should be shown, for the case when the iterator of the document listing becomes modular.
        if (caseData.statusId === 7 || caseData.statusId === 4) {
            caseData.hasToSubmitDocuments = true;
        }

        $http.get(baseUrl + 'JSON/AuthorizationMemberCase/GetDocumentsByCaseId/' + caseData.caseId).
            success(function (data) {
                if (data.length > 0) {
                    caseData.hasDocuments = true;
                    caseData.caseDocuments = data.reverse();    // show most recent first
                    for (i = 0; i < caseData.caseDocuments.length; i++) {
                        if (caseData.caseDocuments[i].statusName === 'Declined') {
                            for (j = 0; j < caseData.cedricCategoryParent.length; j += 1) {
                                if (caseData.cedricCategoryParent[j].cedricCategoryParentId == caseData.caseDocuments[i].DocumentCategoryId) {
                                    caseData.cedricCategoryParent[j].declinedDocumentId = caseData.caseDocuments[i].documentId;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
            });
    };

    $scope.updateHiddenFields = function (docCategory, index, caseData) {
        var $inputs = $('#hfDocumentProperties');
        $inputs.find('.hfDocumentFormTypeId input').val(docCategory.cedricCategoryChild[index].authorizationFormTypeId);
        $inputs.find('.hfCedricCategoryId input').val(docCategory.cedricCategoryChild[index].cedricCategoryChildId);
        $inputs.find('.hfDocumentTypeId input').val(docCategory.cedricCategoryChild[index].authorizationDocumentTypeId);
        $inputs.find('.hfCaseId input').val(caseData.caseId);
        $inputs.find('.hfRequestedDocCount input').val(caseData.requestedDocCount);
        $inputs.find('.hfDeclinedDocumentId input').val(docCategory.declinedDocumentId);
    };

    $scope.showUploadArea = function (docCategory, caseData) {
        // hide all other upload areas first
        var i, j;
        for (i = 0; i < $scope.casesRequired.length; i += 1) {
            for (j = 0; j < $scope.casesRequired[i].cedricCategoryParent.length; j += 1) {
                if ($scope.casesRequired[i].cedricCategoryParent[j].uploadAreaVisible) {
                    $scope.hideUploadArea($scope.casesRequired[i].cedricCategoryParent[j]);
                }
            }
        }

        // update hidden fields
        if (docCategory.cedricCategoryChild.length == 1) {
            $scope.updateHiddenFields(docCategory, 0, caseData);
        }

        docCategory.uploadAreaVisible = true;
    };

    $scope.hideUploadArea = function (docCategory) {
        docCategory.uploadAreaVisible = false;
        $scope.showSubmitButton = false;

        $scope.$broadcast('clearDropzone');

        // cleanup
        if (docCategory.cedricCategoryChild && docCategory.cedricCategoryChild.length > 1) {
            delete docCategory.selectedDocType;
        }
    };

    $scope.$on('fileSelected', function () {
        $scope.$apply(function () {
            $scope.showSubmitButton = true;
        });
    });

    $scope.$on('fileRemoved', function () {
        $scope.$apply(function () {
            $scope.showSubmitButton = false;
        });
    });

}]);
