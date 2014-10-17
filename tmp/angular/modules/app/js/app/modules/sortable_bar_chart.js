d3.text("json/country.csv", function(error, data) {
    var parsedCSV= d3.csv.parseRows(data);
    var axis_x_name=parsedCSV[0][0]
    var axis_y_name=parsedCSV[0][1]

    for (var i=1;i<parsedCSV[0].length;i++){
        $('#label_field_choice_'+i).prop('innerHTML',parsedCSV[0][i]);
        $('#label_field_choice_'+i).css('visibility','visible');
        $('#radio_field_choice_'+i).css('visibility','visible');

    }

    var current_field=1;
    parsedCSV = parsedCSV.splice(1)         //delete first row
    var workingArray=parsedCSV.slice();     //create duplicate array

//<desc="INIT" editor-fold defaultstate="collapsed" >
//var x; var y;
var minValue=d3.min (workingArray, function(d) { return +d[current_field] });
var maxValue=d3.max (workingArray, function(d) { return +d[current_field] });
var margin = {top: 5, right: 0, bottom: 160, left: 25};
d3.chart_width=$("#wrapper").width();
d3.chart_height=($(document).height()/1.24) - margin.top - margin.bottom;

var svg = d3.select("#svgcontainer").append("svg")
.attr("id", "svg_")
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

$("#slider-range").slider({    //Slider reorder_array
        orientation: "vertical",
        min: minValue,
        max: maxValue,
        values: [ minValue, maxValue ],
        range: true,
        stop: function(event, ui) {
            $("input#sliderMinValue").val($("#slider-range").slider("values",0));
            $("input#sliderMaxValue").val($("#slider-range").slider("values",1));
            threshold ();
            // $('.bar').remove();
            $('.y').remove();
            $('.x_axis_text').remove();

            draw_svg ();
            reorder_array ();

        },
        slide: function(event, ui){  //Init first time
            $("input#sliderMinValue").val($("#slider-range").slider("values",0));
            $("input#sliderMaxValue").val($("#slider-range").slider("values",1));
        }
    });
$("input#sliderMinValue").val($("#slider-range").slider("values",0)); //Initialisation
$("input#sliderMaxValue").val($("#slider-range").slider("values",1));
$("#radio").buttonset();
$("#radio1").prop("checked",true);
$("#radio").change( reorder_array );
$("#radio_field_choice_1").prop("checked",true);
$(".radio_field_choice").change( field_choice );

draw_svg();
//</editor-fold>

function draw_svg () {

        $('#slider-range').css('height', d3.chart_height+1 +'px')
        $('#slider-range').css('left', 23 +'px')

        $('#svg_').attr("width", d3.chart_width)
        $('#svg_').attr("height", d3.chart_height + margin.top + margin.bottom)

        x = d3.scale.ordinal()
            .rangeBands([0, d3.chart_width], 0, 1);
        x.domain(workingArray.map(function(d) { return d[0]; }));

        y = d3.scale.linear()
            .range([d3.chart_height, 0]);
        y.domain([0, d3.max(workingArray, function(d) { return (+d[current_field]); })]);

        var yAxis = d3.svg.axis(0)
                .scale(y)
                .orient("right").ticks(6);
        ;

    yAxis.tickFormat(function (d) { return ''; });

        $(".axis").remove();

    var yAxis_=svg.append("g")
                .attr("class", "axis")
                .attr("transform","translate(0,0)")
                .attr("fill", "#555555")
                .call(yAxis)
                .append("text")
                .attr("id", "y_axis_text")
                .attr("transform", "rotate(-90)")
                .attr("x", -60)
                .attr("y", -18)
                .attr("dy", "0.81em")
                .style("text-anchor", "end")
                .text(axis_y_name)
/*                .on("mouseover", function(d) { d3.select(this).style("font-weight", "bold");})
                .on("mouseout",  function(d) { d3.select(this).style("font-weight", "normal");})
                .on("mousedown", function(d) {
                    var p = d3.svg.mouse(vis[0][0]);
                    downx = x.invert(p[0]);
                    downscalex = null;
                    downscalex = x.copy();})*/
        ;

    //d3.selectAll('text').text("7777");

    var colorScale = d3.scale.linear()
            .domain([d3.min (workingArray, function(d) { return +d[current_field]; }), d3.max (workingArray, function(d) { return +d[current_field]; })])
            .range([160, 60]);
        /*var colorScale = d3.scale.linear()
         .domain([0, d3.max (workingArray, function(d) { return d[current_field]; })])
         .range([#F6931F, #1C94C4]);*/
        $(".bar").remove();
        var bar= svg.selectAll(".bar")
                .data(workingArray)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) {return ( x(d[0])); })
                .attr("width", 4)
                .attr("fill", function(d) {return (d3.rgb(colorScale(d[current_field]),colorScale(d[current_field]),colorScale(d[current_field])))})
                .attr("y", function(d) { return ( y(d[current_field])); })
                .attr("height", function(d) { return (d3.chart_height - y(d[current_field])); })
                .on("mouseover", function(d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div .html(d[current_field])
                        .style("left", (x(d[0])+23)+"px" )
                        .style("top", (y(d[current_field])+34)+"px" );
                })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });

        ;
        $(".x_axis_text").remove();
        svg.selectAll(".x_axis_text")
                .data(workingArray)
                .enter().append("text")
                .attr("class", "x_axis_text")
                .attr("transform", function(d) { return "translate(" + (x(d[0])+4) + ", " + (d3.chart_height+3) + " ) rotate(-90)" })
                .attr("fill", "#545454")
                .text(function(d) {return (d[0]); })
        ;
    }
