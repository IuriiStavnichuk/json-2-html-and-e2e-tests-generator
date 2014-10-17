var demo = angular.module( "Demo", [] );

demo.controller(
    "DemoController",
    function( $scope ) {


        $scope.fields = [
            {
                group: "Info",
                title: "Name",
                value: "Your name",
                type:  "i"
            },
            {
                group: "Info",
                title: "E-mail",
                value: "email@yourdomen.com ",
                type:  "i"
            },
            {
                group: "Info",
                title: "Phone",
                value: "***********",
                type:  "i"
            },
            {
                group: "Boys",
                title: "Height",
                value: "2",
                type:  "s"
            },
            {
                group: "Boys",
                title: "Pants size",
                value: "2",
                type:  "s"
            }
        ];

    }
);