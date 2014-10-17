var colorbrewer = {
    Greens: {
        10: ["#dddddd","#aef88a","#8af167","#62e644","#53dd37","#42d22b","#37c823","#37bb26","#29a71b","#28941c"]
    }
};

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

    match_id_to_name_=[]
    for (var ii = 0; ii < match_id_to_name.length; ii++) {
        match_id_to_name_[match_id_to_name[ii].id] = {name: match_id_to_name[ii].name}; //make new associated array
    }

    country_info_=[]
    for (var ii = 0; ii < country_info.length; ii++) {
        country_info_[country_info[ii].Country] = {Transactions_Qty: country_info[ii].Transactions_Qty,Amount_Deposit:country_info[ii].Amount_Deposit,Amount_Withdrawal:country_info[ii].Amount_Withdrawal}; //make new associated array
    }

    sorted_countries=[];
    for (i=0;i<unsorted_countries.length;i++)
    {
        var lookup_=unsorted_countries[i].id;

        if (typeof(country_info[ii]) == "undefined") { country_info[ii]={Amount_Deposit:"0",Amount_Withdrawal:"0",Country:"0",Transactions_Qty:"0"} }

        if (typeof(match_id_to_name_[lookup_]) == "undefined") { match_id_to_name_[lookup_]={name:""} }
        if (typeof(country_info_[match_id_to_name_[lookup_].name]) == "undefined") { country_info_[match_id_to_name_[lookup_].name]={Transactions_Qty:"0",Amount_Deposit:"0",Amount_Withdrawal:"0",Country:"0"} }

        sorted_countries[lookup_] = {   name: match_id_to_name_[lookup_].name, value: country_info_[ match_id_to_name_[lookup_].name ].Transactions_Qty };
    }

    var color_scale = d3.scale.quantile()
        .domain([0, 1, 5000, 35000, 177673])
        .range(colorbrewer.Greens[10]);
    g= svg.selectAll(".country")
        .data(unsorted_countries)
        .enter().insert("path", ".graticule")
        .attr("transform", "translate( -40 ,-80)")
        .attr("class", "country")
        .attr("d", path)
        .style("fill", "#37BB26")

    g.transition()
        .style("fill", function(d,i) { return d3.rgb(color_scale(sorted_countries[d.id].value)); })
        //.duration(function(d, i) { return 200+(i * 10); }) // this is 1s
        .duration(400) // this is 1s
        .delay(function(d, i) { return 1200+(i * 12); })
        //.delay(function(d, i) {  console.log(Math.exp(i)*1.2);return (1200+((Math.exp(i))*1.2));   })

    g.on("mouseover", function(d) {
        d3.select( this ).style("fill", "orange") ,
            d3.select( "#subunit-label"+d.id ) .style("display", "block")
        svg.select("#label_under_text") .style("display", "block");
    })
    g.on("mouseout", function(d) {
        d3.select( this ).style("fill", function(d) {return d3.rgb(color_scale(sorted_countries[d.id].value)); }) ,
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
        //.attr("transform", "translate( -40 ,-80)")
        .attr("dy", ".35em")
        .style("pointer-events", "none")
        .style("display", "none")
        .text(function(d,i) { return sorted_countries[d.id].name+"  | "+sorted_countries[d.id].value; })

    ;

    function redraw (){
        g.remove();
        queue()
            .defer(d3.json, "world-110m.json")
            .defer(d3.tsv, "world-country-names.tsv")  // match id to country name
            .defer(d3.csv, "country.csv") // info about country
            .await(ready);
    }

    function click(d) {
        var x, y, k;
        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;

            svg.selectAll(".subunit-label") .style("display", "none") .attr("transform", "translate(140,40)");
            svg.select("#label_under_text") .style("display", "block") .attr("x", "0" ) .attr("y", 22);
            console.log(getClientHeight());
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

     var IntervalId=setInterval(function(){redraw();}, 5000)

}






