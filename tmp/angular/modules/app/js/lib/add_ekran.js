var fs = require('fs');
var array = fs.readFileSync('../modules/app/ng-partials/modules/countriesList.html').toString().split("\n");
for(i in array) {

    line = array[i].replace(/(\r\n|\n|\r)/gm," ");

    line =line.replace(/"/g, '\"');

    console.log( '"'+line + '"+')
}

