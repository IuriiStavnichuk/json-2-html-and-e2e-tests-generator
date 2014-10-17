
// Initialization and configuration
angular.module('UI', []);


// Directives

// Tabs
angular.module('UI').directive('tabs', function () { // requires jQuery
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            var $tabLabels = element.find('.tab-label'),
                $tabContents = element.find('.tab-contents'),
                i;

            for (i = 0; i < $tabLabels.length; i = i + 1) {
                $tabLabels.eq(i).prop('tabIndex', i);
            }

            $tabLabels.bind('click', function () {
                var $this = angular.element(this);
                if (!$this.hasClass('active')) {
                    $tabLabels.removeClass('active');
                    $this.addClass('active');
                    $tabContents.removeClass('active');
                    $tabContents.eq($this.prop('tabIndex')).addClass('active');
                }
                return false;
            });
        }
    };
});

// Button group
angular.module('UI').directive('btnGroup', function () {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            var $buttons = element.find('.btn');

            $buttons.bind('click', function () {
                var $this = angular.element(this);
                if (!$this.hasClass('active')) {
                    $buttons.removeClass('active');
                    $this.addClass('active');
                }
                return false;
            });
        }
    };
});

// Tooltip
//angular.module('UI').directive('tooltip', ['$parse', function ($parse) {
//    return {
//        restrict: 'C',
//        link: function (scope, element, attrs) {
//            var buffer;
//            element.bind('mouseover', function () {
//                var position = $(this).offset(), top = position.top + 20, left = position.left + 20;
//                buffer = buffer || '' + attrs.title;

//                /* 1. Create the tooltip box and insert into the body tag.
//                2. Insert the text in the box. 
//                3. Position the box in the document 
//                4. Remove the value of the title attribute to keep it from showing. */

//                $('body').append('<div class="tip-box"></div>');
//                $('.tip-box').html(buffer).css({ 'top': top, 'left': left });
//                element.attr('title', '');
//            })
//                .bind('mouseout', function () {
//                /* 1. Remove the tip-box in the body. 
//                2. Put back the value of the title attribute so that it can be retrieved again in the next mouse over. */
//                $('.tip-box').remove();
//                element.attr('title', buffer);
//                })
//                .bind('mousemove', function (event) {
//                var top = event.pageX + 20, left = event.pageY + 20;
//                $('.tip-box').css({ 'top': left, 'left': top });
//            });
//        }
//    };
//}]);

// Drop zone
angular.module('UI').directive('imageSelect', ['$timeout', function ($timeout) { // requires jQuery
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            var dropZone = element.find('.drop-zone'),
                previewArea = element.find('.preview-area'),
                loading = element.find('.loading'),
                fileInfo = element.find('.file-info'),
                fileInfoDefaultMsg = fileInfo.find('.file-name').html(),
                fileSelector = element.find('.file-selector'),
                fileInputField = fileSelector.find('input[type="file"]');

            // helper function for rendering the preview and handling panning
            function preview(file) {
                // only do this for images
                if (file.type.match(/image.*/)) {
                    // show activity indicator
                    loading.show();

                    var reader = new FileReader();

                    // read the file from disk
                    reader.readAsDataURL(file);

                    reader.onload = function (e) {
                        // use this image element to get the aspect ratio of the image
                        var imageData = e.target.result,
                            image = $('<img src="' + imageData + '"/>').css('visibility', 'hidden'),
                            previewAreaReferenceOffset = {
                                left: dropZone.offset().left + (dropZone.outerWidth() - dropZone.innerWidth()) / 2,
                                top: dropZone.offset().top + (dropZone.outerHeight() - dropZone.innerHeight()) / 2
                            };

                        // add the image to the preview area so we can read its width/height
                        previewArea.append(image).width(dropZone.width()).height(dropZone.height());

                        image.bind('load', function (e) {
                            var dropZoneAspectRatio = dropZone.innerWidth() / dropZone.innerHeight(),
                                imageAspectRatio = image.width() / image.height(),
                                previewSize = {};

                            // size the preview according to the preview area's aspect ratio
                            if (imageAspectRatio > dropZoneAspectRatio) {
                                previewSize.width = Math.round(dropZone.innerHeight() * imageAspectRatio);
                                previewSize.height = dropZone.innerHeight();
                            } else {
                                previewSize.width = dropZone.innerWidth();
                                previewSize.height = Math.round(dropZone.innerWidth() / imageAspectRatio);
                            }

                            // render the image data in the preview area and remove the helper image
                            previewArea.offset(previewAreaReferenceOffset).css({
                                'background-image': 'url(' + imageData + ')',
                                'background-size': previewSize.width + 'px ' + previewSize.height + 'px',
                                'background-position': '0 0',
                                'background-repeat': 'no-repeat',
                                'width': previewSize.width + 'px',
                                'height' : previewSize.height + 'px',
                                'opacity': '1'
                            }).empty();

                            // reposition the preview image on drag
                            if (previewSize.width > dropZone.innerWidth() || previewSize.height > dropZone.innerHeight()) {
                                // show the 'move' cursor 
                                previewArea.css('cursor', 'move');

                                previewArea.bind('mousedown', function (e) {
                                    var origin = {  // where we click
                                        X: e.clientX,
                                        Y: e.clientY
                                    },
                                    currentOffset = previewArea.offset();

                                    previewArea.bind('mousemove', function (e) {
                                        var newOffset = {   // compute how far we traveled and add to the current background position
                                            left: currentOffset.left + (e.clientX - origin.X),
                                            top: currentOffset.top + (e.clientY - origin.Y)
                                        };
                                        
                                        // adjustments
                                        if (newOffset.top > previewAreaReferenceOffset.top) { newOffset.top = previewAreaReferenceOffset.top; }
                                        if (newOffset.left > previewAreaReferenceOffset.left) { newOffset.left = previewAreaReferenceOffset.left; }
                                        if (previewAreaReferenceOffset.top - newOffset.top + dropZone.innerHeight() > previewArea.height()) {
                                            newOffset.top = previewAreaReferenceOffset.top - (previewArea.height() - dropZone.innerHeight());
                                        }
                                        if (previewAreaReferenceOffset.left - newOffset.left + dropZone.innerWidth() > previewArea.width()) {
                                            newOffset.left = previewAreaReferenceOffset.left - (previewArea.width() - dropZone.innerWidth());
                                        }

                                        // redraw
                                        previewArea.offset(newOffset);
                                    });

                                    previewArea.bind('mouseup', function (e) {
                                        // make sure there's only one 'mousemove' handler registered at all times
                                        previewArea.unbind('mousemove');
                                    });

                                    e.preventDefault(); // this prevents the cursor from transforming into a 'select' cursor
                                });
                            }

                            // hide the activity indicator
                            loading.fadeOut();
                        });
                    };
                }
            }
            
            // helper function for updating displayed file information
            function updateFileInfo(fileName) {
                var adjustedFileName = fileName;

                if (fileName.length > 50) {
                    adjustedFileName = fileName.substr(0, 15) + '...' + fileName.substr(fileName.length - 15);
                }

                fileInfo.find('.file-name').html(adjustedFileName);
                fileInfo.attr('title', fileName);

                fileInputField.attr('title', fileName);

                fileInfo.find('.clear').show();
            }

            // helper function for clearing the displayed file information
            function clearFileInfo() {
                fileInfo.find('.file-name').html(fileInfoDefaultMsg);
                fileInfo.attr('title', '');

                fileInputField.attr('title', fileInfoDefaultMsg);

                fileInfo.find('.clear').hide();
            }

            // helper function for binding to the file input field
            function initFileInputField() {
                fileInputField.bind('change', function (e) {    // process regular file selections
                    if (window.File && window.FileList && window.FileReader) {
                        var file = e.target.files[0];

                        if (typeof file === 'object') {     // this takes care of the case when the user hits 'Cancel' on the file dialog
                            if (file.type.match(/image.*/)) {
                                dropZone.show();
                                preview(file);
                            } else {
                                dropZone.hide();
                            }

                            // display the file name
                            updateFileInfo(file.name);
                        }
                    } else {
                        var fileName = this.value.replace(/[\\\/]/g, '_').split('_').reverse()[0];
                        updateFileInfo(fileName);
                    }
                    scope.$emit('fileSelected');
                });
            }

            // take care of the file selector
            // this basically keeps the file input field under the mouse cursor
            fileSelector.bind('mousemove', function (e) {
                var self = angular.element(this),
                    offsetLeft = self.offset().left,
                    offsetTop = self.offset().top;

                fileInputField.css({
                    left: e.pageX - offsetLeft - 175,
                    top: e.pageY - offsetTop - 15
                });
            });

            // initialize the input field
            initFileInputField();

            //don't do this for now, we need 2 back-end API calls for this to work across all browsers
            /*
            // check if the browser supports the File API
            if (window.File && window.FileList && window.FileReader) {              
                // 'activate' the drop zone on dragging files over the preview area
                previewArea.bind('dragover', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropZone.addClass('hover');
                });
                // 'deactivate' the drop zone on dragging the file out (without dropping it)
                previewArea.bind('dragleave', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropZone.removeClass('hover');
                });
                
                // process file drag and drops
                previewArea.bind('drop', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropZone.removeClass('hover');

                    if (e.originalEvent.dataTransfer.files.length > 0) {
                        var file = e.originalEvent.dataTransfer.files[0];

                        preview(file);

                        // display the file name
                        updateFileInfo(file.name);
                    }
                });
            }
            */

            function clearDropzone() {
                previewArea.css({
                    'background-image': 'none',
                    'opacity': '0',
                    'cursor': 'default'
                }).unbind('mousedown', 'mousemove', 'mouseup');
                dropZone.hide();
                clearFileInfo();
                // carry the id and name attributes over to the new input field
                var fieldID = fileInputField.attr('id');
                var fieldName = fileInputField.attr('name');
                fileInputField.remove();
                fileInputField = angular.element('<input type="file" accept="image/*" id="' + fieldID + '" name="' + fieldName + '" />');
                fileSelector.prepend(fileInputField);
                initFileInputField();
                scope.$emit('fileRemoved');
            }

            // clean up
            fileInfo.find('.clear a').bind('click', function (e) {
                e.preventDefault();
                clearDropzone();
            });

            scope.$on('clearDropzone', function () {
                if (dropZone.is(":visible")) {
                    $timeout(clearDropzone);
                }
            });
        }
    };
}]);
// Placeholder

//angular.module('UI', []).directive('placeholder', ['$interpolate', '$timeout', function ($interpolate, $timeout) {
//            if ($.placeholder.browser_supported()) {
//                return {};
//            }

//            return function (scope, element) {
//                var config = {
//                    color: '#888',
//                    cls: 'placeholder'
//                };

//                var interpolatedPlaceholder = $interpolate(element.attr('placeholder'));
//                var placeholderText = null;

//                var overlay = null;
//                var pendingTimer = null;

//                function addPlaceholder() {
//                    pendingTimer = $timeout(function () {
//                        element._placeholder_shim(config);
//                        overlay = element.data('placeholder');
//                        pendingTimer = null;
//                    });
//                }

//                if (element.is(':visible')) {
//                    addPlaceholder();
//                }

//                // The following code accounts for value changes from within the code
//                // and for dynamic changes in placeholder text
//                scope.$watch(function () {
//                    if (!overlay && element.is(':visible') && !pendingTimer) {
//                        addPlaceholder();
//                    }
//                    if (overlay && (element.get(0) !== document.activeElement)) {
//                        if (element.val().length) {
//                            overlay.hide();
//                        } else {
//                            overlay.show();
//                        }
//                    }
//                    if (overlay) {
//                        var newText = interpolatedPlaceholder(scope);
//                        if (newText !== placeholderText) {
//                            placeholderText = newText;
//                            overlay.text(placeholderText);
//                        }
//                    }
//                });

//                scope.$on('$destroy', function () {
//                    if (pendingTimer) {
//                        $timeout.cancel(pendingTimer);
//                        pendingTimer = null;
//                    }
//                });
//            };
//        }]);



//angular.module('UI').directive('placeholder', function() {
//    // No native support for attribute placeholder
//    return {
//        restrict: 'A',
//        require: 'ngModel',
//        //link: function (scope, element, attr, ctrl) {

//        //    l("test");

//        //    var value;

//        //    var placehold = function () {
//        //        element.val(attr.placehold)
//        //    };
//        //    var unplacehold = function () {
//        //        element.val('');
//        //    };

//        //    scope.$watch(attr.ngModel, function (val) {
//        //        value = val || '';
//        //    });

//        //    element.bind('focus', function () {
//        //        if(value == '') unplacehold();
//        //    });

//        //    element.bind('blur', function () {
//        //        if (element.val() == '') placehold();
//        //    });

//        //    ctrl.$formatters.unshift(function (val) {
//        //        if (!val) {
//        //            placehold();
//        //            value = '';
//        //            return attr.placehold;
//        //        }
//        //        return val;
//        //    });
//        //}


//        link: function (scope, elem, attrs, ngModel) {

//            var orig_type = attrs.type;

//            // l("resource2", resource.membersAreaUrl.placeholder)
//            // load initial value from element
//            if (!elem.val()) {
//                elem.addClass('empty');
//                elem.val(attrs.placeholder);
//                //if (orig_type === 'password') {
//                //    elem.attr('type', 'text');
//                //}
//                ngModel.$setViewValue('');
//            } else {
//                ngModel.$setViewValue(elem.val());
//            }

