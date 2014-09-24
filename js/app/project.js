MainWebApp.controller('MainCtrl', function ($scope, $rootScope, $timeout, $http) {

    (function resourceInit () {
        $scope.resource = {};
        $scope.resource.salutationId = {};
        $scope.resource.firstName = {};
        $scope.resource.customerAge = {};
        $scope.resource.customerEmail = {};
        $scope.resource.salutationId.title = "Salutation";
        $scope.salutationList = [
            {"id": 0, "name": "---"},
            {"id": 1, "name": "Mr."},
            {"id": 2, "name": "Mrs."},
            {"id": 3, "name": "Ms."},
            {"id": 4, "name": "Dr."}
        ];
//        $scope.resource.firstName.successMessage = "successMessage test";
        $scope.resource.firstName.errorMessage = "errorMessage test";
        $scope.resource.firstName.label = "First name";
//        $scope.resource.secondName.successMessage = "Second name successMessage";
        $scope.resource.customerAge.errorMessage = "Age errorMessage";
        $scope.resource.customerAge.label = "Age";
        $scope.resource.customerEmail.errorMessage = "Email errorMessage";
        $scope.resource.customerEmail.label = "Email";
    })();

    $scope.showMessage=function(id,errorType,errorMessage){
        console.log ("id>>>", id);
        var messageElement = angular.element(
                '<div class="row message-element">' +
                '    <div class="col-sm-12">' +
                '       <div class="alert '+errorType+'">' +
                '           <span id="'+errorType+'-'+id+'">'+errorMessage+'</span>' +
                '       </div>' +
                '    </div>' +
                '</div>'
        );

        var parentElement = $('#'+id).closest('.row');
        console.log ("$('#'+id).closest('.row')>>>", $('#'+id).closest('.row'));
        $(messageElement).insertBefore( parentElement[0]);
    };

    $scope.submitData=function(){
        angular.element(".row.message-element").remove();

        angular.element(".row .ng-invalid").each(function() {
            var idOfElementWithMessage = $(this).attr("id");
            var message, typeOfMessage = 'alert-error';
            switch (typeOfMessage) {
                case "alert-success":
                    if(typeof $scope.resource[idOfElementWithMessage]!=="undefined") message =$scope.resource[idOfElementWithMessage].successMessage;
                case "alert-error":
                    if(typeof $scope.resource[idOfElementWithMessage]!=="undefined") message =$scope.resource[idOfElementWithMessage].errorMessage;
            }
            $scope.showMessage(idOfElementWithMessage, typeOfMessage, message);
        });
        //var elementsWithInvalidClass=angular.element("#firstName")
        //   console.log ("elementsWithInvalidClass >>>", elementsWithInvalidClass);
        //   for (var i=0; i<elementsWithInvalidClass.length;i++) {
        //  console.log ("i >>>", i);
        // console.log ("elementsWithInvalidClass [i]>>>", elementsWithInvalidClass[i]);
        // curObj=elementsWithInvalidClass[i];
        // console.log ("id>>>", curObj.attr('id'));
        //  var idOfElementWithMessage = elementsWithInvalidClass[i].attr('id');
        //                var message, typeOfMessage = 'alert-error';
        //                switch (typeOfMessage) {
        //                    case "alert-success":
        //                        message = $scope.resource[idOfElementWithMessage].successMessage;
        //                    case "alert-error":
        //                        message = $scope.resource[idOfElementWithMessage].errorMessage;
        //                }
        //                $scope.showMessage(idOfElementWithMessage, typeOfMessage, message);
        //   }
    }

});

