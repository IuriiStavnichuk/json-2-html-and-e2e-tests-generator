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