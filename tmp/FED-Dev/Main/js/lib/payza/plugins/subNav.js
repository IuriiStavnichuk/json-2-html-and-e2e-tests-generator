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