var fs = require('fs');
var array = fs.readFileSync('../form_generator/partial/dummy.txt').toString().split("\n");
for(i in array) {

    line = array[i].replace(/(\r\n|\n|\r)/gm," ");
    line =line.replace(/"/g, '\'');
    line2 = String(array[i]);

    if(i!=array.length-1)
    {console.log( '"'+line+'\\'+'n'+'"+') }
//    {console.log( '"'+line+'"+') }
    else
    {console.log( '"'+line+'";') }
}

