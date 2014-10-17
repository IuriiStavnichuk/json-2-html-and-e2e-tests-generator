var demo = angular.module( "Demo", [] );

demo.directive("payzaForm", function ($compile) {
    return {
        restrict: "E",
        replace:true,
        transclude: true,
        compile: function($scope, element, attrs) {

            return function($scope, element, attrs) {
                $scope.template="";$scope.id=0;
                for (var i in $scope.answers){
                    $scope.id++;
                    $scope.template=$scope.template+'<h5>'+$scope.answers[i].level1[0].title+'</h5>\n<fieldset>\n';

                    for (var ii in $scope.answers[i].level1[0].level2){

                        $scope.id++;
                        $scope.title=$scope.answers[i].level1[0].level2[ii].title;
                        $scope.visibility=$scope.answers[i].level1[0].level2[ii].visibility;
                        $scope.template=$scope.template+'<div class="field radio-check-field" ' +
                            (typeof $scope.visibility!== 'undefined' ?  ' ng-show='+$scope.visibility+'':'' )+' >'+
                            (typeof $scope.title!== 'undefined' ?  '<p>'+$scope.title+'</p>\n':'' );

                        for (var iii in $scope.answers[i].level1[0].level2[ii].level3){
                            $scope.id++;

                            $scope.type=$scope.answers[i].level1[0].level2[ii].level3[iii].type;
                            $scope.model=$scope.answers[i].level1[0].level2[ii].level3[iii].model;
                            $scope.title=$scope.answers[i].level1[0].level2[ii].level3[iii].title;
                            $scope.value=$scope.answers[i].level1[0].level2[ii].level3[iii].value;
                            $scope.modelsForHiding=$scope.answers[i].level1[0].level2[ii].level3[iii].modelsForHiding;
                            //$scope.visibility=$scope.answers[i].level1[0].level2[ii].level3[iii].visibility;

                            $scope.generateElement($scope.type);

                            $scope.template=$scope.template+$scope.element;
                        }
                        $scope.template=$scope.template+'</div>\n';

                    }
                    $scope.template=$scope.template+'<hr>\n</fieldset>\n';
                }
                $scope.template=angular.element($scope.template);

                element.append($scope.template);
                var templateFn = $compile($scope.template);
                templateFn($scope);
            }
        }
    };
})