//            // on focus, replace auto-label with empty field
//            elem.bind('focus', function() {
//                if (elem.hasClass('empty')) {
//                    elem.val('');
//                    elem.removeClass('empty error');
//                   // elem.attr('type', orig_type); //throw error type property can't be changed
//                }
//            });

//            // view -> model
//            elem.bind('blur', function() {
//                var orig_val = elem.val();
//                setValue(orig_val);
//                scope.$apply(function() {
//                    ngModel.$setViewValue(orig_val);
//                });
//            });

//            // model -> view
//            ngModel.$render = function() {
//                setValue(ngModel.$viewValue);
//            };

//            function setValue(val) {
//                if (!val) {
//                    elem.addClass('empty');
//                    elem.val(attrs.placeholder);
//                    if (orig_type === 'password') {
//                        elem.attr('type', 'text');
//                    }
//                } else {
//                    elem.removeClass('empty');
//                    elem.val(val);
//                }
//            }

//        }
  //  };
//});



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

angular.module('accountActivities', [])
	.factory('activityList', ['$http', function ($http) {
	    var dataMethod = 'GET',
          dataURL = baseUrl + 'newsfeed.aspx',
          dataType = 'application/json; charset=utf-8',
	        dataItems = {};
	    dataItems.getActivityData = function (pageIndex, selectedCategory) {

	       return $http({
	           method: dataMethod,
	           url: dataURL + '?page=' + pageIndex + '&category=' + selectedCategory + '&v=' + Math.random(),
	           contentType: dataType
	       });
	    };


	    return dataItems;
	}])
	.directive('activities', function () {
	    return {
	        scope: {items: '@', load: '@'},
	        restrict: 'E',
	        controller: ['$scope', '$element', '$window', '$timeout', '$document', '$attrs', 'activityList',
                        function ($scope, $element, $window, $timeout, $document, $attrs, activityList) {
	            var limitNumber = $scope.$eval($attrs.items), 
					itemsToInclude = $scope.$eval($attrs.load);
                            //console.log($scope.$id);                      

	            $scope.$parent.activities = [];
	            $scope.$parent.categories = [];
	            $scope.$parent.selectedCategory = 'All';
	            $scope.$parent.pageIndex = 0;

	            activityList.getActivityData($scope.$parent.pageIndex, $scope.$parent.selectedCategory).success(function (data) {	               
	                $scope.$parent.activities = data.items;
	                $scope.$parent.categories = data.categories;
	            });
	           
	            $scope.$parent.limit = limitNumber;

	            $scope.$parent.showResults = function (category, event) {
	                event.preventDefault();
	                $scope.$parent.selectedCategory = category;
	                $scope.$parent.pageIndex = 0;

	                activityList.getActivityData($scope.$parent.pageIndex, $scope.$parent.selectedCategory).success(function (data) {
	                    $scope.$parent.activities = data.items;

	                    if (!angular.element(event.currentTarget).hasClass('selected')) {
	                        angular.element(event.currentTarget).parent().parent().find('a').removeClass('selected');
	                        angular.element(event.currentTarget).addClass('selected');
	                        $scope.$parent.limit = limitNumber;
	                    }

	                });
	            };

	            $scope.$parent.fillInDescription = function (text, status, type, description, amount, typeValue) {
	                var txt = text;
	                return txt.replace(/\{0}/g, status).replace(/\{1}/g, type).replace(/\{2}/g, description).replace(/\{3}/g, amount).replace(/\{4}/g, typeValue);
	            };

	            // FED NOTE: Use either infinite scrolling or click to load more items.
	            // The main UX issue found with infinite scrolling is when the user has 1000s of transactions.
	            // Since the infinite scroll gets triggered when the user scrolls and hits the bottom of the page, 
	            // accessing the links at the bottom may mean loading ALL transactions and waiting until they are all loaded.
	            // Infinite scrolling may be cumbersome to some users trying to access the bottom links in case they have 1000s of transactions to load.
	            // The proposed alternative is loading the transactions by clicking on the link "Load more items ..." at the bottom of the page 
	            // should users want to see more of their previous activities.
                // The function for the "Load more items ..." click function is provided below.

	            // Infinite Scroll Start
	            angular.element($window).scroll(function () {
	                var windowHeight = angular.element($document)[0].body.scrollHeight - angular.element($window)[0].innerHeight,
	                    verticalScroll = angular.element($window)[0].pageYOffset;

                    // Loads the items when the bottom of the page is reached
	                if (verticalScroll >= windowHeight) {
	                    var filterEl = $element[0].children[0].children,
                            allCategoryTrigger = angular.element(filterEl[0]).find('a'),
	                        allCategory = allCategoryTrigger[0].text;
	                    $scope.$parent.pageIndex++;

	                    angular.forEach(filterEl, function (val) {
	                        var filterTrigger = angular.element(val).find('a');

	                        // Find which category is active
	                        if (filterTrigger.hasClass('selected')) {
	                            var activeCategory = filterTrigger[0].text;

	                            $scope.$parent.status = 'loading';
	                            // Load the items of the selected category
	                            activityList.getActivityData($scope.$parent.pageIndex, $scope.$parent.selectedCategory).success(function (data) {
	                                $scope.$parent.activities = $scope.$parent.activities.concat(data.items);

	                                var allListings = $scope.$parent.activities,
                                      newList = [];

	                                for (var i = 0; i < allListings.length; i++) {
	                                    if ( activeCategory === allListings[i].category ) {
	                                        var listing = allListings[i];
	                                        newList.push(listing);
	                                    }else if( activeCategory === allCategory ){
	                                        newList = allListings;
	                                    }
	                                }

	                                $scope.$parent.activities = newList;
	                                $scope.$parent.limit = $scope.$parent.limit + itemsToInclude;
                                    // make sure the 'load-more' indicator shows... why 500ms? I dunno... it seems sensible enough.
	                                $timeout(function () { $scope.$parent.status = 'loaded'; }, 500);
	                            });
	                        }
	                    });
	                }
	            });

	            angular.element($window).resize(function () {
	                var windowHeight = angular.element($document)[0].body.scrollHeight - angular.element($window)[0].innerHeight,
	                    verticalScroll = angular.element($window)[0].pageYOffset;
	            });
	            // Infinite Scroll End 


                // Load more click function
	            $scope.$parent.loadMore = function (event) {
	                event.preventDefault();
	                $scope.$parent.limit = $scope.$parent.limit + itemsToInclude;
	            };
	        }]
	    };
	});
angular.module('accountOverview', ['accountActivities']);
angular.module('payza.donutChart',[])
    .directive("donutChart", ['$http', '$resource', function ($http, $resource) {
        return {
            restrict: "E",
            replace:true,
            scope:{
                pathToJson:'='
            },
            link: function ($scope) {

                $resource($scope.pathToJson).get(function (data) {

                    function formatNumberWithTwoDecimalPlacesAlways(numberToFormat) {
                        return numberToFormat.toFixed(2);
                    }

                    function formatNumberWithTwoDecimalPlacesIfHasDecimals(numberToFormat) {
                        if (numberToFormat % 1 != 0) { // if number has decimals 
                            return formatNumberWithTwoDecimalPlacesAlways(numberToFormat);
                        }
                        else { // if number has no decimals 
                            return numberToFormat;
                        }
                    }

                    for (var i in data.Results) {
                        data.Results[i].CurrencyAbbreviation = data.Results[i].CurrencyAbbreviation  || '';
                        data.Results[i].CurrencySymbol = data.Results[i].CurrencySymbol  || '';
                        data.Results[i].TimeInterval = data.Results[i].TimeInterval  || '';
                        data.Results[i].Unit = data.Results[i].Unit  || '';

                        $scope.title = data.Results[i].Title;

                        var amountForDisplay;
                        var totalAmountForDisplay;
                        if (data.Results[i].CurrencySymbol !== '') { // if money 
                            amountForDisplay = formatNumberWithTwoDecimalPlacesAlways(data.Results[i].Amount);
                            totalAmountForDisplay = formatNumberWithTwoDecimalPlacesIfHasDecimals(data.Results[i].TotalAmount);
                        }
                        else { // if not money 
                            amountForDisplay = data.Results[i].Amount;
                            totalAmountForDisplay = data.Results[i].TotalAmount;
                        }

                        var amountText = data.Results[i].CurrencySymbol + amountForDisplay + ' ' + data.Results[i].Unit;

                        $scope.totalAmount = data.Results[i].CurrencySymbol + totalAmountForDisplay + ' ' + data.Results[i].CurrencyAbbreviation;
                        $scope.timeInterval=data.Results[i].TimeInterval;

                        var chartData=[
                            {'name': 'amount1','value': data.Results[i].Amount},
                            {'name': 'amount2','value': data.Results[i].TotalAmount-data.Results[i].Amount}
                        ];

                        function tweenPie(b) {
                            var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
                            return function (t) {
                                return arc(i(t));
                            };
                        }

                        var width = 220,
                            height = 84,
                            radius = Math.min(width, height) / 2;

                        var color = d3.scale.ordinal()
                            .range(["#f04d4d", "#e7eaf0"]);

                        var arc = d3.svg.arc()
                                .outerRadius(radius - 79)
                                .innerRadius(radius - 84)
                            ;

                        var pie = d3.layout.pie()
                            .sort(null)
                            .value(function(d) { return d.value; });
                        var svg = d3.select("donut-chart").append("svg")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("class", "donut-chart")
                            .append("g")
                            .attr("transform", "translate(" + radius + "," + height / 2 + ")");

                        svg.append("text")
                            .style("fill-opacity", 0)
                            .attr("dx", "0")
                            .attr("dy", "3")
                            .style("text-anchor", "middle")
                            .attr("class", "donut-chart-svg-text")
                            .text(amountText)
                            .transition()
                            .delay(1800)
                            .duration(1200)
                            .style("fill-opacity", 1 )
                        ;
                        svg.append("text")
                            .attr("dx", "52")
                            .attr("dy", "3")
                            .style("fill-opacity", 0 )
                            .attr("class", "donut-chart-title")
                            .text( $scope.title )
                            .transition()
                            .duration(1500)
                            .style("fill-opacity", 1 )
                        ;
                        var chartInfo=svg.append("text")
                                .attr("dx", "52")
                                .attr("dy", "21")
                            ;

                        chartInfo.append("tspan")
                            .attr("class", "donut-chart-total-amount")
                            .text( $scope.totalAmount )
                            .style("fill-opacity", 0 )
                            .transition()
                            .duration(1500)
                            .style("fill-opacity", 1 )
                        ;
                        chartInfo.append("tspan")
                            .attr("class", "donut-chart-unit")
                            .text( $scope.timeInterval + data.Results[i].Unit ) /* either "TimeInterval" or "Unit" is present; there should not be a case where both are present */
                            .style("fill-opacity", 0 )
                            .transition()
                            .duration(1500)
                            .style("fill-opacity", 1 )
                        ;

                        var g = svg.selectAll(".arc")
                            .data(pie(chartData))
                            .enter().append("g")
                            .attr("transform","rotate(180)")
                            .attr("class", "donut-chart-arc");

                        g.append("path")
                            .style("fill", function(d) { return color(d.data.name); })
                            .transition()
                            .duration(2000)
                            .delay(function(d, i) {return i * 50; })
                            .attrTween("d", tweenPie)
                        ;

                    }
                });
            }
        };
    }])

