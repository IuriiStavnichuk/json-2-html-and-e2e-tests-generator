
var demo = angular.module( "Demo", [] );

demo.controller(
    "DemoController",
    function( $scope ) {

        $scope.notSorted = function(obj){
            console.log ("obj>>>", obj);
            if (!obj) {
                return [];
            }
            console.log ("notSortedkeys>>>",Object.keys(obj));
            return Object.keys(obj);
        }

        $scope.source=

        {
            2:
                [
                    {
                        id: 111,
                        name: "www.example1.com",
                        isEnabled: true
                    },
                    {
                        id: 222,
                        name: "www.example2.com",
                        isEnabled: true
                    }
                ]
            ,
            1:
                [
                    {
                        id: 333,
                        name: "www.example3.com",
                        isEnabled: false
                    },
                    {
                        id: 444,
                        name: "www.example4.com",
                        isEnabled: false
                    }
                ],
            4:
                [
                    {
                        id: 555,
                        name: "www.example5.com",
                        isEnabled: false
                    },
                    {
                        id: 666,
                        name: "www.example6.com",
                        isEnabled: false
                    }
                ]

        }

        $scope.test=
        [
            {
                name:"Products",
                id:2,
                data:
                    [
                        {
                            id: 111,
                            name: "www.example0.com",
                            isEnabled: true
                        },
                        {
                            id: 222,
                            name: "www.example1.com",
                            isEnabled: true
                        }
                    ]
            }
            ,
           {
                name:"Services",
                id:1,
               data:
                    [
                        {
                            id: 333,
                            name: "www.example2.com",
                            isEnabled: false
                        },
                        {
                            id: 444,
                            name: "www.example3.com",
                            isEnabled: false
                        }
                    ]
             }
            ,
            {
                name:"Products and services",
                id:4,
                data:
                    [
                        {
                            id: 555,
                            name: "www.example4.com",
                            isEnabled: false
                        },
                        {
                            id: 666,
                            name: "www.example5.com",
                            isEnabled: false
                        }
                    ]
            }
        ]

//      convertor

        $scope.value=[];
        arrayWithKeys=Object.keys($scope.source);

        for (var i in arrayWithKeys) {

            var obj={};
            var keyName=arrayWithKeys[i];
            obj.id=keyName;

            switch (keyName) {
                case "1":
                    obj.name="Services";
                    break;
                case "2":
                    obj.name="Products";
                    break;
                case "4":
                    obj.name="Products and services"
                    break;
            }

            obj.data=$scope.source[keyName];

            $scope.value.push(obj);

        }

    }
);