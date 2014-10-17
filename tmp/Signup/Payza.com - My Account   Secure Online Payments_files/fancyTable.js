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