;
angular.module('payza.questionnaireCheckout', [])
.directive("questionnaireCheckout", ['$http',  function ($http) {
    return {
        restrict: "E",
        templateUrl: "../ng-partials/modules/QuestionnaireCheckout.html",
        replace: true,
        transclude: true,
        controller: ['$scope', function ($scope) {
            //link: ['$scope', function ($scope) {

            //testtt.$inject = ['$scope'];

            var objName;
            $scope.wasSubmitButtonClicked = false;
            $scope.objInit = function () {
                $scope.info = {};
                $scope.info.currentSection = 1;
                $scope.info.isValid = null;
                $scope.info.isValidSection1 = 0;
                $scope.info.isValidSection2 = 0;
                $scope.info.isValidSection3 = 0;
                $scope.info.isValidSection4 = 0;
                $scope.info.isValidSection5 = 0;
                $scope.info.isValidSectionDonations6 = 0;
                $scope.info.generalErrorMessages = null;
                $scope.info.idOfRecord = {};
                $scope.info.urlQuestionnaireTypeId = {};
                $scope.info.url = {};
                $scope.info.urlType = {};
                $scope.info.businessModel = {};
                $scope.info.revenueGenerationMethod = {};
                $scope.info.shippingCountryId = {};
                $scope.info.fraudPrevention = {};
                $scope.info.termsOfService = {};
                $scope.info.termsOfServiceLocation = {};
                $scope.info.refundPolicy = {};
                $scope.info.refundPolicyLocation = {};
                $scope.info.urlFieldMembersAreaTypeId = {};
                $scope.info.membersAreaDetails = {};
                $scope.info.averagePrice = {};
                $scope.info.previousUrlsId = {};

                $scope.info.urlFieldProductDeliveryMethodTypeIdList = {};
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.value = [];
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.online = {};
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost = {};
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail = {};
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson = {};

                $scope.info.urlFieldServiceProvisionMethodTypeIdList = {};
                $scope.info.urlFieldServiceProvisionMethodTypeIdList.value = [];
                $scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson = {};
                $scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely = {};

                $scope.info.productDeliveryDelayTime = {};
                $scope.info.serviceProvisionDelayTime = {};
                $scope.info.urlFieldProductSourceTypeId = {};
                $scope.info.urlFieldServiceSourceTypeId = {};
                $scope.info.serviceSourceThirdPartyInfo = {};
                $scope.info.urlFieldSupplierTypeId = {};
                $scope.info.urlFieldPromotionMethodTypeIdList = {};
                $scope.info.urlFieldCustomerContactMethodTypeIdList = {};

                $scope.info.urlFieldDonorContactTypeId = {};
                $scope.info.averageDonationAmount = {};
                $scope.info.urlFieldRecurringDonationTypeId = {};
                $scope.info.monthlyDonationAmount = {};
                $scope.info.urlFieldDiscountTypeId = {};

                $scope.info.urlFieldSaleOriginTypeIdList = {};
                $scope.info.urlFieldSaleOriginTypeIdList.value = [];
                $scope.info.urlFieldSaleOriginTypeIdList.northAmerica = {};
                $scope.info.urlFieldSaleOriginTypeIdList.southAmerica = {};
                $scope.info.urlFieldSaleOriginTypeIdList.westernEurope = {};
                $scope.info.urlFieldSaleOriginTypeIdList.africa = {};
                $scope.info.urlFieldSaleOriginTypeIdList.asia = {};
                $scope.info.urlFieldSaleOriginTypeIdList.middleEast = {};
                $scope.info.urlFieldSaleOriginTypeIdList.oceania = {};

                $scope.info.urlFieldDonationOriginTypeIdList = {};
                $scope.info.urlFieldDonationOriginTypeIdList.value = [];
                $scope.info.urlFieldDonationOriginTypeIdList.northAmerica = {};
                $scope.info.urlFieldDonationOriginTypeIdList.southAmerica = {};
                $scope.info.urlFieldDonationOriginTypeIdList.westernEurope = {};
                $scope.info.urlFieldDonationOriginTypeIdList.africa = {};
                $scope.info.urlFieldDonationOriginTypeIdList.asia = {};
                $scope.info.urlFieldDonationOriginTypeIdList.middleEast = {};
                $scope.info.urlFieldDonationOriginTypeIdList.oceania = {};


                $scope.info.urlFieldInvoiceTypeId = {};

                $scope.info.urlFieldInvoiceSendingTypeIdList = {};
                $scope.info.urlFieldInvoiceSendingTypeIdList.value = [];
                $scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice = {};
                $scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice = {};

                $scope.info.monthlySaleAmount = {};
                $scope.info.urlFieldRecurringBillingTypeId = {};

            };

            $scope.resourceInit = function () {
                if (typeof $scope.currentLanguage === 'undefined') { $scope.currentLanguage = '\"en-US\"'; }
                switch ($scope.currentLanguage) {
                    case '\"en-US\"':
                        // for Checkout
                        $http.get('../ng-resources/WebsiteAddEdit/questionnaireCheckout_resources_en.json')
                            .success(function (data) {
                                $scope.resource = data;
                                if ($scope.info.urlQuestionnaireTypeId.value === 3) {                           //for Charity
                                    $scope.resource.noBusinessModel.title = $scope.resource.noBusinessModelForCharity.title;
                                    $scope.resource.revenueGenerationMethod.title = $scope.resource.revenueGenerationMethodForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck1.title = $scope.resource.revenueGenerationMethodCheck1ForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck2.title = $scope.resource.revenueGenerationMethodCheck2ForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck3.title = $scope.resource.revenueGenerationMethodCheck3ForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck4.title = $scope.resource.revenueGenerationMethodCheck4ForCharity.title;
                                }
                            })
                            .error(function (data, response) {
                                if (typeof data !== "undefined") {
                                    $scope.generalErrorMessages(data, response);
                                }
                            });
                        break;
                    case '\"fr-CA\"':
                        $http.get('../ng-resources/WebsiteAddEdit/questionnaireCheckout_resources_fr.json')
                            .success(function (data) {
                                $scope.resource = data;
                                if ($scope.info.urlQuestionnaireTypeId.value === 3) {                           //for Charity
                                    $scope.resource.isSite.title = $scope.resource.isSiteForCharity.title;
                                    $scope.resource.noBusinessModel.title = $scope.resource.noBusinessModelForCharity.title;
                                    $scope.resource.revenueGenerationMethod.title = $scope.resource.revenueGenerationMethodForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck1.title = $scope.resource.revenueGenerationMethodCheck1ForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck2.title = $scope.resource.revenueGenerationMethodCheck2ForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck3.title = $scope.resource.revenueGenerationMethodCheck3ForCharity.title;
                                    $scope.resource.revenueGenerationMethodCheck4.title = $scope.resource.revenueGenerationMethodCheck4ForCharity.title;
                                }
                            })
                            .error(function (data, response) {
                                if (typeof data !== "undefined") {
                                    $scope.generalErrorMessages(data, response);
                                }
                            });
                        break;
                }
            };

            $scope.htmlInit = function () {

                $scope.info.idOfRecord.value = angular.element("#id-of-page").val();

                angular.element("#submitDocTitle+fieldset").append(angular.element('#checkout-document-upload-form'));

                angular.element('#checkout-document-upload-form').css("display", "block");

                angular.element('#button-upload-website-review-documents').click(function () {
                    var idOfPage = angular.element('#id-of-page').val();
                    angular.element('#container-id-of-website-review-for-upload input').val(idOfPage);
                    angular.element('.js-unique-button-upload-postback').click();
                    return false;
                });

            };

            $scope.convertDataIntoAngularFormat = function () {

                $scope.introductionSection.serverValid = $scope.info.isValidSection1;
                $scope.donationRevenueDetails.serverValid = $scope.info.isValidSectionDonations6;
                $scope.productInformation.serverValid = $scope.info.isValidSection2;
                $scope.salesInformation.serverValid = $scope.info.isValidSection3;
                $scope.customerRelations.serverValid = $scope.info.isValidSection4;

                var objName;

                for (var level1Prop in $scope.info) {

                    var level2Prop = $scope.info[level1Prop];
                    
                    if (level1Prop !== "generalErrorMessages") {

                        if ($scope.info[level1Prop] === null) $scope.info[level1Prop] = {}; 
                        for (var level3Prop in $scope.info[level1Prop]) {
                            if (level3Prop !== "errorMessage" && level3Prop !== "value") {
                                if (level2Prop[level3Prop] === null) level2Prop[level3Prop] = {}; 
                            }
                        }
                    }
                }
             

                if (typeof $scope.info.urlFieldProductDeliveryMethodTypeIdList === 'undefined') { $scope.info.urlFieldProductDeliveryMethodTypeIdList = {}; }
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.online = {};
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost = {};
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail = {};
                $scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson = {};

                for (var i in $scope.info.urlFieldProductDeliveryMethodTypeIdList.value) {
                    switch ($scope.info.urlFieldProductDeliveryMethodTypeIdList.value[i]) {
                        case 3:
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.online.checked = 1;
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.online.value = 3;
                            break;
                        case 2:
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost.checked = 1;
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost.value = 2;
                            break;
                        case 1:
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.checked = 1;
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.value = 1;
                            break;
                        case 4:
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson.checked = 1;
                            $scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson.value = 4;
                            break;
                    }
                }

                if (typeof $scope.info.urlFieldServiceProvisionMethodTypeIdList === 'undefined') { $scope.info.urlFieldServiceProvisionMethodTypeIdList = {}; }
                $scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson = {};
                $scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely = {};
                for (var i in $scope.info.urlFieldServiceProvisionMethodTypeIdList.value) {
                    switch ($scope.info.urlFieldServiceProvisionMethodTypeIdList.value[i]) {
                        case 1:
                            $scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson.checked = 1; $scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson.value = 1; break;
                        case 2:
                            $scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely.checked = 1; $scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely.value = 2; break;
                    }
                }

                if (typeof $scope.info.urlFieldCustomerContactMethodTypeIdList === 'undefined') { $scope.info.urlFieldCustomerContactMethodTypeIdList = {}; }
                $scope.info.urlFieldCustomerContactMethodTypeIdList.email = {};
                $scope.info.urlFieldCustomerContactMethodTypeIdList.phoneAndTelecomm = {};
                $scope.info.urlFieldCustomerContactMethodTypeIdList.social = {};
                $scope.info.urlFieldCustomerContactMethodTypeIdList.regularMail = {};
                $scope.info.urlFieldCustomerContactMethodTypeIdList.inPerson = {};
                $scope.info.urlFieldCustomerContactMethodTypeIdList.forumAndCommunity = {};
                $scope.info.urlFieldCustomerContactMethodTypeIdList.chatService = {};

                for (var i in $scope.info.urlFieldCustomerContactMethodTypeIdList.value) {
                    switch ($scope.info.urlFieldCustomerContactMethodTypeIdList.value[i]) {
                        case 1: $scope.info.urlFieldCustomerContactMethodTypeIdList.email.checked = 1; $scope.info.urlFieldCustomerContactMethodTypeIdList.email.value = 1; break;
                        case 5: $scope.info.urlFieldCustomerContactMethodTypeIdList.phoneAndTelecomm.checked = 1; $scope.info.urlFieldCustomerContactMethodTypeIdList.phoneAndTelecomm.value = 5; break;
                        case 2: $scope.info.urlFieldCustomerContactMethodTypeIdList.social.checked = 1; $scope.info.urlFieldCustomerContactMethodTypeIdList.social.value = 2; break;
                        case 6: $scope.info.urlFieldCustomerContactMethodTypeIdList.regularMail.checked = 1; $scope.info.urlFieldCustomerContactMethodTypeIdList.regularMail.value = 6; break;
                        case 3: $scope.info.urlFieldCustomerContactMethodTypeIdList.inPerson.checked = 1; $scope.info.urlFieldCustomerContactMethodTypeIdList.inPerson.value = 3; break;
                        case 7: $scope.info.urlFieldCustomerContactMethodTypeIdList.forumAndCommunity.checked = 1; $scope.info.urlFieldCustomerContactMethodTypeIdList.forumAndCommunity.value = 7; break;
                        case 4: $scope.info.urlFieldCustomerContactMethodTypeIdList.chatService.checked = 1; $scope.info.urlFieldCustomerContactMethodTypeIdList.chatService.value = 4; break;
                    }
                }

                if (typeof $scope.info.urlFieldSaleOriginTypeIdList === 'undefined') { $scope.info.urlFieldSaleOriginTypeIdList = {}; }
                $scope.info.urlFieldSaleOriginTypeIdList.northAmerica = {};
                $scope.info.urlFieldSaleOriginTypeIdList.southAmerica = {};
                $scope.info.urlFieldSaleOriginTypeIdList.westernEurope = {};
                $scope.info.urlFieldSaleOriginTypeIdList.easternEurope = {};
                $scope.info.urlFieldSaleOriginTypeIdList.africa = {};
                $scope.info.urlFieldSaleOriginTypeIdList.asia = {};
                $scope.info.urlFieldSaleOriginTypeIdList.middleEast = {};
                $scope.info.urlFieldSaleOriginTypeIdList.oceania = {};

                for (var i in $scope.info.urlFieldSaleOriginTypeIdList.value) {
                    switch ($scope.info.urlFieldSaleOriginTypeIdList.value[i]) {
                        case 1: $scope.info.urlFieldSaleOriginTypeIdList.northAmerica.checked = 1; $scope.info.urlFieldSaleOriginTypeIdList.northAmerica.value = 1; break;
                        case 2: $scope.info.urlFieldSaleOriginTypeIdList.southAmerica.checked = 1; $scope.info.urlFieldSaleOriginTypeIdList.southAmerica.value = 2; break;
                        case 3: $scope.info.urlFieldSaleOriginTypeIdList.westernEurope.checked = 1; $scope.info.urlFieldSaleOriginTypeIdList.westernEurope.value = 3; break;
                        case 5: $scope.info.urlFieldSaleOriginTypeIdList.africa.checked = 1; $scope.info.urlFieldSaleOriginTypeIdList.africa.value = 5; break;
                        case 6: $scope.info.urlFieldSaleOriginTypeIdList.asia.checked = 1; $scope.info.urlFieldSaleOriginTypeIdList.asia.value = 6; break;
                        case 7: $scope.info.urlFieldSaleOriginTypeIdList.middleEast.checked = 1; $scope.info.urlFieldSaleOriginTypeIdList.middleEast.value = 7; break;
                        case 8: $scope.info.urlFieldSaleOriginTypeIdList.oceania.checked = 1; $scope.info.urlFieldSaleOriginTypeIdList.oceania.value = 8; break;
                    }
                }

                if (typeof $scope.info.urlFieldDonationOriginTypeIdList === 'undefined') { $scope.info.urlFieldDonationOriginTypeIdList = {}; }
                $scope.info.urlFieldDonationOriginTypeIdList.northAmerica = {};
                $scope.info.urlFieldDonationOriginTypeIdList.southAmerica = {};
                $scope.info.urlFieldDonationOriginTypeIdList.westernEurope = {};
                $scope.info.urlFieldDonationOriginTypeIdList.africa = {};
                $scope.info.urlFieldDonationOriginTypeIdList.asia = {};
                $scope.info.urlFieldDonationOriginTypeIdList.middleEast = {};
                $scope.info.urlFieldDonationOriginTypeIdList.oceania = {};

                for (var i in $scope.info.urlFieldDonationOriginTypeIdList.value) {
                    switch ($scope.info.urlFieldDonationOriginTypeIdList.value[i]) {
                        case 1: $scope.info.urlFieldDonationOriginTypeIdList.northAmerica.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.northAmerica.value = 1; break;
                        case 2: $scope.info.urlFieldDonationOriginTypeIdList.southAmerica.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.southAmerica.value = 2; break;
                        case 3: $scope.info.urlFieldDonationOriginTypeIdList.westernEurope.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.westernEurope.value = 3; break;
                        case 5: $scope.info.urlFieldDonationOriginTypeIdList.africa.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.africa.value = 5; break;
                        case 6: $scope.info.urlFieldDonationOriginTypeIdList.asia.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.asia.value = 6; break;
                        case 7: $scope.info.urlFieldDonationOriginTypeIdList.middleEast.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.middleEast.value = 7; break;
                        case 8: $scope.info.urlFieldDonationOriginTypeIdList.oceania.checked = 1; $scope.info.urlFieldDonationOriginTypeIdList.oceania.value = 8; break;
                    }
                }

                if (typeof $scope.info.urlFieldInvoiceSendingTypeIdList === 'undefined') { $scope.info.urlFieldInvoiceSendingTypeIdList = {}; }
                $scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice = {};
                $scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice = {};
                for (var i in $scope.info.urlFieldInvoiceSendingTypeIdList.value) {
                    switch ($scope.info.urlFieldInvoiceSendingTypeIdList.value[i]) {
                        case 1:
                            $scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.checked = 1; $scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.value = 1; break;
                        case 2:
                            $scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.checked = 1; $scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.value = 2; break;
                    }
                }


                if (typeof $scope.info.urlFieldPromotionMethodTypeIdList === 'undefined') { $scope.info.urlFieldPromotionMethodTypeIdList = {}; }
                $scope.info.urlFieldPromotionMethodTypeIdList.email = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.referral = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.searchEngine = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.regularMail = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.social = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.print = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.affiliate = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.televisionAndRadio = {};
                $scope.info.urlFieldPromotionMethodTypeIdList.webBanner = {};

                for (var i in $scope.info.urlFieldPromotionMethodTypeIdList.value) {
                    switch ($scope.info.urlFieldPromotionMethodTypeIdList.value[i]) {
                        case 1: $scope.info.urlFieldPromotionMethodTypeIdList.email.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.email.value = 1; break;
                        case 6: $scope.info.urlFieldPromotionMethodTypeIdList.referral.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.referral.value = 6; break;
                        case 2: $scope.info.urlFieldPromotionMethodTypeIdList.searchEngine.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.searchEngine.value = 2; break;
                        case 7: $scope.info.urlFieldPromotionMethodTypeIdList.regularMail.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.regularMail.value = 7; break;
                        case 3: $scope.info.urlFieldPromotionMethodTypeIdList.social.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.social.value = 3; break;
                        case 8: $scope.info.urlFieldPromotionMethodTypeIdList.print.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.print.value = 8; break;
                        case 4: $scope.info.urlFieldPromotionMethodTypeIdList.affiliate.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.affiliate.value = 4; break;
                        case 9: $scope.info.urlFieldPromotionMethodTypeIdList.televisionAndRadio.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.televisionAndRadio.value = 9; break;
                        case 5: $scope.info.urlFieldPromotionMethodTypeIdList.webBanner.checked = 1; $scope.info.urlFieldPromotionMethodTypeIdList.webBanner.value = 5; break;
                    }
                }
            };

            $scope.openSection = function (sectionIdForShowHide) {

                if (sectionIdForShowHide === null || sectionIdForShowHide === undefined || sectionIdForShowHide === '') { sectionIdForShowHide = "introductionSectionTitle"; }

                if (sectionIdForShowHide == 1 || sectionIdForShowHide == "1") { sectionIdForShowHide = "introductionSectionTitle"; }
                if (sectionIdForShowHide == 2 || sectionIdForShowHide == "2") { sectionIdForShowHide = "productInformationTitle"; }
                if (sectionIdForShowHide == 3 || sectionIdForShowHide == "3") { sectionIdForShowHide = "salesInformationTitle"; }
                if (sectionIdForShowHide == 4 || sectionIdForShowHide == "4") { sectionIdForShowHide = "customerRelationsTitle"; }
                if (sectionIdForShowHide == 5 || sectionIdForShowHide == "5") { sectionIdForShowHide = "submitDocTitle"; }
                if (sectionIdForShowHide == 6 || sectionIdForShowHide == "6") { sectionIdForShowHide = "donationRevenueDetailsTitle"; }

                var elementForShowHide = angular.element("#" + sectionIdForShowHide + "+fieldset");

                angular.element("fieldset:not(#" + sectionIdForShowHide + "+fieldset):not(:last)").slideUp();

                elementForShowHide.slideDown();


                switch (sectionIdForShowHide) {
                    case "introductionSectionTitle": $scope.info.currentSection = 1; break;
                    case "productInformationTitle": $scope.info.currentSection = 2; break;
                    case "salesInformationTitle": $scope.info.currentSection = 3; break;
                    case "customerRelationsTitle": $scope.info.currentSection = 4; break;
                    case "submitDocTitle": $scope.info.currentSection = 5; break;
                    case "donationRevenueDetailsTitle": $scope.info.currentSection = 6; break;
                }

                if (sectionIdForShowHide != "introductionSectionTitle") angular.element('html, body').animate({ scrollTop: 340 }, 'fast');
                $scope.loadingIndicatorLightboxVisible = 0;

            };

            $scope.convertBussinessModelToAngular = function () {

                var isConditionTrue;
                for (var i in $scope.previouslySubmittedWebsites) {

                    if ($scope.previouslySubmittedWebsites[i].data.length != 0 && $scope.previouslySubmittedWebsites[i].id == $scope.info.revenueGenerationMethod.value) {

                        $scope.previouslySubmittedWebsites[i].isVisible = true;

                        switch ($scope.previouslySubmittedWebsites[i].id) {
                            case 1:
                                $scope.previouslySubmittedWebsites[i].name = "Services";
                                break;
                            case 2:
                                $scope.previouslySubmittedWebsites[i].name = "Products";
                                break;
                            case 4:
                                $scope.previouslySubmittedWebsites[i].name = "Products and services";
                                break;
                        }

                        for (var ii in $scope.previouslySubmittedWebsites[i].data) {
                            $scope.previouslySubmittedWebsites[i].data[ii].isEnabled = true;
                        }

                        $scope.businessModelTitleIsVisible = 1;
                        isConditionTrue = 1;
                    } else {
                        $scope.previouslySubmittedWebsites[i].isVisible = false;
                        if (!isConditionTrue) $scope.businessModelTitleIsVisible = 0;
                    }
                }

            };

            $scope.prepareDataForServer = function () {

                if ($scope.info.urlQuestionnaireTypeId && typeof $scope.info.urlQuestionnaireTypeId.value !== 'undefined' && $scope.info.urlQuestionnaireTypeId.value) $scope.info.urlQuestionnaireTypeId.value = parseInt($scope.info.urlQuestionnaireTypeId.value);

                if ($scope.info.urlType !== null) {
                    if (typeof $scope.info.urlType.value !== 'undefined') { $scope.info.urlType.value = parseInt($scope.info.urlType.value); }
                }

                if ($scope.info.revenueGenerationMethod !== null) {
                    if (typeof $scope.info.revenueGenerationMethod.value !== 'undefined') { $scope.info.revenueGenerationMethod.value = parseInt($scope.info.revenueGenerationMethod.value); }
                }

                if ($scope.info.shippingCountryId !== null) {
                    if (typeof $scope.info.shippingCountryId.value !== 'undefined') { $scope.info.shippingCountryId.value = parseInt($scope.info.shippingCountryId.value); }
                }

                if ($scope.info.urlFieldMembersAreaTypeId !== null) {
                    if (typeof $scope.info.urlFieldMembersAreaTypeId.value !== 'undefined') { $scope.info.urlFieldMembersAreaTypeId.value = parseInt($scope.info.urlFieldMembersAreaTypeId.value); }
                }

                if ($scope.info.averagePrice !== null) {
                    if (typeof $scope.info.averagePrice.value !== 'undefined') { $scope.info.averagePrice.value = parseFloat($scope.info.averagePrice.value); }
                }

                if ($scope.info.urlFieldProductDeliveryMethodTypeIdList !== null) {
                    $scope.info.urlFieldProductDeliveryMethodTypeIdList.value = [];
                    if (typeof $scope.info.urlFieldProductDeliveryMethodTypeIdList.online.value !== 'undefined' && ($scope.info.urlFieldProductDeliveryMethodTypeIdList.online.value)) { $scope.info.urlFieldProductDeliveryMethodTypeIdList.value.push(parseInt($scope.info.urlFieldProductDeliveryMethodTypeIdList.online.value)); }
                    if (typeof $scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost.value !== 'undefined' && ($scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost.value)) { $scope.info.urlFieldProductDeliveryMethodTypeIdList.value.push(parseInt($scope.info.urlFieldProductDeliveryMethodTypeIdList.regularPost.value)); }
                    if (typeof $scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.value !== 'undefined' && ($scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.value)) { $scope.info.urlFieldProductDeliveryMethodTypeIdList.value.push(parseInt($scope.info.urlFieldProductDeliveryMethodTypeIdList.registeredMail.value)); }
                    if (typeof $scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson.value !== 'undefined' && ($scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson.value)) { $scope.info.urlFieldProductDeliveryMethodTypeIdList.value.push(parseInt($scope.info.urlFieldProductDeliveryMethodTypeIdList.inPerson.value)); }
                }

                if ($scope.info.urlFieldServiceProvisionMethodTypeIdList !== null) {
                    $scope.info.urlFieldServiceProvisionMethodTypeIdList.value = [];
                    if (typeof $scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson.value !== 'undefined' && ($scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson.value)) { $scope.info.urlFieldServiceProvisionMethodTypeIdList.value.push(parseInt($scope.info.urlFieldServiceProvisionMethodTypeIdList.inPerson.value)); }
                    if (typeof $scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely.value !== 'undefined' && ($scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely.value)) { $scope.info.urlFieldServiceProvisionMethodTypeIdList.value.push(parseInt($scope.info.urlFieldServiceProvisionMethodTypeIdList.remotely.value)); }
                }

                if ($scope.info.productDeliveryDelayTime !== null) {
                    if (typeof $scope.info.productDeliveryDelayTime.value !== 'undefined') { $scope.info.productDeliveryDelayTime.value = parseFloat($scope.info.productDeliveryDelayTime.value); }
                }
                if ($scope.info.serviceProvisionDelayTime !== null) {
                    if (typeof $scope.info.serviceProvisionDelayTime.value !== 'undefined') { $scope.info.serviceProvisionDelayTime.value = parseFloat($scope.info.serviceProvisionDelayTime.value); }
                }

                if ($scope.info.urlFieldProductSourceTypeId !== null) {
                    if (typeof $scope.info.urlFieldProductSourceTypeId.value !== 'undefined') { $scope.info.urlFieldProductSourceTypeId.value = parseInt($scope.info.urlFieldProductSourceTypeId.value); }
                }
                if ($scope.info.urlFieldServiceSourceTypeId !== null) {
                    if (typeof $scope.info.urlFieldServiceSourceTypeId.value !== 'undefined') { $scope.info.urlFieldServiceSourceTypeId.value = parseInt($scope.info.urlFieldServiceSourceTypeId.value); }
                }

                if ($scope.info.urlFieldDiscountTypeId !== null) {
                    if (typeof $scope.info.urlFieldDiscountTypeId.value !== 'undefined') { $scope.info.urlFieldDiscountTypeId.value = parseInt($scope.info.urlFieldDiscountTypeId.value); }
                }

                if ($scope.info.urlFieldSupplierTypeId !== null) {
                    if (typeof $scope.info.urlFieldSupplierTypeId.value !== 'undefined') { $scope.info.urlFieldSupplierTypeId.value = parseInt($scope.info.urlFieldSupplierTypeId.value); }
                }

                if ($scope.info.urlFieldDonorContactTypeId !== null && typeof $scope.info.urlFieldDonorContactTypeId !== 'undefined') {
                    if (typeof $scope.info.urlFieldDonorContactTypeId.value !== 'undefined') { $scope.info.urlFieldDonorContactTypeId.value = parseInt($scope.info.urlFieldDonorContactTypeId.value); }
                }
                if ($scope.info.averageDonationAmount !== null && typeof $scope.info.averageDonationAmount !== 'undefined') {
                    if (typeof $scope.info.averageDonationAmount.value !== 'undefined') { $scope.info.averageDonationAmount.value = parseFloat($scope.info.averageDonationAmount.value); }
                }
                if ($scope.info.urlFieldRecurringDonationTypeId !== null && typeof $scope.info.urlFieldRecurringDonationTypeId !== 'undefined') {
                    if (typeof $scope.info.urlFieldRecurringDonationTypeId.value !== 'undefined') { $scope.info.urlFieldRecurringDonationTypeId.value = parseInt($scope.info.urlFieldRecurringDonationTypeId.value); }
                }
                if ($scope.info.monthlyDonationAmount !== null && typeof $scope.info.monthlyDonationAmount !== 'undefined') {
                    if (typeof $scope.info.monthlyDonationAmount.value !== 'undefined') { $scope.info.monthlyDonationAmount.value = parseFloat($scope.info.monthlyDonationAmount.value); }
                }

                objName = $scope.info.urlFieldSaleOriginTypeIdList;
                if (objName) {
                    objName.value = [];

                    if (typeof objName.northAmerica.value !== 'undefined' && (objName.northAmerica.value)) { objName.value.push(parseInt(objName.northAmerica.value)); }
                    if (typeof objName.southAmerica.value !== 'undefined' && (objName.southAmerica.value)) { objName.value.push(parseInt(objName.southAmerica.value)); }
                    if (typeof objName.westernEurope.value !== 'undefined' && (objName.westernEurope.value)) { objName.value.push(parseInt(objName.westernEurope.value)); }
                    if (typeof objName.africa.value !== 'undefined' && (objName.africa.value)) { objName.value.push(parseInt(objName.africa.value)); }
                    if (typeof objName.asia.value !== 'undefined' && (objName.asia.value)) { objName.value.push(parseInt(objName.asia.value)); }
                    if (typeof objName.middleEast.value !== 'undefined' && (objName.middleEast.value)) { objName.value.push(parseInt(objName.middleEast.value)); }
                    if (typeof objName.oceania.value !== 'undefined' && (objName.oceania.value)) { objName.value.push(parseInt(objName.oceania.value)); }

                    delete objName.northAmerica;
                    delete objName.southAmerica;
                    delete objName.westernEurope;
                    delete objName.africa;
                    delete objName.asia;
                    delete objName.middleEast;
                    delete objName.oceania;
                }

                objName = $scope.info.urlFieldDonationOriginTypeIdList;

                if (objName) {

                    objName.value = [];

                    if (typeof objName.northAmerica.value !== 'undefined' && (objName.northAmerica.value)) { objName.value.push(parseInt(objName.northAmerica.value)); }
                    if (typeof objName.southAmerica.value !== 'undefined' && (objName.southAmerica.value)) { objName.value.push(parseInt(objName.southAmerica.value)); }
                    if (typeof objName.westernEurope.value !== 'undefined' && (objName.westernEurope.value)) { objName.value.push(parseInt(objName.westernEurope.value)); }
                    if (typeof objName.africa.value !== 'undefined' && (objName.africa.value)) { objName.value.push(parseInt(objName.africa.value)); }
                    if (typeof objName.asia.value !== 'undefined' && (objName.asia.value)) { objName.value.push(parseInt(objName.asia.value)); }
                    if (typeof objName.middleEast.value !== 'undefined' && (objName.middleEast.value)) { objName.value.push(parseInt(objName.middleEast.value)); }
                    if (typeof objName.oceania.value !== 'undefined' && (objName.oceania.value)) { objName.value.push(parseInt(objName.oceania.value)); }
                    delete objName.northAmerica;
                    delete objName.southAmerica;
                    delete objName.westernEurope;

                    delete objName.africa;
                    delete objName.asia;
                    delete objName.middleEast;
                    delete objName.oceania;

                }

                objName = $scope.info.urlFieldPromotionMethodTypeIdList;

                if (objName) {

                    objName.value = [];


                    if (typeof objName.email.value !== 'undefined' && (objName.email.value)) { objName.value.push(parseInt(objName.email.value)); }
                    if (typeof objName.referral.value !== 'undefined' && (objName.referral.value)) { objName.value.push(parseInt(objName.referral.value)); }
                    if (typeof objName.searchEngine.value !== 'undefined' && (objName.searchEngine.value)) { objName.value.push(parseInt(objName.searchEngine.value)); }
                    if (typeof objName.regularMail.value !== 'undefined' && (objName.regularMail.value)) { objName.value.push(parseInt(objName.regularMail.value)); }
                    if (typeof objName.social.value !== 'undefined' && (objName.social.value)) { objName.value.push(parseInt(objName.social.value)); }
                    if (typeof objName.print.value !== 'undefined' && (objName.print.value)) { objName.value.push(parseInt(objName.print.value)); }
                    if (typeof objName.affiliate.value !== 'undefined' && (objName.affiliate.value)) { objName.value.push(parseInt(objName.affiliate.value)); }
                    if (typeof objName.televisionAndRadio.value !== 'undefined' && (objName.televisionAndRadio.value)) { objName.value.push(parseInt(objName.televisionAndRadio.value)); }
                    if (typeof objName.webBanner.value !== 'undefined' && (objName.webBanner.value)) { objName.value.push(parseInt(objName.webBanner.value)); }

                    delete objName.email;
                    delete objName.referral;
                    delete objName.searchEngine;
                    delete objName.regularMail;
                    delete objName.social;
                    delete objName.print;
                    delete objName.affiliate;
                    delete objName.televisionAndRadio;
                    delete objName.webBanner;
                }

                objName = $scope.info.urlFieldCustomerContactMethodTypeIdList;
                if (objName) {

                    objName.value = [];

                    if (typeof objName.email.value !== 'undefined' && (objName.email.value)) { objName.value.push(parseInt(objName.email.value)); }
                    if (typeof objName.phoneAndTelecomm.value !== 'undefined' && (objName.phoneAndTelecomm.value)) { objName.value.push(parseInt(objName.phoneAndTelecomm.value)); }
                    if (typeof objName.social.value !== 'undefined' && (objName.social.value)) { objName.value.push(parseInt(objName.social.value)); }
                    if (typeof objName.regularMail.value !== 'undefined' && (objName.regularMail.value)) { objName.value.push(parseInt(objName.regularMail.value)); }
                    if (typeof objName.inPerson.value !== 'undefined' && (objName.inPerson.value)) { objName.value.push(parseInt(objName.inPerson.value)); }
                    if (typeof objName.forumAndCommunity.value !== 'undefined' && (objName.forumAndCommunity.value)) { objName.value.push(parseInt(objName.forumAndCommunity.value)); }
                    if (typeof objName.chatService.value !== 'undefined' && (objName.chatService.value)) { objName.value.push(parseInt(objName.chatService.value)); }

                    delete objName.email;
                    delete objName.phoneAndTelecomm;
                    delete objName.social;
                    delete objName.regularMail;
                    delete objName.inPerson;
                    delete objName.forumAndCommunity;
                    delete objName.chatService;
                }

                if ($scope.info.urlFieldInvoiceSendingTypeIdList !== null) {
                    $scope.info.urlFieldInvoiceSendingTypeIdList.value = [];

                    if (typeof $scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.value !== 'undefined' && ($scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.value)) { $scope.info.urlFieldInvoiceSendingTypeIdList.value.push(parseInt($scope.info.urlFieldInvoiceSendingTypeIdList.payzaEmailInvoice.value)); }
                    if (typeof $scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.value !== 'undefined' && ($scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.value)) { $scope.info.urlFieldInvoiceSendingTypeIdList.value.push(parseInt($scope.info.urlFieldInvoiceSendingTypeIdList.mailPersonalizedInvoice.value)); }
                }

                if ($scope.info.monthlySaleAmount !== null) {
                    if (typeof $scope.info.monthlySaleAmount.value !== 'undefined') { $scope.info.monthlySaleAmount.value = parseFloat($scope.info.monthlySaleAmount.value); }
                }
                if ($scope.info.urlFieldRecurringBillingTypeId !== null) {
                    if (typeof $scope.info.urlFieldRecurringBillingTypeId.value !== 'undefined') { $scope.info.urlFieldRecurringBillingTypeId.value = parseInt($scope.info.urlFieldRecurringBillingTypeId.value); }
                }

                if ($scope.info.urlQuestionnaireTypeId.value == 2) {
                    $scope.info.urlFieldDonorContactTypeId = null;
                    $scope.info.donorContactInfo = null;
                    $scope.info.averageDonationAmount = null;
                    $scope.info.urlFieldRecurringDonationTypeId = null;
                    $scope.info.monthlyDonationAmount = null;
                    $scope.info.urlFieldDonationOriginTypeIdList = null;
                }
            };

            $scope.updateObjectProperty = function (sourceObj, targetObj) {
                for (var key in sourceObj) {
                    if (sourceObj[key] !== null) { targetObj[key] = sourceObj[key]; }
                }
            }

            $scope.loadingIndicatorIconPositioning = function () {

                var documentHeight = $(window).height();

                var documentWidth = $(window).width();

                var elementWidth = $('#loading-indicator-lightbox')[0].offsetWidth;

                var viewportOffset = $('.panel-body')[0].getBoundingClientRect();

                var topOffset = (viewportOffset.top >= 0) ? viewportOffset.top : 0;

                var bottomOffset = (viewportOffset.bottom >= documentHeight) ? documentHeight : viewportOffset.bottom;

                var visibleWidth = (documentWidth > elementWidth) ? elementWidth : documentWidth - viewportOffset.left;

                $("#loading-indicator-lightbox").css({ "left": viewportOffset.left, "top": topOffset, "height": bottomOffset - topOffset, "width": visibleWidth })

            };

            $scope.generalErrorMessages = function (data, response) {

                $scope.merchantServicesBlockVisible = 0;

                switch (response) {
                    case 401:
                        window.location.href = '../Logout.aspx';
                        break;
                    case 500:
                        $scope.info.generalErrorMessages = (typeof data.Message != "undefined") ? data.Message : '' + (typeof data.errorMessage != "undefined") ? data.errorMessage : '';
                        break;
                    default:
                        $scope.info.generalErrorMessages = "An Error occurred, please refresh the page and try again.";
                }

            };

            $scope.revenueGenerationMethodConfirm = function (isConfirmed) {
                if (isConfirmed == true) {
                    $scope.revenueGenerationMethodPreviousValue = $scope.info.revenueGenerationMethod.value;

                    $scope.info.businessModel.value = null;
                    $scope.businessModelPreviousValue = null;
                }
                else {
                    $scope.info.revenueGenerationMethod.value = $scope.revenueGenerationMethodPreviousValue;
                }
            };

            $scope.turnConfirmBusinessmodelVisibility = function () { $scope.confirmBusinessmodelVisibility = 1; }

            $scope.getPreviousWebsiteReviewQuestionnaireConfirm = function (isConfirmed) {
                if (isConfirmed == true) {
                    $scope.getPreviousWebsiteReviewQuestionnaire($scope.info.businessModel.value);
                }
                else {
                    $scope.info.businessModel.value = $scope.businessModelPreviousValue;
                }
            };

            $scope.getPreviousWebsiteReviewQuestionnaire = function (idOfRecord) {

                $scope.loadingIndicatorLightboxVisible = 1;
                $scope.businessModelPreviousValue = idOfRecord;

                $http.get("../JSON/WebsiteApi/GetPreviousWebsiteQuestionnaire/" + idOfRecord)

                    .success(function (data) {

                        $scope.updateObjectProperty(data, $scope.info);

                        $scope.info.businessModel.value = $scope.businessModelPreviousValue;

                        $scope.info.previousUrlsId.value = $scope.businessModelPreviousValue;

                        $scope.convertDataIntoAngularFormat();

                        $scope.info.currentSection = document.getElementById('id-of-current-section').value;

                        $scope.revenueGenerationMethodPreviousValue = $scope.info.revenueGenerationMethod.value;

                        $scope.loadingIndicatorLightboxVisible = 0;

                    })
                    .error(function (data, response) {
                        $scope.generalErrorMessages(data, response);
                        $scope.loadingIndicatorLightboxVisible = 0;
                    })
            };

            $scope.saveForm = function (sectionTitle) {

                if (typeof $scope.info.businessModel != "undefined") $scope.info.previousUrlsId.value = $scope.info.businessModel.value;

                $scope.revenueGenerationMethodPreviousValue = $scope.info.revenueGenerationMethod.value;
                var functionArgumentsLength = arguments.length;

                $scope.loadingIndicatorLightboxVisible = 1;
                if ($scope.info.currentSection === null || $scope.info.currentSection === undefined || $scope.info.currentSection === '') { $scope.info.currentSection = 1; }

                $scope.prepareDataForServer();

                $http({
                    method: 'POST',
                    url: '../JSON/WebsiteApi/SaveWebsiteQuestionnaire',
                    data: $scope.info
                }).
                    success(function (response) {

                        $scope.info = response;

                        $scope.info.businessModel = {};
                        $scope.info.businessModel.value = $scope.businessModelPreviousValue;

                        angular.element("#id-of-page").val($scope.info.idOfRecord.value);
                        $scope.convertDataIntoAngularFormat();
                        $scope.loadingIndicatorLightboxVisible = 0;
                        if (functionArgumentsLength > 0 && $scope.info.actionWasSuccessful) {
                            $scope.openSection(sectionTitle);
                        } else {
                            angular.element('html, body').animate({ scrollTop: 340 }, 'fast');
                        }

                    }).
                    error(function (data, response) {
                        $scope.generalErrorMessages(data, response);
                        $scope.loadingIndicatorLightboxVisible = 0;
                    });
            };

            $scope.submitForm = function (formName, sectionForShow) {
                $scope.revenueGenerationMethodPreviousValue = $scope.info.revenueGenerationMethod.value;
                $scope.wasSubmitButtonClicked = 1;
                $scope.loadingIndicatorLightboxVisible = 1;

                switch (sectionForShow) {
                    case "productInformationTitle": if ($scope.info.urlQuestionnaireTypeId == 3) { $scope.info.currentSection = 6 } else { $scope.info.currentSection = 1 }; break;
                    case "salesInformationTitle": $scope.info.currentSection = 2; break;
                    case "customerRelationsTitle": $scope.info.currentSection = 3; break;
                    case "submitDocTitle": $scope.info.currentSection = 4; break;
                    case "donationRevenueDetailsTitle": $scope.info.currentSection = 1; break;
                    case "5": $scope.info.currentSection = 5; break;
                    default: $scope.info.currentSection = 1;
                }

                if ($scope.info.currentSection === null || $scope.info.currentSection === undefined || $scope.info.currentSection === '') { $scope.info.currentSection = 1; }

                $scope.prepareDataForServer();

                $http({
                    method: 'POST',
                    url: '../JSON/WebsiteApi/SubmitWebsiteQuestionnaire',
                    data: $scope.info
                }).
                    success(function (response) {
                        $scope.info = response;
                        $scope.convertDataIntoAngularFormat();

                        if (formName !== null && formName !== undefined && formName !== '') {

                            formName.serverValid = response.isValid;
                            if (formName.serverValid === true) {
                                angular.element("#" + formName.$name + "Title+fieldset").slideUp();
                                angular.element("#" + sectionForShow + "+fieldset").slideDown();
                            }
                        }

                        angular.element('html, body').animate({ scrollTop: 340 }, 'fast');
                        $scope.loadingIndicatorLightboxVisible = 0;

                        if ($scope.info.isValid !== false && sectionForShow == 5) {
                            window.location.href = '../Website/WebsiteAddEditResultRedirection.aspx'
                        }
                    }).
                    error(function (data, response) {
                        $scope.generalErrorMessages(data, response);
                        $scope.loadingIndicatorLightboxVisible = 0;
                    });

            };



            $scope.objInit();

            $scope.htmlInit();

            $scope.getCurrentCulture = function () {
                $http.get('../JSON/CultureApi/GetCurrentCulture')
                    .success(function (data) {
                        $scope.currentLanguage = data;
                        $scope.getWebsiteReviewQuestionnaire();
                    })
                    .error(function (data, response) {
                        $scope.generalErrorMessages(data, response);
                        $scope.getWebsiteReviewQuestionnaire();
                    });

            };

            $scope.getCurrentCulture();

            $scope.getWebsiteReviewQuestionnaire = function () {

                $http.get("../JSON/WebsiteApi/GetWebsiteQuestionnaire/" + $scope.info.idOfRecord.value)

                    .success(function (data) {

                        $scope.updateObjectProperty(data, $scope.info);

                        $scope.convertDataIntoAngularFormat();

                        $scope.resourceInit();

                        $scope.info.currentSection = document.getElementById('id-of-current-section').value;

                        angular.element("#loading-indicator-lightbox-for-heading").remove();

                        $scope.openSection($scope.info.currentSection);

                        $scope.revenueGenerationMethodPreviousValue = $scope.info.revenueGenerationMethod.value;

                        $scope.info.businessModel.value = $scope.info.previousUrlsId.value;

                        $scope.businessModelPreviousValue = $scope.info.businessModel.value;

                        $scope.getShippingCountries();
                    })
                    .error(function (data, response) {

                        $scope.resourceInit();

                        $scope.generalErrorMessages(data, response);
                        $scope.loadingIndicatorLightboxVisible = 0;

                    })
            };

            $scope.getShippingCountries = function () {
                $http.get('../JSON/WebsiteApi/GetShippingCountryList')
                    .success(function (data) {

                        $scope.shippingCountryId = {};
                        $scope.shippingCountryId.source = {};

                        for (var i in data) {
                            name = ('00' + i).slice(-3) + data[i].name;
                            $scope.shippingCountryId.source[name] = data[i].id;
                        }

                        $scope.getPreviouslySubmittedWebsites();

                    })
                    .error(function (data, response) {
                        $scope.generalErrorMessages(data, response);
                        $scope.loadingIndicatorLightboxVisible = 0;
                    })
            };

            $scope.getPreviouslySubmittedWebsites = function () {

                $http.get('../JSON/WebsiteApi/GetWebsiteSummaryList/')
                    .success(function (data) {



                        $scope.previouslySubmittedWebsites = data;

                        $scope.convertBussinessModelToAngular();

                        $scope.$watch('introductionSection.$invalid', function (newValue, oldValue, $scope) {
                            if (newValue !== oldValue) {
                                if ($scope.introductionSection.$invalid) {
                                    $scope.introductionSection.serverValid = false;
                                }
                            }

                        });
                        $scope.$watch('donationRevenueDetails.$invalid', function (newValue, oldValue, $scope) {
                            if (newValue !== oldValue) {
                                if ($scope.donationRevenueDetails.$invalid) {
                                    $scope.donationRevenueDetails.serverValid = false;
                                }
                            }
                        });
                        $scope.$watch('productInformation.$invalid', function (newValue, oldValue, $scope) {
                            if (newValue !== oldValue) {
                                if ($scope.productInformation.$invalid) {
                                    $scope.productInformation.serverValid = false;
                                }
                            }
                        });
                        $scope.$watch('salesInformation.$invalid', function (newValue, oldValue, $scope) {
                            if (newValue !== oldValue) {
                                if ($scope.salesInformation.$invalid) {
                                    $scope.salesInformation.serverValid = false;
                                }
                            }
                        });
                        $scope.$watch('customerRelations.$invalid', function (newValue, oldValue, $scope) {
                            if (newValue !== oldValue) {
                                if ($scope.customerRelations.$invalid) {
                                    $scope.customerRelations.serverValid = false;
                                }
                            }
                        });

                        $scope.$watch('info.revenueGenerationMethod.value', function (newValue, oldValue, $scope) {
                            if (newValue !== oldValue) {
                                $scope.convertBussinessModelToAngular();
                            }
                        });
                        $scope.merchantServicesBlockVisible = 1;

                        $scope.$watch('loadingIndicatorLightboxVisible', function (newValue, oldValue, $scope) {
                            if (newValue === 1) {
                                $scope.loadingIndicatorIconPositioning();
                            }
                        });

                    })
                    .error(function (data, response) {

                        $scope.generalErrorMessages(data, response);
                        $scope.loadingIndicatorLightboxVisible = 0;

                    })

            };
        }]
    };
}]);








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

