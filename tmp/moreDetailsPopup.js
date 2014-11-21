var moreDetailsPopup = function($compile) {
    // -----------------------------------
    // Link
    // -----------------------------------
    var link = function(scope, elem, attribs) {

       elem.bind("click", function() {

            var template =
                //Use $event.stopPropagation() stop the event propagation to children elements
                "<div id='more-details-popup-overlay' ng-click='$event.stopPropagation()'> \n"+
                "    <div class='more-details-popup-container'> \n"+
                "        <div class='more-details-popup'>{{moreDetailsPopupVisibility}} \n"+
                "            <div class='close-icon'  data-ng-click='removePopup()'></div> \n"+
                "            <div class='header'> \n"+
                "                <h5>{{game.GameName}} <span data-ng-bind='\"[\"+game.PlatformCode+\"]\"'></span></h5> \n"+
                "            </div> \n"+
                "        </div> \n"+
                "    </div> \n"+
                "</div>";

           console.log("test >>");

            elem.append(template);

            $compile(elem)(scope);

        });

        scope.removePopup=function(){

            var elementForRemove = document.getElementById("more-details-popup-overlay");

            //Remove element If it presents on the page
            if( elementForRemove!==null ) elementForRemove.parentNode.removeChild(elementForRemove);

        }

    }
    // -----------------------------------
    // Return
    // -----------------------------------
    return {
        restrict: "A",

        scope:true,

        replace: false,

        //template:" <div><ng-transclude></ng-transclude></div>",

        //templateUrl: "./src/app/common/components/moredetailspopup/moreDetailsPopup.tpl.html",

        link: link
    };
};


angular.module("directives.moreDetailsPopup", [])
    .directive("moredetailsPopup",  moreDetailsPopup)



