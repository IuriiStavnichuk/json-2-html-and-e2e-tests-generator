var demo = angular.module( "Demo", [] );

demo.controller(
    "DemoController",
    function( $scope ) {

        $scope.group_array=[
            { group: [
                { groupName:"Basic info", title: "Name",value: "John S", type:  "i" },
                {                   title: "Sex",value: "M", type:  "s" } ,
                {                   title: "Age range",value: "20", type:  "s" } ,
                {                   title: "Ethnicity",value: "American", type:  "s" } ,
                {                   title: "Location",value: "Central Florida", type:  "s" } ,
                {                   title: "Model",value: "Model", type:  "s"  },
                {                   title: "Actor",value: "Commercial", type:  "s" } ,
                {                   title: "Voiceover",value: "Commercial", type:  "s" } ,
                {                   title: "Union Status",value: "Non-Union", type:  "s" } ,
                {                   title: "Height ",value: "3'", type:  "s"  },
                {                   title: "Bust ",value: "32", type:  "s" } ,
                {                   title: "Waist ",value: "22", type:  "s" } ,
                {                   title: "Hips",value: "30", type:  "s" } ,
                {                   title: "Shirt size",value: "XS", type:  "s" } ,
                {                   title: "Dress size",value: "0", type:  "s" } ,
                {                   title: "Pants size",value: "0", type:  "s" } ,
                {                   title: "Inseam",value: "24", type:  "s" } ,
                {                   title: "Shoe",value: "1", type:  "s"  },
                {                   title: "Hair color",value: "Lt. Brunette", type:  "s" } ,
                {                   title: "Eye color",value: "Brown", type:  "s" } ] },

            { group: [
                { groupName:"Special Skills", title: "Runway",value: "", type:  "c" },
                {                  title: "Swimsuit",value: "", type:  "c" } ,
                {                  title: "Lingerie",value: "", type:  "c" } ,
                {                  title: "Languages",value: "English", type:  "s" } ,
                {                  title: "Sports",value: "Golf", type:  "s" } ,
                {                  title: "Singer",value: "", type:  "c" } ,
                {                  title: "Stunt",value: "", type:  "c" } ,
                {                  title: "Dancer",value: "", type:  "c" } ,
                {                  title: "Instruments",value: "Accordian", type:  "s" } ,
                {                  title: "Teleprompter",value: "", type:  "c" } ,
                {                  title: "Earprompter",value: "", type:  "c" } ,
                {                  title: "Improv",value: "", type:  "c" } ,
                {                  title: "Comedian",value: "", type:  "c" } ,
                {                  title: "Dancer",value: "", type:  "c" } ] }

        ]


    }
);