(function () {
    function alias(obj, namespace) {
        /// <summary>Utility function for exporting objects to the global scope using a namespace.</summary>
        /// <param name="obj" optional="false" type="Object">
        ///     The object to be exported.
        /// </param>
        /// <param name="namespace" optional="false" type="String">
        ///     A string representing the namespaced object (e.g. 'corp.acme.util.myObject')
        /// </param>

        if (!obj) { return; }

        if (namespace && typeof namespace === 'string') {
            var ctx = window,
                nsSegments = namespace.split('.'),
                i;

            // advance until the second to last level
            for (i = 0; i < nsSegments.length - 1; i = i + 1) {
                ctx[nsSegments[i]] = ctx[nsSegments[i]] || {};
                ctx = ctx[nsSegments[i]];
            }

            // throw an error if the alias is already used
            if (ctx[nsSegments[i]] && ctx[nsSegments[i]] !== 'undefined') {
                throw new Error('payza.util.alias(): ' + namespace + ' namespace segment is already used');
            }

            // last level, add reference to object
            ctx[nsSegments[i]] = obj;
        }
    }

    // make it available
    alias(alias, 'payza.util.alias');
}());
(function () {
    function debounce(func, threshold, execAsap) {
        /// <summary>Fires exactly one function call for a function that may be called several times during a specified period of time.
        ///     <para>(debouncing means to coalesce several temporally close events into one event)</para>
        ///     <para>Credit: John Hann - http://unscriptable.com/2009/03/20/debouncing-javascript-methods </para>
        /// </summary>
        /// <param name="func" optional="false" type="Function">
        ///     The function to be executed.
        /// </param>
        /// <param name="threshold" optional="true" type="Number" integer="true">
        ///     If function calls are temporally closer than this, debouncing will happen (defaults to 100ms).
        /// </param>
        /// <param name="execAsap" optional="true" type="Boolean">
        ///     Execute function once at start.
        /// </param>
        /// <returns type="Function">
        ///     The debouncing function (arguments to this will be passed on to the called function).
        /// </returns>

        var timeout;

        return function debounced() {

            var obj = this, args = arguments;

            function delayed() {
                if (!execAsap) {
                    func.apply(obj, args);
                }
                timeout = null;
            }

            if (timeout) {
                clearTimeout(timeout);
            } else if (execAsap) {
                func.apply(obj, args);
            }

            timeout = setTimeout(delayed, threshold || 100);
        };
    }

    // make it available
    payza.util.alias(debounce, 'payza.util.debounce');
}());
$(document).ready(function(){
  $('#sidebar-left .active').closest('.panel-collapse').addClass('in');
  $('#sidebar-left .active').closest('.panel-collapse').removeClass('collapse');
  }
);
(function () {
    function optionsToJSON(options) {
        /// <summary>Turns a string representing plugin options into a JSON object (serialized).</summary>
        /// <param name="options" type="String" optional="true">
        ///     A set of plugin options.
        /// </param>
        /// <returns type="String">
        ///     The serialized JSON object (an empty one if no options specified).
        /// </returns>

        var options_arr,
            i,
            tuple,
            output;

        if (options && options !== undefined) {
            // remove whatever quotes were used
            options = options.replace(/['"]/g, '');

            options_arr = options.split(',');

            for (i = 0; i < options_arr.length; i = i + 1) {
                tuple = options_arr[i].split(':');

                // add proper JSON quoting (e.g. "key":"value") and remove extra spaces between quotes;
                // if no colon is present, assume it's a flag-like option and use 'yes' by default
                options_arr[i] = '"' + $.trim(tuple[0]) + '":';
                if (tuple.length > 1) {
                    tuple[1] = $.trim(tuple[1]);

                    switch (tuple[1]) {
                        case 'true':
                        case 'false':
                            options_arr[i] += tuple[1];
                            break;
                        default:
                            options_arr[i] += '"' + tuple[1] + '"';
                            break;
                    }
                } else {
                    options_arr[i] += 'true';
                }
            }

            output = '{' + options_arr.join(',') + '}';
        } else {
            output = '{}';
        }

        return output;
    }

    // make it available
    payza.util.alias(optionsToJSON, 'payza.util.optionsToJSON');
}());
/// <reference path="../util/alias.js" />

// Documentation: https://payza.sharepoint.com/sites/rd/fed/FrontEnd%20JavaScript%20Guide/API/payza/env/browser.aspx

(function () {
    function Browser() {
        // browser detection utility
        // Adapted from http://www.quirksmode.org/js/detect.html

        var agents = [{ string: navigator.userAgent, subString: 'Chrome', identity: 'chrome', versionSearch: 'Chrome' },
                { string: navigator.vendor, subString: 'Apple', identity: 'safari', versionSearch: 'Version' },
                { prop: window.opera, identity: 'opera', versionSearch: 'Version' },
                { string: navigator.userAgent, subString: 'Firefox', identity: 'firefox', versionSearch: 'Firefox' },
                { string: navigator.userAgent, subString: 'MSIE', identity: 'ie', versionSearch: 'MSIE' }],
            versionSearchString = null;

        function getName() {
            var i,
                dataString,
                dataProp;

            for (i = 0; i < agents.length; i = i + 1) {
                dataString = agents[i].string;
                dataProp = agents[i].prop;

                versionSearchString = agents[i].versionSearch || agents[i].identity;

                if ((dataString && dataString.indexOf(agents[i].subString) !== -1) || dataProp) {
                    return agents[i].identity;
                }
            }
        }

        function getVersion(navigatorInfo) {
            var index = navigatorInfo.indexOf(versionSearchString);

            if (index === -1) { return; }

            return parseFloat(navigatorInfo.substring(index + versionSearchString.length + 1));
        }

        this.name = getName() || 'unknown';
        this.version = getVersion(navigator.userAgent) || getVersion(navigator.appVersion) || 'unknown';

        // is Java available?
        this.javaEnabled = navigator.javaEnabled();

        // is Flash available?
        if (navigator.plugins === undefined || navigator.plugins.length === 0) {
            this.flashEnabled = Boolean(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"));
        } else {
            this.flashEnabled = Boolean(navigator.plugins["Shockwave Flash"]);
        }
    }

    // make it available
    payza.util.alias(new Browser(), 'payza.env.browser');
}());
/// <reference path="../util/alias.js" />

(function () {
    function onlyDigits(event) {
        var allowed = '0123456789',                 // allowed characters
            e = event || window.event,              // standard or IE model
            code = e.charCode || e.keyCode,         // the code of the character that was entered
            character = String.fromCharCode(code);  // the character that was entered

        // we don't care about function keys
        if (code < 32 || e.ctrlKey || e.altKey) {
            return true;
        }

        // don't display characters that are not allowed
        if (allowed.indexOf(character) === -1) {
            if (e.preventDefault) { e.preventDefault(); }
            if (e.returnValue) { e.returnValue = false; }
            return false;
        }

        return true;
    }

    // make it available
    payza.util.alias(onlyDigits, 'payza.forms.onlyDigits');
}());
(function ($) {
    $.fn.accordion = function (options) {

        /// <summary>
        ///     Vertically stacked list of expandable/collapsible items.
        /// </summary>
        /// <param name="options" type="Object" optional="true">
        ///     <para>header: '[selector]'</para>
        ///     <para>content: '[selector]'</para>
        ///     <para>activeClass: '[className]'</para>
        /// </param>

        var $accordion = this,
            $headers,
            $contents,
            activeHeaderIndex,
            settings = {
                header: '.accordion-header',
                content: '.accordion-content',
                activeClass: 'active'
            };

        // extend the default settings using the passed-in options
        if (options) {
            $.extend(settings, options);
        }

        // get references to the header and content entities
        $headers = $accordion.find(settings.header);
        $contents = $accordion.find(settings.content);

        return this.each(function () {
            // collapse all but the first content pane
            $contents.hide().first().show();

            // and mark the header as active
            $headers.first().not('.' + settings.activeClass).addClass(settings.activeClass);

            // keep track of the active header
            activeHeaderIndex = 0;

            $headers.on('click.accordion', function (event) {

                // keep track of the last clicked header
                var clickedHeaderIndex = $headers.index(this);

                // perhaps the header is a link...
                // prevent the page from moving on
                if (event.preventDefault) { event.preventDefault(); }
                if (event.returnValue) { event.returnValue = false; }

                // if there are only two items make them toggle
                // on every click ('seesaw' behavior)
                if ($headers.length === 2) {
                    $contents.slideToggle();
                    $headers.toggleClass(settings.activeClass);
                } else if (activeHeaderIndex !== clickedHeaderIndex) {
                    // collapse the currently expanded content pane
                    $contents.eq(activeHeaderIndex).slideUp();
                    $headers.eq(activeHeaderIndex).removeClass(settings.activeClass);

                    // expand the content pane corresponding to the clicked header
                    $contents.eq(clickedHeaderIndex).slideDown();
                    $headers.eq(clickedHeaderIndex).addClass(settings.activeClass);

                    // update the active header index
                    activeHeaderIndex = clickedHeaderIndex;
                }
            });
        });
    };
}(jQuery));
(function ($) {
    $.fn.behaviorTrigger = function () {
        /// <summary>
        ///     Triggers behaviors specified using the data-behavior attributes.
        /// </summary>

        return this.each(function () {
            var $element = $(this),
                i,
                temp,
                data = $element.attr('data-behavior') || $element.attr('data-behaviour'),
                plugins = data && data !== undefined ? data.split(';') : [],
                plugin_name,
                plugin_options,
                optionsToJSON = payza.util.optionsToJSON;

            // go through the list of plugins and turn their options into JSON,
            // then replace their string representation with an object having the
            // 'name' and 'options' attributes
            for (i = 0; i < plugins.length; i = i + 1) {
                temp = plugins[i].split('(');
                plugin_name = $.trim(temp[0]);
                // temp[1] holds the options string; if it exists drop the trailing paranthesis
                // and return the string; if not, return the empty string
                plugin_options = temp[1] && temp[1] !== undefined ? (temp[1].split(')'))[0] : '';

                plugins[i] = {
                    name: plugin_name,
                    options: $.parseJSON(optionsToJSON(plugin_options))
                };
            }

            for (i = 0; i < plugins.length; i = i + 1) {
                $.fn[plugins[i].name].call($element, plugins[i].options);
            }
        });
    };
}(jQuery));
/* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Button.DEFAULTS, options)
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d);
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
        .prop('checked', !this.$element.hasClass('active'))
        .trigger('change')
      if ($input.prop('type') === 'radio') $parent.find('.active').removeClass('active')
    }

    this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#carousel
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000
  , pause: 'hover'
  , wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    this.sliding = true

    isCycling && this.pause()

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

    if ($next.hasClass('active')) return

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
        .emulateTransitionEnd(600)
    } else {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    var $el = $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('dropdown')

      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#modals
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.$element.trigger('shown.bs.' + this.type)
    }
  }

  Tooltip.prototype.applyPlacement = function(offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    $tip
      .offset(offset)
      .addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.$element.trigger('hidden.bs.' + this.type)

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth
    , height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#popovers
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({} , $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tabs
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab'
      , relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#affix
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element = $(element)
    this.affixed  =
    this.unpin    = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    this.affixed = affix
    this.unpin   = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))

    if (affix == 'bottom') {
      this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#scrollspy
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#\w/.test(href) && $(href)

        return ($href
          && $href.length
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parents('.active')
      .removeClass('active')

    var selector = this.selector
      + '[data-target="' + target + '"],'
      + this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length)  {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(window.jQuery);

(function ($) {
    $.fn.fancyTable = function (options) {
        // Defaults
        var settings = {
            'lineNumbers': true			// Default true, inserts line numbers to each row
        };

        if (options) {
            $.extend(settings, options);
        }

        var table = $(this),
			columnCount = table.find('tr:first').children().length,
            cells,
			lineNumberWidth,
            width;

        // Check if line numbers is set to true
        if (settings.lineNumbers) {
            // Insert line numbers 
            table.find('tr').each(function (i) {

                var lineCell = $(this).children(':first-child').clone();
                $(this).prepend(lineCell);

                lineCell.text(function () {
                    if (i === 0) {
                        return '';
                    } else {
                        return i;
                    }
                }).addClass('line-number');
            });

            cells = table.find('tr').find('th, td').not(':first-child');
			lineNumberWidth = table.find('tr').find('th, td').first().outerWidth();

            if ($(table).parent('div')) {
                width = parseFloat(($(table).parent('div').width() - lineNumberWidth) / columnCount) - 16; // 16 is the total cell left and right padding
            } else {
                width = parseFloat((table.width() - lineNumberWidth) / columnCount) - 16; // 16 is the total cell left and right padding
            }

            set(cells, width);

        } else {

            cells = table.find('tr').find('th, td');

            if ($(table).parent('div')) {
                width = parseFloat($(table).parent('div').width() / columnCount) - 16; // 16 is the total cell left and right padding
            } else {
                width = parseFloat(table.width() / columnCount) - 16; // 16 is the total cell left and right padding
            }

            set(cells, width);
        }

        function set(c, w) {
            c.each(function () {
                $(this).css({ 'padding': '0' });
                $(this).wrapInner('<div class="fancified"><span class="cell">');
                $(this).find('.fancified').css({ 'width': w + 'px' });
                $(this).find('.cell').css({ 'width': 'auto' });

                if ($(this).find('.cell').outerWidth() > w) {
                    $(this).find('.cell').css({ 'width': w + 'px' });

                    $(this).find('.cell').mouseover(function () {

                        if ($(this).parent().parent()[0] === $(this).parents('tr').children().last()[0]) {
                            $(this).parent().addClass('revealed last');
                        } else {
                            $(this).parent().addClass('revealed');
                        }
                        $(this).css({ 'width': 'auto' });

                    }).mouseout(function () {

                        if ($(this).parent().parent()[0] === $(this).parents('tr').children().last()[0]) {
                            $(this).parent().removeClass('revealed last');
                        } else {
                            $(this).parent().removeClass('revealed');
                        }

                        $(this).css({ 'width': w + 'px' });
                    });

                }
            });
        }

    };

}(jQuery));
(function ($) {
    $.fn.highlight = function (options) {
        /// <summary>
        ///     Highlights/selects the text of an element.
        /// </summary>
        /// <param name="options" type="Object" optional="true">
        ///     <para>on: 'click|contextmenu'</para>
        /// </param>

        var settings = {};

        // extend the default settings using the passed-in options
        if (options) {
            $.extend(settings, options);
        }

        return this.each(function () {
            var element = this;

            if (settings.on && typeof settings.on === 'string') {
                $(element).on(settings.on + '.highlight', function () { _highlight(element); });
            } else {
                _highlight(element);
            }
        });

        // helper function
        function _highlight(element) {
            var range, selection;
            // For IE
            if (document.body.createTextRange) {
                range = document.body.createTextRange();
                range.moveToElementText(element);
                range.select();
                // For all other browsers
            } else if (window.getSelection) {
                selection = window.getSelection();
                range = document.createRange();
                range.selectNodeContents(element);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    };
}(jQuery));

(function ($) {
    $.fn.modal = function (options) {
        /// <summary>
        ///     Displays the selected element on top of an overlay.
        /// </summary>
        /// <param name="options" type="Object" optional="false">
        ///     <para>triggeredBy: '[selector]'</para>
        ///     <para>dismissedBy: '[selector]'</para>
        ///     <para>dismissOnESC: true|false</para>
        ///     <para>backdropColor: '#colorCode|rgb(x,x,x)|rgba(x,x,x,x)'</para>
        ///     <para>backdropOpacity: 0 .. 1.0</para>
        /// </param>

        var $backdrop = $('<div/>'),
            settings = {
                dismissedBy: '.modal-close',
                dismissOnESC: true,
                backdropColor: '#111',
                backdropOpacity: 0.5
            },
            $documentPadding = $('<div/>');

        // extend the default settings using the passed-in options
        if (options) {
            $.extend(settings, options);
        }

        this.hide().css({
            position: 'fixed',
            'z-index': 1
        });

        $backdrop.hide().css({
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            background: settings.backdropColor,
            opacity: settings.backdropOpacity,
            zIndex: 9999,
            filter: 'alpha(opacity=' + (settings.backdropOpacity * 100) + ')'
        });
        $('body').append($backdrop);

        return this.each(function () {
            var $element = $(this);
            $element.css({ zIndex: 99999 });

            if (settings.triggeredBy) {
                $(settings.triggeredBy).on('click.modal', function (event) {
                    $backdrop.show();
                    padDocument();
                    $element.show();
                    event.preventDefault();
                });
            } else {
                $backdrop.show();
                padDocument();
                $element.show();
            }

            $(this).find(settings.dismissedBy).on('click.modal', function (event) {
                $backdrop.hide();
                $element.hide();
                removeDocumentPadding();
                event.preventDefault();
            });

            // dismiss on ESC when requested
            if (settings.dismissOnESC) {
                $(document).keyup(function (event) {
                    if (event.keyCode === 27) { // ESC -> 27
                        $backdrop.hide();
                        $element.hide();
                        removeDocumentPadding();
                    }
                });
            }


            // helper functions

            // if the modal element overflows the screen, pad the document so it
            // can be scrolled into view (the modal element itself is 'fixed')
            function padDocument() {
                var elementLowerLimit = $element.offset().top + $element.outerHeight(),
                    documentHeight = $('body').outerHeight(),
                    viewportHeight = $(window).height();

                if (elementLowerLimit > viewportHeight) {
                    if (documentHeight < elementLowerLimit) {
                        $documentPadding.css({
                            width: '100%',
                            height: elementLowerLimit - documentHeight + 'px'
                        });
                        $('body').append($documentPadding);
                    }
                }
            }

            // remove document padding when the modal element is dismissed
            function removeDocumentPadding() {
                $documentPadding.remove();
            }
        });
    };
}(jQuery));
(function ($) {
    $.fn.moreLess = function (options) {
        /// <summary>
        ///     Hide / show a block or part of an element.
        /// </summary>
        /// <param name="options" type="Object" optional="true">
        ///     <para>minHeight: '[The height of the box when content is clipped in pixels (105px)]'</para>
        ///     <para>textMore: '[Text when box content is collapsed (Show more)]'</para>
        ///     <para>textLess: '[Text when box content is expanded (Show less)]'</para>
        ///     <para>titleMore: '[Title attribute of the collapsed icon (Show more)]'</para>
        ///     <para>titleLess: '[Title attribute of the expanded icon (Show less)]'</para>
        ///     <para>iconMore: '[Icon when collapsed (icn-arrow-right-dark)]'</para>
        ///     <para>iconLess: '[Icon when expanded (icn-arrow-up-dark)]'</para>
        /// </param>

        //Defaults
        var settings = {
            'minHeight': '105px',     // The height of the box when content is clipped.
            'textMore': 'Show more',  // Text when box content is collapsed.
            'textLess': 'Show less',  // Text when box content is expanded.
            'titleMore': 'Show more', // Title attribute of the collapsed icon.
            'titleLess': 'Show less', // Title attribute of the expanded icon.
            'iconMore': 'icn-arrow-right-dark',    // Icon for collapsed.
            'iconLess': 'icn-arrow-up-dark'    // Icon for expanded.
        };

        if (options) {
            $.extend(settings, options);
        }

        // Wrap the block in div with class more-less-wrapper and insert the toggler
        $(this).wrap('<div class="more-less-wrapper"></div>');
        $(this).parent().append('<a class="icon-16 ' + settings.iconMore + ' more-less-toggler" title="' + settings.titleMore + '"><span class="icn" /><span class="icn-txt">' + settings.textMore + '</span></a>');


        return this.each(function () {
            var $clipped = $(this), $wrapper = $clipped.parent(), $toggler = $(this).next();
            // Adjust the height and the overflow of the clipped content
            $clipped.addClass('more-less-clip').css({ 'height': settings.minHeight }).addClass('toggle');

            $toggler.click(function () {
                if ($clipped.hasClass('toggle')) {
                    $clipped.removeClass('toggle').css({ 'height': 'auto' });
                    $(this).removeClass(settings.iconMore).addClass(settings.iconLess).attr('title', settings.titleLess);
                    $(this).find('.icn-txt').text(settings.textLess);
                } else {
                    $clipped.addClass('toggle').animate({ height: settings.minHeight }, 500);
                    $(this).removeClass(settings.iconLess).addClass(settings.iconMore).attr('title', settings.titleMore);
                    $(this).find('.icn-txt').text(settings.textMore);
                }

            });

        });
    };

}(jQuery));
(function ($) {
    $.fn.notably = function (options) {

        /// <summary>
        ///     Hide / show a block or part of an element.
        /// </summary>
        /// <param name="options" type="Object" optional="true">
        ///     <para>isOpen: '[Set to true if notably should be open on page load.]'</para>
        ///     <para>contentContainer: '[The class of the element containing the content of notable. This must be unique if there are multiple instances of notably on the page.]'</para>
        /// </param>

        // Defaults
        var settings = {
            'isOpen': false,                            // Set to true if notably should be open on page load.
            'contentContainer': $('.notable-content')   // The class of the element containing the content of notable. This must be unique if there are multiple instances of notably on the page.
        };

        if (options) {
            $.extend(settings, options);
        }

        // Hide the container containing content
        $(settings.contentContainer).hide();

        return this.each(function () {
            var content = $(settings.contentContainer).html(),
                    position = $(this).offset(), top = position.top, left = position.left - 225,
                    viewHeight = $(document).height(), viewWidth = $(document).width();

            // Check whether the notable box is open or close when initiated
            if (settings.isOpen) {
                createBox(content);

                $('.notably-backdrop').click(function () {
                    removeBox(this, $('.notably-box'));
                });

                initiate(this, content);

            } else {
                initiate(this, content);
            }

            // Put the elements together and position on the page
            function createBox(content) {
                // Insert a backdrop to the body
                $('body').append('<div class="notably-backdrop"></div>');
                $('.notably-backdrop').css({ 'height': viewHeight + 'px', 'width': viewWidth + 'px' });

                // Insert the box in to the body
                $('body').append('<div class="notably-box"><div class="notably-content"></div></div>');

                // Position the box and insert content
                $('.notably-box').css({ 'top': top, 'left': left });
                $('.notably-box .notably-content').html(content);

                // Include an arrow and display hidden content
                $('.notably-box').prepend('<span class="up-arrow"></span>');
            }

            // Remove box into the DOM
            function removeBox(backdrop, box) {
                $(backdrop).remove();
                $(box).remove();
            }

            // Display the box when the element is clicked
            function initiate(el, content) {
                $(el).click(function () {
                    createBox(content);

                    $(window).resize(function () {
                        var position = $(el).offset(), top = position.top, left = position.left - 225;
                        $('.notably-box').css({ 'top': top, 'left': left });
                    });

                    $('.notably-backdrop').click(function () {
                        removeBox(this, $('.notably-box'));
                    });
                });
            }


        });


    };

}(jQuery));
(function ($) {
    $.fn.passwordMeter = function (options) {
        /// <summary>
        ///     Displays a password strength meter.
        /// </summary>
        /// <param name="options" type="Object" optional="false">
        ///     <para>monitor: '[selector]'</para>
        /// </param>

        var settings = {};

        // extend the default settings using the passed-in options
        if (options) {
            $.extend(settings, options);
        }

        // make sure "monitor" was passed in as an option
        if (!settings.monitor) {
            throw new Error('passwordMeter plugin: "monitor" parameter is mandatory');
        }

        return this.each(function () {
            var $self = $(this);

            $(settings.monitor).on('keyup.passwordMeter', function () {
                var password = $(this).val(),
                    strength,
                    color;

                if (password.length > 0) {
                    strength = _passwordStrength(password);
                    switch (strength) {
                        case 1:
                            $self.find('.strength')
                                .filter('.good,.strong').hide()
                                .end()
                                .filter('.weak').show();
                            color = 'red';
                            break;
                        case 2:
                            $self.find('.strength')
                                .filter('.weak,.strong').hide()
                                .end()
                                .filter('.good').show();
                            color = 'orange';
                            break;
                        case 3:
                            $self.find('.strength')
                                .filter('.weak,.good').hide()
                                .end()
                                .filter('.strong').show();
                            color = 'green';
                            break;
                    }

                    // adjust the meter's width and color
                    $self.find('.meter').css({
                        width: Math.round($self.innerWidth() / 3) * strength,
                        backgroundColor: color
                    });

                    // show the password meter
                    $self.filter(':hidden').show();
                } else {
                    // hide the password meter if the password field is emtpy
                    $self.hide();
                }
            });
        });

        // helper function, returns the password's strength
        function _passwordStrength(password) {
            var strength = 0,
                score = 0,
                shortPassLength = 7,
                base = {
                    Excess: 0,
                    Upper: 0,
                    Numbers: 0,
                    Symbols: 0
                },
                bonus = {
                    Excess: 3,
                    Upper: 4,
                    Numbers: 5,
                    Symbols: 5,
                    Combo: 0
                },
                penalty = {
                    FlatLower: 0,
                    FlatNumber: 0
                },
                i;

            // analyze the password, count uppercase letters, numbers and symbols
            for (i = 0; i < password.length; i = i + 1) {
                if (password[i].match(/[A-Z]/)) { base.Upper = base.Upper + 1; }
                if (password[i].match(/[0-9]/)) { base.Numbers = base.Numbers + 1; }
                if (password[i].match(/([!,@,#,$,%,\^,&,*,?,_,~])/)) { base.Symbols = base.Symbols + 1; }
            }

            // give some points for long passwords
            base.Excess = password.length - shortPassLength;

            if (base.Upper && base.Numbers && base.Symbols) {
                // give a bonus for passwords that contain uppercase letters and numbers and symbols
                bonus.Combo = 25;
            } else if ((base.Upper && base.Numbers) ||
                       (base.Upper && base.Symbols) ||
                       (base.Numbers && base.Symbols)) {
                // give a smaller bonus for passwords that contain any pair
                // of uppercase letters, numbers and symbols
                bonus.Combo = 15;
            }

            // penalize passwords that only contain lowercase letters
            if (password.match(/^[\sa-z]+$/g)) {
                penalty.FlatLower = 15;
            }

            // penalize passwords that only contain numbers
            if (password.match(/^[\s0-9]+$/g)) {
                penalty.FlatNumber = 35;
            }

            score = base.Excess * bonus.Excess +
                    base.Upper * bonus.Upper +
                    base.Numbers * bonus.Numbers +
                    base.Symbols * bonus.Symbols +
                    bonus.Combo - penalty.FlatLower - penalty.FlatNumber;

            if (score <= 30) {
                strength = 1;
            } else if (score > 30 && score <= 70) {
                strength = 2;
            } else {
                strength = 3;
            }

            return strength;
        }
    };
}(jQuery));
(function ($) {
    $.fn.placement = function (options) {
        /// <summary>
        ///     Place elements on the page, relative to the offset parent, other elements on the page or the window.
        /// </summary>
        /// <param name="options" type="Object" optional="true">
        ///     <para>my: 'left|center|right top|center|bottom'</para>
        ///     <para>at: 'left|center|right top|center|bottom'</para>
        ///     <para>of: '[selector]'|[DOMElement]</para>
        ///     <para>offset: '[x-offset] [y-offset]'</para>
        ///     <para>slide: true|false</para>
        /// </param>

        var $collection = this,
            hPositions = /left|center|right/,
            vPositions = /top|center|bottom/,
            settings = {
                my: 'left top',
                at: 'left top',
                of: 'parent',
                offset: '0 0',
                slide: false
            },
            i;

        // adjust defaultSettings when the target element is 'window' and
        // when only 'at:center' is provided by defaulting to 'center'
        if (options && ((options.of && options.of === 'window') || (!options.my && options.at && options.at === 'center'))) {
            $.extend(settings, { my: 'center' });
        }

        // extend the default settings using the passed-in options
        if (options) {
            $.extend(settings, options);
        }

        // remove commas between values
        $.each(['my', 'at', 'offset'], function () {
            settings[this] = settings[this].replace(/\s*,\s*/g, ' ');
        });

        // force 'my' and 'at' to have valid horizontal and veritcal positions;
        // if a value is missing or invalid, it will be converted to 'center'.
        $.each(['my', 'at'], function () {
            var temp = settings[this].split(' ');

            if (temp.length === 1) {
                temp = hPositions.test(temp[0]) ? temp.concat(['center']) : vPositions.test(temp[0]) ? ['center'].concat(temp) : ['center', 'center'];
            }

            temp[0] = hPositions.test(temp[0]) ? temp[0] : 'center';
            temp[1] = vPositions.test(temp[1]) ? temp[1] : 'center';
            settings[this] = temp;
        });

        // make sure offset has some sane values
        settings.offset = (settings.offset.split(' ')) || [0, 0];

        for (i = 0; i < settings.offset.length; i = i + 1) {
            settings.offset[i] = parseInt(settings.offset[i], 10);
        }

        if (settings.offset.length === 1) {
            settings.offset = settings.offset.concat([0]);
        }

        return this.each(function () {
            var $self = $(this),
                placement = _computePlacement($self),
                topLimit;

            if (settings.of === window || settings.of === 'window') {
                $self.css({
                    position: 'fixed',
                    left: placement.left,
                    top: placement.top
                });
            } else {
                $self.offset(placement);

                // keep on the screen when scrolling and 'slide' is true
                if (settings.slide) {
                    topLimit = $self.offset().top;

                    $(window).on('scroll.placement', payza.util.debounce(function () {
                        var topOffset = $(window).scrollTop() + 20 - topLimit;

                        topOffset = topOffset > 0 ? topOffset : 0;
                        $self.stop().animate({
                            top: topOffset
                        });
                    }));
                }
            }
        });

        // helper function: computes element offset (takes its width and height into consideration as well)
        function _computePlacement($element) {

            var placement = { 'left': 0, 'top': 0 },  // start at the top-left of the screen
                elementWidth = $element.outerWidth(),    // get element's dimensions
                elementHeight = $element.outerHeight(),
                targetElement,
                targetWidth,
                targetHeight,
                targetOffset;

            // figure out what the target element is
            if (settings.of === 'window') {
                targetElement = window;
            } else if (settings.of === 'document') {
                targetElement = document;
            } else if (settings.of === 'parent') {
                targetElement = $element.parent().get(0);
            } else {
                targetElement = $(settings.of).get(0);
            }

            // adjust position based on my:center/right/bottom ('left' doesn't need adjustment)
            switch (settings.my[0]) { // horizontal
                case 'center':
                    placement.left -= Math.floor(elementWidth / 2);
                    break;
                case 'right':
                    placement.left -= elementWidth;
                    break;
            }

            switch (settings.my[1]) { // vertical
                case 'center':
                    placement.top -= Math.floor(elementHeight / 2);
                    break;
                case 'bottom':
                    placement.top -= elementHeight;
                    break;
            }

            if (targetElement === window) {
                targetWidth = $(window).width();
                targetHeight = $(window).height();
            } else {
                targetWidth = $(targetElement).innerWidth();
                targetHeight = $(targetElement).innerHeight();
            }

            // adjust position relative to target based on at:center/right/bottom ('left' doesn't need adjustment)
            switch (settings.at[0]) { // horizontal
                case 'center':
                    placement.left += Math.floor(targetWidth / 2);
                    break;
                case 'right':
                    placement.left += targetWidth;
                    break;
            }

            switch (settings.at[1]) { // vertical
                case 'center':
                    placement.top += Math.floor(targetHeight / 2);
                    break;
                case 'bottom':
                    placement.top += targetHeight;
                    break;
            }

            // adjust position based on the target offset
            if (targetElement === document) {
                placement.left -= $(window).scrollLeft();
                placement.top -= $(window).scrollTop();
            } else if (targetElement !== window) {
                targetOffset = $(targetElement).offset();
                placement.left += targetOffset.left;
                placement.top += targetOffset.top;
            }

            // add offsets to the mix (they come in as strings so parse them)
            placement.left += parseInt(settings.offset[0], 10);
            placement.top += parseInt(settings.offset[1], 10);

            // make sure coordonates are nice round numbers
            placement.left = Math.floor(placement.left);
            placement.top = Math.floor(placement.top);

            return placement;
        }

        // helper function: slide the element into position
        function _slideIntoPosition($element) {
            $element.filter(':visible').each(function () {
                var $self = $(this),
                    oldPlacement = $self.offset(),
                    newPlacement = _computePlacement($self),
                    horizontalTravel = newPlacement.left - oldPlacement.left,
                    verticalTravel = newPlacement.top - oldPlacement.top;

                $self.stop().animate({
                    left: parseInt($self.css('left').replace(/px/g, ''), 10) + horizontalTravel,
                    top: parseInt($self.css('top').replace(/px/g, ''), 10) + verticalTravel
                });
            });
        }
    };
}(jQuery));
(function ($) {
    $.fn.nav = function () {
        var $item = $(this), $trigger = $item.find('> a').addClass('trigger'), $subMenu = $item.find('> ul').addClass('sub-menu');

        // Inserts an arrow if sub-menu exists
        if ($item.find('ul')) {
            $trigger.append('<span class="icon-16 icn-arrow icon-only"><span class="icn" /><span class="icn-txt">More</span></span>');
        }

        return this.each(function () {
            var $menu = $(this).find('.sub-menu'), $link = $(this).find('.trigger');

            $link.click(function (event) { event.preventDefault(); });

            $(this).mouseenter(function () {
                $menu.show();
                $link.addClass('selected');
            }).mouseleave(function () {
                $menu.hide();
                $link.removeClass('selected');
            });

        });
    };

}(jQuery));
(function ($) {
    $.fn.tooltip = function () {
        return this.each(function () {
            var txt = $(this).attr('title');

            $(this).mouseover(function () {
                var position = $(this).offset(), top = position.top + 20, left = position.left + 20;
                /* 1. Create the tooltip box and insert into the body tag.
                2. Insert the text in the box. 
                3. Position the box in the document 
                4. Remove the value of the title attribute to keep it from showing. */
                $('body').append('<div class="tip-box"></div>');
                $('.tip-box').html(txt).css({ 'top': top, 'left': left });
                $(this).attr('title', '');
            }).mouseout(function () {
                /* 1. Remove the tip-box in the body. 
                2. Put back the value of the title attribute so that it can be retrieved again in the next mouse over. */
                $('.tip-box').remove();
                $(this).attr('title', txt);
            }).mousemove(function (event) {
                var top = event.pageX + 20, left = event.pageY + 20;
                $('.tip-box').css({ 'top': left, 'left': top });
            });

        });
    };

}(jQuery));