//console.log($(".tooltip").style("left"));
function field_choice() {
    current_field=$(this).prop('value');

    minValue=d3.min (workingArray, function(d) { return +d[current_field] });
    maxValue=d3.max (workingArray, function(d) { return +d[current_field] });

    $( "#slider-range" ).slider({
        min: minValue,
        max: maxValue,
        values: [ minValue, maxValue ]
    })

    $("input#sliderMinValue").val(minValue);
    $("input#sliderMaxValue").val(maxValue);

    draw_svg();
    reorder_array();

    $('#y_axis_text').text($('#label_field_choice_'+current_field).prop('innerHTML')); // change axis label

}

function sortByName(i,ii){
    if (i[0]  < ii[0])   return -1;
    else if (i[0] > ii[0])   return 1;
    else    return 2;
}

function sortByValue(i,ii) {
    i[1]=parseInt(i[1], 10);
    ii[1]=parseInt(ii[1], 10);
    if (i[1] < ii[1])   return 1;
    else if (i[1] > ii[1])   return -1;
    else  return 2;
}

function threshold () {
    workingArray.length=0;
    var thresholdMin = $("input#sliderMinValue").val();
    var thresholdMax = $("input#sliderMaxValue").val();
    for (var i=0;i<parsedCSV.length;i++){
        if ( +parsedCSV[i][current_field] >= thresholdMin && +parsedCSV[i][current_field] <= thresholdMax ) {
            workingArray.push(parsedCSV[i]);
        }
    }
}

function reorder_array() {

        var x0 = x.domain(workingArray.sort($("#radio2").prop('checked')
                    ? function(a, b) { return b[current_field] - a[current_field]; }
                    : function(a, b) { return d3.ascending(a[0], b[0]); })
                .map(function(d) { return d[0]; }))
            .copy();

        var transition = svg.transition().duration(700),
            delay = function(d, i) { return i * 20; }
            ;
        transition.selectAll(".bar")
            .delay(delay)
            .attr("x", function(d) { return x0(d[0]); })
        ;
        var transition = svg.transition().duration(0),
            delay = function(d, i) { return 0; }
            ;
        transition.selectAll(".x_axis_text")
            //.delay(delay)
            .attr("transform", function(d) { return "translate(" + (x0(d[0])+5) + ", " + (d3.chart_height+3) + " ) rotate(-90)" })
        ;
    }

$(window).resize(function() {

        clearTimeout($.data(this, 'resizeTimer'));
        $.data(this, 'resizeTimer', setTimeout(function() {

            d3.chart_width=$("#wrapper").width();
            d3.chart_height=$(document).height()/1.3 - margin.top - margin.bottom;

            draw_svg();

        }, 400));

    });


/*$('.ui-slider-handle').hover(function(e) {
    //y=$(this).offset().top+4;
    $("#dot_line").appendTo(this);
   // var y = e.pageY ;
   // $("#dot_line").css({left:0,top:y});
});*/

$("#toggle").click(function () {


    console.log($("#toggle_icon").attr("class"));
    if ($("#header").css("margin-top")!="-38px" ){
        $("#header").css("animation-name", "up");
        $("#header").css("margin-top", "-38px");
        $("#toggle_icon").attr("class", "ui-icon ui-icon-circle-triangle-s");
    } else {
        $("#header").css("animation-name", "down");
        $("#header").css("margin-top", "0px");
        $("#toggle_icon").attr("class", "ui-icon ui-icon-circle-triangle-n");
    }
/*    for (var i=0; i>-39;i=i-0.01) {
 $("#header").css("margin-top", i+"px");
 console.log(i);
 }*/
// $("#header").toggle("slide", {direction: "up"}, 400);
});

});



