var fs = require('fs');
var array = fs.readFileSync('app/ng-partials/modules/QuestionnaireCharity.html').toString();


array=array.replace('lg-repeat','ng-repeat');
array=array.replace('lg-repeat','ng-repeat');
array=array.replace('value="radio.id"','value="{{radio.id}}"');

array=array.replace('<payza-form class="merchant-services ng-isolate-scope ng-scope" model-name="\'modelForCharity.json\'" debug-mode="1">','');
array=array.replace('</payza-form>','');


console.log ("array>>>", array);

//for(i in array) {
//
//    line = array[i].replace(/(\r\n|\n|\r)/gm," ");
//
//    line =line.replace(/"/g, '\"');
//
//    console.log( '"'+line + '"+')
//}
//fs.open('app/ng-partials/modules/QuestionnaireCharity.html', 'w', 666, function( ) {
//fs.write(array ,  null, 'utf8',  function(err) {});
//    });

fs.writeFile('app/ng-partials/modules/QuestionnaireCharity.html', array, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});

