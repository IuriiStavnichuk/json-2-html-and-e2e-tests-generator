


    $(document).ready(function () {

        // Manipulate text with icons and insert ui-icon
        var icon16 = $('.icon-16');
        insertIcon(icon16, 'icn', 'icn-txt');

        var flag16 = $('.flag-16');
        insertIcon(flag16, 'icn', 'icn-txt');

        var icon24 = $('.icon-24');
        insertIcon(icon24, 'icn', 'icn-txt');

        var icon36 = $('.icon-36');
        insertIcon(icon36, 'icn', 'icn-txt');

        function insertIcon(icons, icn_class, icn_txt_class) {
            for (var i = 0; i < icons.length; i++) {
                var icn_txt = $(icons[i]).text();
                $(icons[i]).attr('title', icn_txt);
                $(icons[i]).html('<span class="' + icn_class + '"/><span class="' + icn_txt_class + '">' + icn_txt + '</span>');
            }
        }
        // -----

        // Inserts an icon to the country selected in a select
        var countrySelect = $('.select-country select');
        countrySelect.each(function () {
            var selectedCountry = $(this).find('option[selected]'), countryName = $(selectedCountry).text(), countryPrefix = $(selectedCountry).attr('data-prefix'),
                countryContainer = $(this).parent();
            countryContainer.append('<span class="flag-16 fl-' + countryPrefix + ' icon-only" title="' + countryName + '"><span class="icn"></span><span class="icn-txt">' + countryName + '</span></span>');
        });
        // -----

        // Initiate Notably plugin to form fields
        var info = $('.field-notably');
        info.each(function () {
            var label = $(this).parent().find('label, .field-label');

            label.append('<span class="icon-16 icn-info icon-only notably-trigger" title="Note"><span class="icn"></span><span class="icn-txt">Note</span></span>');
            label.find('.icn-info').notably({
                'contentContainer': $(this)
            });

        });
        // --


    });

