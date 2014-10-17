$.fn.accordionForNg = function (options) {

    var $accordion = this,
        $headers,
        $contents,
        activeHeaderIndex,
        settings = {
            header: '.accordion-header',
            content: '.accordion-content',
            activeClass: 'active'
        };

    if (options) {
        $.extend(settings, options);
    }

    $headers = $accordion.find(settings.header);
    $contents = $accordion.find(settings.content);

    return this.each(function () {

        $contents.hide().first().show().last().show();
        $contents.last().show();

        activeHeaderIndex = 0;

        $headers.on('click', clickHandler );


        function clickHandler (event) {

            // if client validation not passed - TURN OFF server validation
            console.log(this.id);
            console.log("$(this).data(isValidated)111>>>", $(this).data("isPreviousSectionValidated"));
           // if($(this).scope().introductionSection.$invalid===true) {$(this).data("isPreviousSectionValidated", false) }
            console.log("$(this).data(isValidated)222>>>", $(this).data("isPreviousSectionValidated"));


            $("#introductionSectionTitle").data("isNotSectionFilledOut", $("#introductionSectionTitle").scope().introductionSection.$invalid);
            $("#productInformationTitle").data("isNotSectionFilledOut", $("#productInformationTitle").scope().introductionSection.$invalid);
            $("#salesInformationTitle").data("isNotSectionFilledOut", $("#salesInformationTitle").scope().productInformation.$invalid);
            $("#customerRelationsTitle").data("isNotSectionFilledOut", $("#customerRelationsTitle").scope().salesInformation.$invalid);
            $("#submitDocTitle").data("isNotSectionFilledOut", !$("#submitDocTitle").scope().info.urlFieldSupplierTypeId == 1);
            $("#submitButton").data("isNotSectionFilledOut", $("#customerRelationsTitle").scope().salesInformation.$invalid);

            console.log("$(this).data(isNotSectionFilledOut)>>>", $(this).data("isNotSectionFilledOut"));

            console.log("($(this).data(>>>", ($(this).data("isNotSectionFilledOut")==false)&&($(this).data("isPreviousSectionValidated")==true));

            if ( ($(this).data("isNotSectionFilledOut")===false))  {
            //if ( ($(this).data("isNotSectionFilledOut")===false)&&($(this).data("isPreviousSectionValidated")===true))  {

                $("#introductionSectionTitle").data( "isNotSectionFilledOut", false );

                var clickedHeaderIndex = $headers.index(this);

                if (event.preventDefault) { event.preventDefault(); }
                if (event.returnValue) { event.returnValue = false; }

                if ($headers.length === 2) {
                    $contents.slideToggle();
                    $headers.toggleClass(settings.activeClass);
                } else if (activeHeaderIndex !== clickedHeaderIndex) {
                    $contents.eq(activeHeaderIndex).slideUp();
                    $contents.eq(clickedHeaderIndex).slideDown();
                    $headers.eq(clickedHeaderIndex).addClass(settings.activeClass);
                    activeHeaderIndex = clickedHeaderIndex;
                }
            }
        };
    });
};