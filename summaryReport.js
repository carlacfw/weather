//I have installed a npm library to parse csv file to node.js
//this is a JavaScript file
//task - number of rainy days in the month - done
//task - Average temperature for month - done
//task - Average temperature on rainy days in the month - done
//task - Average temperature on non rainy days in the month - done
// NOTE: A rainy day is defined as a day on which >= 2mm of rain was recorded.
//you need to have Node.js to run this file
//run 'npm i' in the command line before running the code
//run the following code in command line using 'node summaryReport.js'


var csv = require("fast-csv");
var fs = require('fs');
var array = [];

//this function reads de data from csv file.
var stream = fs.createReadStream("temperatures.csv");
csv
  // set headers to true if you expect the first line of your CSV to contain headers
  // set trim to true so it removes spaces at the beggining and at the end of each value(cell)
 .fromStream(stream, {headers : true, trim : true})
 //on data reads each line of the source file one after another
 .on("data", function(data){
   //push() is gonna push all the objects to an array
   array.push(data);
 })

 //on end will be executed after all data was parsed
 .on("end", function(){
   //Rainy days
   //filtering array reading only the objects that are >= 2mm of rain
   var rainyDays = array.filter(function(obj){
     return Number(obj.rainfall >= 2)
   })
     console.log('We had ' + rainyDays.length + ' rainy days in the month.');

     //Average temperature of the month
     //maping through the array so I can get all the temperature inside each object
     var temperatures = array.map(function(obj){
    //when I was doing the reduce function I was getting NaN bcause temperature was being read as string - dont know why
    //so transformed the return to Number
     return Number(obj.temperature);
   })
   //reduce function will be used to get a sum of values returning a single value
   /*but as in this case we need to get an average of temperature which is the sum of
   temperature column divided by the length of the array temperatures.*/
   var avg = temperatures.reduce(function(total, temperature){
     return total + temperature
   }) /temperatures.length;
    //used toFixed(2) to get a result for the floating number with 2 decimals only
     console.log("The average temperature for month is " + avg.toFixed(2) + " degrees C");

  //Average temperature on rainy days.
  /*to get the average temperature on rainy days I need to map through temperatures on rainy days array
  then reduce the array just created and then I can calculate the average based on those*/
  var avgTempOnRainy = rainyDays.map(function(obj){
    return Number(obj.temperature);
  }).reduce(function(total, temperature){
    return total + temperature
  }) /rainyDays.length;
    console.log("The average temperature on rainy days is " + avgTempOnRainy + " degrees C");

  //Average temperatura on non rainy days
  /*to get the average temperature on non rainy days first I need filter the non rainy days
  which are < 2mm of rain*/
  var NorainyDays = array.filter(function(obj){
    return Number(obj.rainfall < 2) //console.log("No rainy days "+ NorainyDays.length);
})
  //same function used to get the average on rainy days, but now maping through non rainy days array
  var avgTempOnNoRainy = NorainyDays.map(function(obj){
    return Number(obj.temperature);
  }).reduce(function(total, temperature){
    return total + temperature
  }) /NorainyDays.length;
    console.log("The average temperature on non rainy days is " + avgTempOnNoRainy + " degrees C");
});
