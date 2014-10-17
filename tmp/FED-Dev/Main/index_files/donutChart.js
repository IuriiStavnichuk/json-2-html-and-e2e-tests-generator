angular.module('payza.donutChart',[])
    .directive("donutChart", ['$http', '$resource', function ($http, $resource) {
        return {
            restrict: "E",
            replace:true,
            scope:{
                pathToJson:'='
            },
            link: function ($scope) {

                $resource($scope.pathToJson).get(function (data) {

                    function formatNumberWithTwoDecimalPlacesAlways(numberToFormat) {
                        return numberToFormat.toFixed(2);
                    }

                    function formatNumberWithTwoDecimalPlacesIfHasDecimals(numberToFormat) {
                        if (numberToFormat % 1 != 0) { // if number has decimals 
                            return formatNumberWithTwoDecimalPlacesAlways(numberToFormat);
                        }
                        else { // if number has no decimals 
                            return numberToFormat;
                        }
                    }

                    for (var i in data.Results) {
                        data.Results[i].CurrencyAbbreviation = data.Results[i].CurrencyAbbreviation  || '';
                        data.Results[i].CurrencySymbol = data.Results[i].CurrencySymbol  || '';
                        data.Results[i].TimeInterval = data.Results[i].TimeInterval  || '';
                        data.Results[i].Unit = data.Results[i].Unit  || '';

                        $scope.title = data.Results[i].Title;

                        var amountForDisplay;
                        var totalAmountForDisplay;
                        if (data.Results[i].CurrencySymbol !== '') { // if money 
                            amountForDisplay = formatNumberWithTwoDecimalPlacesAlways(data.Results[i].Amount);
                            totalAmountForDisplay = formatNumberWithTwoDecimalPlacesIfHasDecimals(data.Results[i].TotalAmount);
                        }
                        else { // if not money 
                            amountForDisplay = data.Results[i].Amount;
                            totalAmountForDisplay = data.Results[i].TotalAmount;
                        }

                        var amountText = data.Results[i].CurrencySymbol + amountForDisplay + ' ' + data.Results[i].Unit;

                        $scope.totalAmount = data.Results[i].CurrencySymbol + totalAmountForDisplay + ' ' + data.Results[i].CurrencyAbbreviation;
                        $scope.timeInterval=data.Results[i].TimeInterval;

                        var chartData=[
                            {'name': 'amount1','value': data.Results[i].Amount},
                            {'name': 'amount2','value': data.Results[i].TotalAmount-data.Results[i].Amount}
                        ];

                        function tweenPie(b) {
                            var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
                            return function (t) {
                                return arc(i(t));
                            };
                        }

                        var width = 220,
                            height = 84,
                            radius = Math.min(width, height) / 2;

                        var color = d3.scale.ordinal()
                            .range(["#f04d4d", "#e7eaf0"]);

                        var arc = d3.svg.arc()
                                .outerRadius(radius - 79)
                                .innerRadius(radius - 84)
                            ;

                        var pie = d3.layout.pie()
                            .sort(null)
                            .value(function(d) { return d.value; });
                        var svg = d3.select("donut-chart").append("svg")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("class", "donut-chart")
                            .append("g")
                            .attr("transform", "translate(" + radius + "," + height / 2 + ")");

                        svg.append("text")
                            .style("fill-opacity", 0)
                            .attr("dx", "0")
                            .attr("dy", "3")
                            .style("text-anchor", "middle")
                            .attr("class", "donut-chart-svg-text")
                            .text(amountText)
                            .transition()
                            .delay(1800)
                            .duration(1200)
                            .style("fill-opacity", 1 )
                        ;
                        svg.append("text")
                            .attr("dx", "52")
                            .attr("dy", "3")
                            .style("fill-opacity", 0 )
                            .attr("class", "donut-chart-title")
                            .text( $scope.title )
                            .transition()
                            .duration(1500)
                            .style("fill-opacity", 1 )
                        ;
                        var chartInfo=svg.append("text")
                                .attr("dx", "52")
                                .attr("dy", "21")
                            ;

                        chartInfo.append("tspan")
                            .attr("class", "donut-chart-total-amount")
                            .text( $scope.totalAmount )
                            .style("fill-opacity", 0 )
                            .transition()
                            .duration(1500)
                            .style("fill-opacity", 1 )
                        ;
                        chartInfo.append("tspan")
                            .attr("class", "donut-chart-unit")
                            .text( $scope.timeInterval + data.Results[i].Unit ) /* either "TimeInterval" or "Unit" is present; there should not be a case where both are present */
                            .style("fill-opacity", 0 )
                            .transition()
                            .duration(1500)
                            .style("fill-opacity", 1 )
                        ;

                        var g = svg.selectAll(".arc")
                            .data(pie(chartData))
                            .enter().append("g")
                            .attr("transform","rotate(180)")
                            .attr("class", "donut-chart-arc");

                        g.append("path")
                            .style("fill", function(d) { return color(d.data.name); })
                            .transition()
                            .duration(2000)
                            .delay(function(d, i) {return i * 50; })
                            .attrTween("d", tweenPie)
                        ;

                    }
                });
            }
        };
    }])

;