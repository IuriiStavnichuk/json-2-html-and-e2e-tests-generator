var app=angular.module("superhero", [])

app.directive ("superman", function(){
    return {
        restrict:"E",
        link: function (){console.log("57645756");},
        template:"<div>etretretr</div>"
    }
})