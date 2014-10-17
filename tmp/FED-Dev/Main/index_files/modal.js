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