demo.controller( "DemoController", function( $rootScope, $scope ) {

    $scope.generateElement=function (type){
        switch (type) {
            case "radioCheckItem":
                $scope.element=
                    "<div class='radio-check-item inline'>\n"+
                        "<input type='radio' " +
                        (typeof $scope.model!== 'undefined' ?  'ng-model='+$scope.model+'':'' )+
                        (typeof $scope.value!== 'undefined' ?  ' value='+$scope.value+'':'' )+
                        (typeof $scope.modelsForHiding!== 'undefined' ?  ' ng-click='+$scope.modelsForHiding+'':'' )+
  //                      for (var i in $scope.modelsForHiding){}
                        //(typeof $scope.modelsForHiding!== 'undefined' ?  ' ng-click="turnModelsToFalse('+$scope.modelsForHiding+')"':'' )+
                        //(typeof $scope.visibility!== 'undefined' ?  ' ng-show='+$scope.visibility+'':'' )+        (typeof $scope.modelsForHiding!== 'undefined' ?  ' ng-click="$scope.turnModelsToFalse('+$scope.modelsForHiding+')"':'' )+
                        (typeof $scope.id!== 'undefined' ?  ' id='+$scope.id+'':'' )+
                        ">\n<label"+
                        (typeof $scope.id!== 'undefined' ?  ' for='+$scope.id+'>':'' )+
                        (typeof $scope.title!== 'undefined' ?  $scope.title:'' )+
                        "</label>\n"+
                        "</div>\n"
                break;
            case "checkBoxItem":
                $scope.element=
                    "<div class='radio-check-item inline'>\n"+
                        "<input type='checkbox' " +
                        (typeof $scope.model!== 'undefined' ?  'ng-model='+$scope.model+'':'' )+
                        (typeof $scope.value!== 'undefined' ?  ' value='+$scope.value+'':'' )+
                        //(typeof $scope.visibility!== 'undefined' ?  ' ng-show='+$scope.visibility+'':'' )+
                        (typeof $scope.id!== 'undefined' ?  ' id='+$scope.id+'':'' )+
                        ">\n<label"+
                        (typeof $scope.id!== 'undefined' ?  ' for='+$scope.id+'>':'' )+
                        (typeof $scope.title!== 'undefined' ?  $scope.title:'' )+
                        "</label>\n"+
                        "</div>\n"
                break;
            case "selectItem":
                $scope.element=
                    "<div class='field'>\n"+
                        "<select"+
                        (typeof $scope.model!== 'undefined' ?  ' ng-model='+$scope.model+'':'' )+
                        (typeof $scope.value!== 'undefined' ?  ' ng-options=\"v as o for (o,v) in '+$scope.value+'\" ':'' )+
                        "><option value=''>Select</option></select>"+
                        "</div>\n"
                break;
            case "textItem":
                $scope.element=
                    "<div class='field'>\n"+
                        "<input type='text'"+
                        (typeof $scope.model!== 'undefined' ?  'ng-model='+$scope.model+'':'' )+
                        (typeof $scope.value!== 'undefined' ?  ' ng-model='+$scope.value+'':'' )+
                        (typeof $scope.id!== 'undefined' ?  ' id='+$scope.id+'':'' )+
                        (typeof $scope.tabindex!== 'undefined' ?  ' tabindex='+$scope.tabindex+'':'' )+
                        ">\n</div>\n"
        }
    }

    $rootScope.answers=[
        { level1: [
            { title:"Introduction section", visibility:1,
                level2:[
                    { title:"Do you have a website for this business?",
                        level3:[
                            { type:"radioCheckItem", model:"logic.isSite", title: "Yes", value: true},                  // LOGIC
                            { type:"radioCheckItem", model:"logic.isSite", title: "No", value: false, modelsForHiding:"logic.noBusinessModel=false;logic.isMemberArea=false"}
                        ]
                    },
                    { title:"Please provide your website address:", visibility:"logic.isSite",
                        level3:[
                            { type:"textItem", model:"info.url.value"}
                        ]
                    },
                    { title:"Does this website fall under the same business model and product/service as?", visibility:"logic.isSite",
                        level3:[
                            { type:"selectItem", model:"info.businessModel.value", value: "{ site1.com:1, site2.com:2, site3.com:3}", visibility:1}
                        ]
                    },
                    { visibility:"logic.isSite",
                        level3:[
                            { type:"radioCheckItem", model:"logic.noBusinessModel", title: "Yes", value: false, modelsForHiding:"logic.isMemberArea=false"},        // LOGIC
                            { type:"radioCheckItem", model:"logic.noBusinessModel", title: "No", value: true}
                        ]
                    },
                    {title:"What sort of business do you conduct?", visibility:"logic.noBusinessModel",
                        level3:[
                            { type:"radioCheckItem", model:"info.sortOfBusiness.value", title: "I sell products", value: "1"} ,
                            { type:"radioCheckItem", model:"info.sortOfBusiness.value", title: "I offer services", value: "2"},
                            { type:"radioCheckItem", model:"info.sortOfBusiness.value", title: "I sell products and offer services", value: "3"}
                        ]
                    },
                    {title:"Do you own and control the website?", visibility:"logic.noBusinessModel",
                        level3:[
                            { type:"radioCheckItem", model:"info.special.value", title: "Yes", value: "1"} ,
                            { type:"radioCheckItem", model:"info.special.value", title: "No", value: "2"}
                        ]
                    },
                    {title:"Does your website have a members' area?", visibility:"logic.noBusinessModel",
                        level3:[
                            { type:"radioCheckItem", model:"logic.isMemberArea", title: "Yes", value: true},            // LOGIC
                            { type:"radioCheckItem", model:"logic.isMemberArea", title: "No", value: false}
                        ]
                    },
                    {title:"Please provide the necessary information to access the members' area:", visibility:"logic.isMemberArea",
                        level3:[
                            { type:"textItem", model:"info.access.value"}
                        ]
                    }
                ]
            }

        ]},
        { level1: [
            { title:"Product Information",
                level2:[
                    {title:"What is the average product price (USD)?",
                        level3:[
                            { type:"textItem", model:"info.url.price" }
                        ]
                    },
                    { title:"Which country is your product shipped from?",
                        level3:[
                            { type:"selectItem", model:"info.businessModel.value", value: "{ USA:1, CANADA:2, Brazil:3}"}
                        ]
                    },
                    {title:"How do you deliver the product?{{info}}",
                        level3:[
                            { type:"checkBoxItem", model:"info.deliverProduct.online.value", title: "Online", value: 1} ,
                            { type:"checkBoxItem", model:"info.deliverProduct.regularPost.value", title: "Regular Post", value: 2},
                            { type:"checkBoxItem", model:"info.deliverProduct.registeredMail.value", title: "Registered Mail", value: 3},
                            { type:"checkBoxItem", model:"info.deliverProduct.inPerson.value", title: "In person", value: 4}
                        ]
                    },
                    {title:"On average, how many days after the transaction is the product received by your customer?", visibility:1,
                        level3:[
                            { type:"textItem", model:"info.time.value" }
                        ]
                    },
                    {title:"The product you are selling is:",
                        level3:[
                            { type:"radioCheckItem", model:"info.product.value", title: "Manufactured by you", value: 1} ,
                            { type:"radioCheckItem", model:"info.product.value", title: "Personal property", value: 0}
                        ]
                    },
                    {title:"Are you an authorized distributor/supplier?",
                        level3:[
                            { type:"radioCheckItem", model:"info.special.value", title: "Yes", value: 1} ,
                            { type:"radioCheckItem", model:"info.special.value", title: "No", value: 0}
                        ]
                    }
                ]
            }

        ]}
    ]
});