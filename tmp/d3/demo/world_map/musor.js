var width = 960,
        height = 500;

    var radius = 30; /* radius of circles */
    var numCircles = 6; /* number of circles - you must update link source/target values to match changes in the number of circles */
    var offsetScale = 0.1; /* percentage of line line to offset curves */
    var d3LineBasis = d3.svg.line().interpolate("basis");
    var d3color = d3.interpolateRgb("#BAE4B3", "#006D2C"); /* color range for flow lines */

    //A LIST OF LINKS BETWEEN CIRCLES
    var links = [
        {
        source: 0,
        target: 5,
        strength: Math.round(Math.random() * 10)},
    {
        source: 0,
        target: 2,
        strength: Math.round(Math.random() * 10)},
    {
        source: 1,
        target: 3,
        strength: Math.round(Math.random() * 10)},
    {
        source: 2,
        target: 4,
        strength: Math.round(Math.random() * 10)},
    {
        source: 3,
        target: 5,
        strength: Math.round(Math.random() * 10)},
    {
        source: 5,
        target: 0,
        strength: Math.round(Math.random() * 10)},
    {
        source: 2,
        target: 0,
        strength: Math.round(Math.random() * 10)},
    {
        source: 3,
        target: 1,
        strength: Math.round(Math.random() * 10)}
    ];

    function createDefs(defs) {
        var dropShadowFilter = defs.append('svg:filter').attr('id', 'dropShadow');
        dropShadowFilter.append('svg:feGaussianBlur').attr('in', 'SourceAlpha').attr('stdDeviation', 1);
        dropShadowFilter.append('svg:feOffset').attr('dx', 0).attr('dy', 1).attr('result', 'offsetblur');
        var feMerge = dropShadowFilter.append('svg:feMerge');
        feMerge.append('svg:feMergeNode');
        feMerge.append('svg:feMergeNode').attr('in', "SourceGraphic");
    }

    var drag = d3.behavior.drag().origin(Object).on("drag", function() {
        dragmove(this);
    });

    //RANDOMLY GENERATE COORDINATES FOR CIRCLES
    var circles = d3.range(numCircles).map(function(i, d) {
        return [Math.round(50 + (i / numCircles) * (width - 50)), Math.round(30 + Math.random() * (height - 80))];
    });

    //GLOBAL STRENGTH SCALE
    var strength_scale = d3.scale.linear().range([2, 10]) /* thickness range for flow lines */
    .domain([0, d3.max(links, function(d) {
        return d.strength;
    })]);

    var color_scale = d3.scale.linear().range([0, 1]).domain([0, d3.max(links, function(d) {
        return d.strength;
    })]);

    var svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

    var g_lines = svg.append("g").attr("class", "lines");
    var g_circles = svg.append("g").attr("class", "circles");

    //SHADOW DEFINITION
    createDefs(svg.append('svg:defs'));

    $.each(circles, function(i, d) {
        g_circles.append("circle").attr('filter', 'url(#dropShadow)').attr("class", "circle").attr("id", "circle" + i).attr("r", radius).attr("cx", d[0]).attr("cy", d[1]).call(drag);
    });

    g_lines.selectAll(".link_line").data(links).enter().append("path").attr("class", "link_line").attr("fill", function(d) {
        return d3color(color_scale(d.strength));
    }).attr("id", function(i, d) {
        return "link_line" + d;
    }).attr("d", function(d) {
        return drawCurve(d);
    });

    function dragmove(dragged) {
        var x = d3.select(dragged).attr("cx");
        var y = d3.select(dragged).attr("cy");
        d3.select(dragged).attr("cx", Math.max(radius, Math.min(width - radius, +x + d3.event.dx))).attr("cy", Math.max(radius, Math.min(height - radius, +y + d3.event.dy)));
        $.each(links, function(i, link) {
            if (link.source == dragged.id.match(/\d+/)[0] || link.target == dragged.id.match(/\d+/)[0]) {
                d3.select('#link_line' + i).attr("d", function(d) {
                    return drawCurve(d);
                });
            }
        });
    }

function drawCurve(d) {
var slope = Math.atan2((+d3.select('#circle' + d.target).attr("cy") - d3.select('#circle' + d.source).attr("cy")), (+d3.select('#circle' + d.target).attr("cx") - d3.select('#circle' + d.source).attr("cx")));
var slopePlus90 = Math.atan2((+d3.select('#circle' + d.target).attr("cy") - d3.select('#circle' + d.source).attr("cy")), (+d3.select('#circle' + d.target).attr("cx") - d3.select('#circle' + d.source).attr("cx"))) + (Math.PI/2);

var sourceX = +d3.select('#circle' + d.source).attr("cx");
var sourceY = +d3.select('#circle' + d.source).attr("cy");
var targetX = +d3.select('#circle' + d.target).attr("cx");
var targetY = +d3.select('#circle' + d.target).attr("cy");

var halfX = (sourceX + targetX)/2;
var halfY = (sourceY + targetY)/2;

var lineLength = Math.sqrt(Math.pow(targetX - sourceX, 2) + Math.pow(targetY - sourceY, 2));

var MP1X = halfX + (offsetScale * lineLength + strength_scale(d.strength)/2) * Math.cos(slopePlus90);
var MP1Y = halfY + (offsetScale * lineLength + strength_scale(d.strength)/2) * Math.sin(slopePlus90);
var MP2X = halfX + (offsetScale * lineLength - strength_scale(d.strength)/2) * Math.cos(slopePlus90);
var MP2Y = halfY + (offsetScale * lineLength - strength_scale(d.strength)/2) * Math.sin(slopePlus90);

var points = [];
points.push([(sourceX - strength_scale(d.strength) * Math.cos(slopePlus90)),(sourceY - strength_scale(d.strength) * Math.sin(slopePlus90))]);
points.push([MP2X,MP2Y]);
points.push(([(targetX  + radius * Math.cos(slope)), (targetY + radius * Math.sin(slope))]));
points.push(([(targetX  + radius * Math.cos(slope)), (targetY + radius * Math.sin(slope))]));
points.push([MP1X, MP1Y]);
points.push([(sourceX + strength_scale(d.strength) * Math.cos(slopePlus90)),(sourceY + strength_scale(d.strength) * Math.sin(slopePlus90))]);

return d3LineBasis(points) + "Z";
}