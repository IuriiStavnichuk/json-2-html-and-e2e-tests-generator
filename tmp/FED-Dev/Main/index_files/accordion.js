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