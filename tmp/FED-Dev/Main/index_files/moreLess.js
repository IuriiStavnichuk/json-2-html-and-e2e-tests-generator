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