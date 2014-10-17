var app=angular.module("superhero", [])

app.directive ("superman", function(){
    return {
        restrict:"A",
        link: function (){console.log("Superman")},
        template:"<div>Superman</div>"
    }
})

app.directive ("flash", function(){
    return {
        restrict:"A",
        link: function (){console.log("Flash")},
        template:"<div>Flash</div>"
    }
})