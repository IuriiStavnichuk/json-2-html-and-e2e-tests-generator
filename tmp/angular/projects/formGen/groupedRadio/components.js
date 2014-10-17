var demo = angular.module( "Demo", [] );

demo.controller(
    "DemoController",
    function( $scope ) {

        $scope.notSorted = function(obj){
            console.log ("obj>>>", obj);
            if (!obj) {
                return [];
            }
            console.log (Object.keys(obj));
            return Object.keys(obj);
        }

        $scope.group_array=[
            { group: [
                { groupName:"Info", title: "Pants size",value: "2", type:  "input" },
                {                   title: "Pants size",value: "2", type:  "input" } ,
                {                   title: "Pants size",value: "2", type:  "input" } ,
                {                   title: "Pants size",value: "2", type:  "input" } ,
                {                   title: "Pants size",value: "2", type:  "select" } ] },
            { group: [
                { groupName:"Boy", title: "Pants size",value: "2", type:  "input" },
                {                  title: "Pants size",value: "2", type:  "input" } ,
                {                  title: "Pants size",value: "2", type:  "select" } ] },
            { group: [
                { groupName:"Men", title: "Pants size",value: "2", type:  "input" },
                {                  title: "Pants size",value: "2", type:  "input" } ,
                {                  title: "Pants size",value: "2", type:  "select" } ] }
        ]

//        $scope.value=
//            [
//                /* Products 2*/
//                {
//                    "Products":
//                        [
//                            {
//                                id: 111,
//                                name: "www.example.com",
//                                isEnabled: true
//                            },
//                            {
//                                id: 222,
//                                name: "www.example2.com",
//                                isEnabled: true
//                            }
//                        ]
//                }
//                ,
//
//                /* "Services 1" */
//                {
//                    "Services":
//                        [
//                            {
//                                id: 333,
//                                name: "www.example3.com",
//                                isEnabled: false
//                            },
//                            {
//                                id: 444,
//                                name: "www.example4.com",
//                                isEnabled: false
//                            }
//                        ]
//                }
//                ,
//
//                /* "Products and services" 4*/
//                {
//                    "Products and services":
//                        [
//                            {
//                                id: 555,
//                                name: "www.example5.com",
//                                isEnabled: false
//                            },
//                            {
//                                id: 666,
//                                name: "www.example6.com",
//                                isEnabled: false
//                            }
//                        ]
//                }
//
//            ]

        $scope.value=

        {

            /* Products */
            "2":
            [
                {
                    id: 111,
                    name: "www.example.com",
                    isEnabled: true
                },
                {
                    id: 222,
                    name: "www.example.com",
                    isEnabled: true
                }
            ]


            ,

                /* "Services" */
                "1":
            [
                {
                    id: 333,
                    name: "www.example.com",
                    isEnabled: false
                },
                {
                    id: 444,
                    name: "www.example.com",
                    isEnabled: false
                }
            ],

                /* "Products and services" */
                "4":
            [
                {
                    id: 555,
                    name: "www.example.com",
                    isEnabled: false
                },
                {
                    id: 666,
                    name: "www.example.com",
                    isEnabled: false
                }
            ]

        }





    }
);