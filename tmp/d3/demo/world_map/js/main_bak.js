var colorbrewer = {
    Greens: {
        10: ["#dddddd","#aef88a","#8af167","#62e644","#53dd37","#42d22b","#37c823","#37bb26","#29a71b","#28941c"]
    }
};
var color_scale1 = d3.scale.quantile()
    .domain([0, 1, 5000, 35000, 177673])
    .range(colorbrewer.Greens[10]);
var color_scale2 = d3.scale.quantile()
    .domain([0, 1, 36607, 121939, 903449])
    .range(colorbrewer.Greens[10]);
var color_scale3 = d3.scale.quantile()
    .domain([0, 1, 15000, 298004, 708320])
    .range(colorbrewer.Greens[10]);
var colorbrewer = {
    Greys: {
        10: ["#bcbdbc","#c0c1c0", "#c3c4c3","#c9cac9","#cbcccb", "#cecfce","#d2d3d2","#d7d8d7","#dfe0df","#e7e8e7"]
    }
};
var color_scale_grey1 = d3.scale.quantile()
    .domain([0, 1, 5000, 35000, 177673])
    .range(colorbrewer.Greys[10]);
var color_scale_grey2 = d3.scale.quantile()
    .domain([0, 1, 36607, 121939, 903449])
    .range(colorbrewer.Greys[10]);
var color_scale_grey3 = d3.scale.quantile()
    .domain([0, 1, 15000, 298004, 708320])
    .range(colorbrewer.Greys[10]);
//.range(["#7d6c28","#8d7826", "#9e8626","#b29632","#bd9e30", "#c6a538","#d2ac44","#dbb350","#e7bd71","#f0c892"]);  //BROWN
//.range(["#bcbdbc","#c0c1c0", "#c3c4c3","#c9cac9","#cbcccb", "#cecfce","#d2d3d2","#d7d8d7","#dfe0df","#e7e8e7"]);  //GREY




var field_title = new Array
field_title[1]="TRANSACTION QTY";
field_title[2]="AMOUNT DEPOSIT";
field_title[3]="AMOUNT WITHDRAWAL";

var width = 1220, height = 800,centered;

var projection = d3.geo.kavrayskiy7()
    .scale(220)
    .translate([width / 2, height / 2])
    .precision(100);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule();

var svg = d3.select("#svgcontainer").append("svg")
        .attr("viewBox", "0 0 1220 800")
        .attr("preserveAspectRatio", "xMinYMin meet")
    ;

queue()
    .defer(d3.json, "world-110m.json")
    .defer(d3.tsv, "world-country-names.tsv")  // match id to country name
    .defer(d3.csv, "country.csv") // info about country
    .await(ready);

function ready( error, world, match_id_to_name, country_info ) {
    var unsorted_countries = topojson.object(world, world.objects.countries).geometries;

    var match_id_to_name_=[]
    for (var ii = 0; ii < match_id_to_name.length; ii++) {
        match_id_to_name_[match_id_to_name[ii].id] = {name: match_id_to_name[ii].name}; //make new associated array
    }

    var country_info_=[]
    for (var ii = 0; ii < country_info.length; ii++) {
        country_info_[country_info[ii].Country] = {Transactions_Qty: country_info[ii].Transactions_Qty,Amount_Deposit:country_info[ii].Amount_Deposit,Amount_Withdrawal:country_info[ii].Amount_Withdrawal}; //make new associated array
    }

    var sorted_countries=[];
    for (i=0;i<unsorted_countries.length;i++)
    {
        var lookup_=unsorted_countries[i].id;

        if (typeof(country_info[ii]) == "undefined") { country_info[ii]={Amount_Deposit:"0",Amount_Withdrawal:"0",Country:"0",Transactions_Qty:"0"} }

        if (typeof(match_id_to_name_[lookup_]) == "undefined") { match_id_to_name_[lookup_]={name:""} }
        if (typeof(country_info_[match_id_to_name_[lookup_].name]) == "undefined") { country_info_[match_id_to_name_[lookup_].name]={Transactions_Qty:"0",Amount_Deposit:"0",Amount_Withdrawal:"0",Country:"0"} }

        sorted_countries[lookup_] = {   name: match_id_to_name_[lookup_].name,
            value1: country_info_[ match_id_to_name_[lookup_].name ].Transactions_Qty,
            value2: country_info_[ match_id_to_name_[lookup_].name ].Amount_Deposit,
            value3: country_info_[ match_id_to_name_[lookup_].name ].Amount_Withdrawal
        };
    }
    var sorted_values=sorted_countries.slice();

//<editor-fold defaultstate="collapsed" desc="WORLD">

    g= svg.selectAll(".country")
        .data(unsorted_countries)
        .enter().insert("path", ".graticule")
        .attr("transform", "translate( -40 ,-80)")
        .attr("class", "country")
        .attr("d", path)
        .style("fill", "#FFFFFF")
    g.transition()
        .style("fill", function(d,i) { return (  (sorted_countries[d.id].value1>0)? "#29a71b" :  d3.rgb(color_scale1(sorted_countries[d.id].value1))) }  )
        //.style("fill","#37BB26")
        .duration(2000)
    g.transition()
        .style("fill", function(d,i) { return d3.rgb(color_scale1(sorted_countries[d.id].value1)); })
        .duration(300)
        .delay(function(d, i) { return 2200+(i * 15); })
    g.on("mouseover", function(d) {
        d3.select( this ).style("fill", "orange") ,
            d3.select( "#subunit-label"+d.id ) .style("display", "block")
        svg.select("#label_under_text") .style("display", "block");
    })
    g.on("mouseout", function(d) {
        d3.select( this ).style("fill", function(d) {return d3.rgb(color_scale1(sorted_countries[d.id].value1)); }) ,
            d3.select( "#subunit-label"+d.id) .style("display", "none")
        svg.select("#label_under_text") .style("display", "none")
    })
        .on("click", click)
    label_under_text=svg.append("rect")
        .attr("id", "label_under_text")
        .attr("width","300"  )
        .attr("height","36")
        .style("fill", "white")
        .style("pointer-events", "none")
        .attr("x", "0px")
        .attr("y", "-200px")
    ;
    t=svg.selectAll(".subunit-label")
        .data(topojson.object(world, world.objects.countries).geometries)
        .enter().append("text")
        .attr("class", "subunit-label")
        .attr("id", function(d) { return "subunit-label" + d.id; })
        .attr("transform", function(d) { var x_=path.centroid(d)[0]-40;var y_=path.centroid(d)[1]-80; return "translate("+x_+","+y_+")";})
        .attr("dy", ".35em")
        .style("pointer-events", "none")
        .style("display", "none")
        .text(function(d,i) { return sorted_countries[d.id].name+"  | "+sorted_countries[d.id].value1; })
    ;
//</editor-fold>
    function click(d) {
        clearInterval(IntervalId);  //remove loop animation

        var x, y, k;
        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;

            svg.selectAll(".subunit-label") .style("display", "none") .attr("transform", "translate(140,40)");
            svg.select("#label_under_text") .style("display", "block") .attr("x", "0" ) .attr("y", 22);
        } else {
            x = width / 2+40;
            y = height / 2+80;
            k = 1;
            centered = null;

            d3.selectAll(".subunit-label") .style("display", "none").attr("transform", function(d) {var x_=path.centroid(d)[0]-40;var y_=path.centroid(d)[1]-80; return "translate("+x_+","+y_+")"; })
            svg.select("#label_under_text") .style("display", "none")
            svg.select("#label_under_text") .style("display", "block") .attr("x", "0" ) .attr("y", -200);
        }
        g.selectAll("path")
            .classed("active", centered && function(d) { return d === centered; });

        g.transition()
            .duration(1000)
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
            // .style("stroke-width", 1.5 / k + "px")
        ;
    }
    window.ii=1;

    var IntervalId=setInterval(function(){ window.ii++; if (window.ii>3){window.ii=1};redraw( sorted_countries, sorted_values);},13000)
    //draw_chart  (sorted_values)
}


