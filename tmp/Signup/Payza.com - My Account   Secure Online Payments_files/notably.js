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