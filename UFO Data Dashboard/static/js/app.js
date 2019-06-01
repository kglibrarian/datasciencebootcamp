// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

 // Loop Through `table data` and console.log each report object
data.forEach(function(tableData) {
    //console.log(tableData);
});

// Use d3 to update each cell's text with report values 
data.forEach(function(tableData) {
    //console.log(tableData);
    var row = tbody.append("tr");
    Object.entries(tableData).forEach(function([key, value]) {
    //console.log(key, value);
//Append a cell to the row for each value in thereport object
    var cell = row.append("td");
    cell.text(value);
    });
});

// Select the submit button
var submit = d3.select("#filter-btn");

submit.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  //console.log(inputValue);
  //console.log(tableData);
  var filteredData = tableData.filter(date => date.datetime === inputValue);
  console.log(filteredData);
  
  //clear the table of data
  d3.selectAll("tbody td").remove();

  //refill the table with filteredData
  data.forEach(function(filteredData) {
    //console.log(filteredData);
        var row = tbody.append("tr");
        Object.entries(filteredData).forEach(function([key, value]) {
        //console.log(key, value);
        //Append a cell to the row for each value in thereport object
        var cell = row.append("td");
        cell.text(value);
        });


    });
    document.getElementById('datetime').value = ''

});