function redraw ( sorted_countries, sorted_values ){

    title_trans_part1 ();
    setTimeout( draw_chart,5800,sorted_values )

    function title_trans_part1 () {
        d3.select("#title_text").classed ("title_text_anim2", false)
        d3.select("#title_text").classed ("title_text_anim1", true)
        setTimeout( title_trans_part2, 600)
    }
    function title_trans_part2 () {
        d3.select("#title_text").classed ("title_text_anim1", false)
        d3.select("#title_text").property ("textContent",field_title[window.ii]).classed ("title_text_anim2", true)
        setTimeout( redraw_world_map, 600)
    }
    function redraw_world_map () {
        var field_name="value"+window.ii
        //tt= svg.select("#title_text")

        g= svg.selectAll(".country")
        g.transition()
            .style("fill", function(d,i) { return d3.rgb(  eval("color_scale"+(window.ii))(sorted_countries[d.id][field_name])   ); })
            .duration(450)
            .delay(function(d, i) { return i * 12; })
        t=svg.selectAll(".subunit-label")
            .text(function(d,i) { return sorted_countries[d.id].name+"  | "+sorted_countries[d.id][field_name]; })
        g.transition()
            //.style("fill", function() {return d3.rgb(d3.select(this).style("fill")).brighter(1.5);})
            .style("fill", function(d,i) { return d3.rgb(  eval("color_scale_grey"+(window.ii))(sorted_countries[d.id][field_name])); })
            .delay(3500)
            .duration(1400)
    }
}

function draw_chart (sorted_values){
    var radius = 230;
    var field_name="value"+window.ii
    var color = d3.scale.ordinal() .range(["#28941c","#29a71b", "#37bb26","#37c823","#53dd37", "#62e644","#71ed4f","#79f24f","#94ef76","#aef294"]);

    var arc = d3.svg.arc()
        .outerRadius(radius )
        .innerRadius(radius - 80);

    var pie = d3.layout.pie()
        .value(function(d) { return d.value1; });

        function sort_by_value (b, a) {
            return a[field_name]  - b[field_name];
        }

    sorted_values.sort(sort_by_value);

    var array_for_chart = [];

    for (i=0;i<10;i++) { array_for_chart[i] = { name: sorted_values[i].name,  value1: +sorted_values[i][field_name] }; }    //top 10

    svg.selectAll(".arc").remove()

    var arcs = svg.selectAll(".arc")
        .data(pie(array_for_chart))
        .enter().append("g")
        .attr("class", "arc")
        .attr("transform", "translate(586,268)");

       var paths=arcs.append("path")
        .style("fill", function(d) { return color(d.data.value1); })
    .transition()
        .duration(2000)
        .delay(function(d, i) {return i * 50; })
        .attrTween("d", tweenPie)
    .transition()
        .delay(6500)
        .duration(1200)
        .style("fill-opacity", 0 );

      arcs.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("class", "text_chart")
        .attr("dy", ".35em")
        //.style("text-anchor", "middle")

        .text(function(d) { return d.data.name; })
        .style("fill-opacity", 0 )

        .transition()
        .style("fill-opacity", 1 )
        .delay (2400)
        .duration(1000)
    .transition()
        .style("fill-opacity", 0 )
        .delay (6500)
        .duration(500)

    function tweenPie(b) {
        b.innerRadius = 90;
        var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
        return function(t) {
            return arc(i(t));
        };
    }
}







