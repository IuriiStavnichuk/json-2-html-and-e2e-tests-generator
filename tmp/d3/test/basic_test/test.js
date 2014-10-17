arrayWithElement=d3.selectAll("p")
//    .data([4, 8, 15, 16, 23, 42])
//    .enter().append("p")
//    .text(function(d) { console.log("d i >>", d); return "Im number " + d + "!";
    //.data(["#f00", "#0f0"])
    //.style("color", function(d, i) {
    //console.log("d i >>", d, i)
    // return d;
    //return i % 2 ? "#f00" : "#000";

//});
//d3.selectAll("p").transition()
//    .duration(function(d, i) { console.log("d i >>",  i);return i * 500; })
//   // .delay(function(d, i) { console.log("d i >>",  i);return i * 100; })
//    .style("color", "red");



var data = [4, 8, 15, 16, 23, 42, 57, 19 , 12, 28, 22 , 9 ,14, 2 ];
var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 420]);

d3.select(".chart")
    .selectAll("div")
    .data(data)
    .enter().append("div")
    .text(function(d) { return d; })
    .style("height", function(d) { return "0px"; })
    .style("width", function(d) { return "0px"; })
    .style("font-size", function(d) { return "0px"; })

    .transition()
    .duration(1200)
    .delay(function(d, i) { return i * 80; })
    .style("width", function(d) { return x(d) + "px"; })
    .style("height", function(d) { return "10px"; })
    .style("font-size", function(d) { return "12px"; })
    ;


