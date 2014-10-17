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