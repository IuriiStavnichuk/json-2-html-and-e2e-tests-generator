var demo = angular.module( "Demo", [] );

demo.controller(
    "DemoController",
    function( $scope ) {

        $scope.group_array=[
            { group: [
                { groupName:"Basic info", title: "Name",value: "John S", type:  "i" },
                {                   title: "E-Mail",value: "", type:  "i" } ,
                {                   title: "Phone",value: "", type:  "i" } ,
                {                   title: "City",value: "", type:  "i" } ,
                {                   title: "State",value: "", type:  "i" } ,
                {                   title: "Age",value: "", type:  "s"  },
                {                   title: "Sex",value: "M", type:  "s" } ,
                {                   title: "Type",value: "Actor", type:  "s" } ,
                {                   title: "Stats/sizes",value: "Non-Union", type:  "s" } ] },
            { group: [
                { groupName:"Boys (age range 1 month Ц 15)", title: "Height",value: "1'", type:  "s" },
                {                  title: "Pants size",value: "2", type:  "s" } ,
                {                  title: "Shirt size",value: "XS", type:  "s" } ,
                {                  title: "Shoe",value: "1", type:  "s" } ,
                {                  title: "Hair color",value: "Lt.Brown", type:  "s" } ,
                {                  title: "Eye color",value: "Brown", type:  "s" } ] },
			{ group: [
                { groupName:"Men (age range 16-100) ", title: "Height",value: "3'", type:  "s" },
                {                  title: "Waist",value: "28", type:  "s" } ,
                {                  title: "Inseam",value: "24", type:  "s" } ,
                {                  title: "Suit",value: "35", type:  "s" } ,
                {                  title: "Shirt size",value: "XS", type:  "s" } ,
				{                  title: "Neck",value: "13", type:  "s" } ,
                {                  title: "Sleeve",value: "24", type:  "s" } ,
                {                  title: "Shoe",value: "1", type:  "s" } ,
                {                  title: "Hair color",value: "Brown", type:  "s" } ,
				{                  title: "Inseam",value: "24", type:  "s" } ,
                {                  title: "Suit",value: "35", type:  "s" } ,
                {                  title: "Hair color",value: "Lt.Brown", type:  "s" } ,
                {                  title: "Eye color",value: "Ѕрожн", type:  "s" } ] },
			{ group: [
                { groupName:"Girls (age range 1 month Ц 15)", title: "Height",value: "1'", type:  "s" },
                {                  title: "Paint size",value: "0", type:  "s" } ,
                {                  title: "Shirt size",value: "XS", type:  "s" } ,
				{                  title: "Dress size",value: "0", type:  "s" } ,
                {                  title: "Shoe",value: "1", type:  "s" } ,
                {                  title: "Hair color",value: "Brown", type:  "s" } ,
                {                  title: "Hair color",value: "Lt.Brown", type:  "s" } ,
                {                  title: "Eye color",value: "Ѕрожн", type:  "s" } ] },
			{ group: [
                { groupName:"Women (age range 15 Ц 100)", title: "Height",value: "3'", type:  "s" },
                {                  title: "Bust ",value: "32", type:  "s" } ,
                {                  title: "Waist ",value: "22", type:  "s" } ,
                {                  title: "Hips",value: "30", type:  "s" } ,
                {                  title: "Shirt size",value: "XS", type:  "s" } ,
				{                  title: "Dress size",value: "0", type:  "s" } ,
                {                  title: "Pants size",value: "24", type:  "s" } ,
				{                  title: "Inseam",value: "24", type:  "s" } ,
                {                  title: "Shoe",value: "1", type:  "s" } ,				
                {                  title: "Hair color",value: "Lt.Brown", type:  "s" } ,
                {                  title: "Eye color",value: "Ѕрожн", type:  "s" } ] }
        ]
    }
);