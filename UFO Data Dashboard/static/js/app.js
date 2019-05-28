// from data.js
var tableData = data;
//console.log(Object.keys(tableData[0]))
// YOUR CODE HERE!
var table = d3.select("#ufo-table-2").append("table");
thead = table.append("thead").append("tr");
tbody = table.append("tbody");

var i;
ufo_array = []
for (i = 0; i < tableData.length; i++) {
    text = Object.values(tableData[i])
    //console.log(text)
    ufo_array.push(text);
    //console.log(ufo_array)
    //date = text[0]
    //d3.selectAll("th").append("tr").text(date)
    //console.log(tableData[i])
    //console.log(Object.values(tableData[i]))

   // First create the table rows 
   var tr = tbody.selectAll("tr")  
        .data(ufo_array, function(d,i){
         console.log(d)
         return d;  
     })
        .enter()
        .append("tr");
// Now create the table cells   
    var td = tr.selectAll("td") 
        .data(function(d) {return d; })
        .enter()
        .append("td")
        .text(function(d) {return d;});
    ufo_array = []

    //http://jsfiddle.net/W7Zwg/1/
} 

 