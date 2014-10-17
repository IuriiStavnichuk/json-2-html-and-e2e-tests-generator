
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
angular.module('UI').directive('tooltip', ['$parse', function ($parse) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            var buffer;

            element.bind('mouseover', function () {
                var position = $(this).offset(), top = position.top + 20, left = position.left + 20;
                buffer = buffer || '' + attrs.title;

                /* 1. Create the tooltip box and insert into the body tag.
                2. Insert the text in the box. 
                3. Position the box in the document 
                4. Remove the value of the title attribute to keep it from showing. */

                $('body').append('<div class="tip-box"></div>');
                $('.tip-box').html(buffer).css({ 'top': top, 'left': left });
                element.attr('title', '');
            }).bind('mouseout', function () {
                /* 1. Remove the tip-box in the body. 
                2. Put back the value of the title attribute so that it can be retrieved again in the next mouse over. */
                $('.tip-box').remove();
                element.attr('title', buffer);
            }).bind('mousemove', function (event) {
                var top = event.pageX + 20, left = event.pageY + 20;
                $('.tip-box').css({ 'top': left, 'left': top });
            });
        }
    };
}]);

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