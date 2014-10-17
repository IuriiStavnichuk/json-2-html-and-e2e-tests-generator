angular.module('payza.donutChart',[])
    .directive("donutChart", function ( $timeout, jsonServiceDonutChart1, $http, $resource ) {
        return {
            restrict: "E",
            replace:true,
            scope:{
                pathToJson:'='
            },
            template: '<div class="donut-chart">' +
                '<div id="{{donutChartId}}"></div>' +
                '<div class="donut-chart-title">{{title}}</div>' +
                '<div><span class="donut-chart-total-amount">{{totalamount}}</span><span class="donut-chart-unit">{{unit}}</span></div> ' +
                '</div>   ',
            link: function postLink( $scope ) {
                $resource ($scope.pathToJson).get(function (data) {
                    $scope.donutChartId="donutchart1"
                    //$scope.donutChartId="donutchart"+data.donutChartId;


                    var i=data.donutChartId
                    //var i="1"
                    //console.log("json", data.donutChartId);
                    console.log(" typeof i >>", typeof i)
                    console.log(" i >>", i)
                    var donutChartId_="#donutchart"+i ;
                    //var donutChartId_="#donutchart1";
                    console.log("typeOf donutChartId_>>", typeof donutChartId_)
                    console.log("donutChartId_>>", donutChartId_)


                    $scope.title=data.result[0].title;
                    $scope.totalamount=data.result[0].preSymbol+data.result[0].totalamount+data.result[0].currency;
                    $scope.unit='/'+data.result[0].unit;

                    // data = data.result[0].totalamount-data.result.amount;
                    var chartData=[
                        {'name': 'amount1','value': data.result[0].amount},
                        {'name': 'amount2','value': data.result[0].totalamount-data.result[0].amount}
                    ]
                    var width = 84,
                        height = 84,
                        radius = Math.min(width, height) / 2;

                    var color = d3.scale.ordinal()
                        .range(["#f04d4d", "#e7eaf0"]);

                    var arc = d3.svg.arc()
                        .outerRadius(radius - 79)
                        .innerRadius(radius - 84);

                    var pie = d3.layout.pie()
                        .sort(null)
                        .value(function(d) { return d.value; });
                    console.log(" donutChartId_22222 >>", donutChartId_)

                    var svg = d3.select(donutChartId_).append("svg")
//                    var svg = elem.find(donutChartId_).append("svg")
                        .attr("width", width)
                        .attr("height", height)
//                            .attr("class", "donut-chart")
                        .append("g")
                        .attr("transform", "translate(" + radius + "," + height / 2 + ")");

                    //d3.csv("data.csv", function(error, data) {
                    //        data.forEach(function(d) {
                    //              //d.value = +d.value;
                    //        });
                    //var allText=svg.append("text")
                    svg.append("text")
                        .style("fill-opacity", 0 )
                        .attr("class", "textGroup")
                        .attr("dx", "0")
                        .attr("dy", "3")
                        .style("text-anchor", "middle")
                        .attr("class", "donut-chart-svg-text")
                        .text(data.result[0].preSymbol + data.result[0].amount+data.result[0].postSymbol )
                        .transition()
                        .delay(1800)
                        .duration(1200)
                        .style("fill-opacity", 1 )
                    ;
                    var g = svg.selectAll(".arc")
                        .data(pie(chartData))
                        .enter().append("g")
                        .attr("class", "donut-chart-arc");

                    g.append("path")
                        //.attr("d", arc)
                        .style("fill", function(d) { return color(d.data.name); })
                        .transition()
                        .duration(2000)
                        .delay(function(d, i) {return i * 50; })
                        .attrTween("d", tweenPie)


                    function tweenPie(b) {
                        var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
                        return function(t) {
                            return arc(i(t));
                        };
                    }
                });

                //},80);
                //});
            }
        };
    })
;