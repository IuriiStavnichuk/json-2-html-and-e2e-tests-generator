var fs = require('fs');
var array = fs.readFileSync('../../app/ng-partials/modules/QuestionnaireCharity.html').toString();
console.log ("array>>>", array);

//for(i in array) {
//
//    line = array[i].replace(/(\r\n|\n|\r)/gm," ");
//
//    line =line.replace(/"/g, '\"');
//
//    console.log( '"'+line + '"+')
//}

