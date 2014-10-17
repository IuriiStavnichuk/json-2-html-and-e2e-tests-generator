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
