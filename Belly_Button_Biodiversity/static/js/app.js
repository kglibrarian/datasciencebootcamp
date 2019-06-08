
function buildMetadata(sample) {
 
  // @TODO: Complete the following function that builds the 
  //metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`
  // Use `.html("") to clear any existing metadata
  // Use `Object.entries` to add each key and value pair 
  //to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.

  /* data route */
  var url = "/metadata/"+ sample;
  d3.json(url).then(function(response) {
    //console.log(response);
    //console.log(Object.entries(response));
    var panelText = (Object.values(response))
    var panelData = d3.select("#sample-metadata");
    // remove any children from the list to
    panelData.html("");
    // append stats to the list
    panelData.append("div").text(`Age:`+` `+ panelText[0]);
    panelData.append("div").text(`Belly Button Type:`+` `+ panelText[1]);
    panelData.append("div").text(`Ethnicity:`+` `+ panelText[2]);
    panelData.append("div").text(`Gender:`+` `+ panelText[3]);
    panelData.append("div").text(`Location:`+` `+ panelText[4]);
    //panelData.append("div").text(`Washing Frequency:`+` `+ panelText[5]);
    panelData.append("div").text(`SampleID:`+` `+ panelText[6]);
    
    });
   
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).
  // Get new data whenever the dropdown selection changes
  
  /* data route */
   var url = "/samples/"+ sample;
   d3.json(url).then(function(response) {
     //console.log(response)
     var pieData = (Object.values(response))
     //console.log(pieData[2])
     var pieChart = d3.select("#pie");
     var allIDs = pieData[0]; //key
     var allLabels = pieData[1];
     var allValues= pieData[2]; //values
     var result = {};
     allIDs.forEach((allIDs, i) => result[allIDs] = allValues[i]);
     //console.log(result);
     var entries = Object.entries(result);
     //console.log(entries)
     var sorted = entries.sort((a, b) =>  b[1]- a[1]);
     //console.log(sorted)
     var sliced = sorted.slice(0,10)
     //console.log(sliced)
     var finalObject = Object.assign(...sliced.map(([key, val]) => ({[key]: val})))
     //console.log(finalObject);
     pieLabels = Object.keys(finalObject);
     console.log(pieLabels);
     var sumValues = Object.values(finalObject).reduce((a, b) => a + b);
     console.log(sumValues);
     newValues = Object.values(finalObject);
     pieValues = []
     for (i=0; i<newValues.length; i++){
      percentValues = newValues[i]/sumValues * 100
      pieValues.push(percentValues)
     };
     console.log(pieValues);
       
    var data = [{
      labels:pieLabels,
      values:pieValues,
      type: 'pie'
    }];

    var layout = {
      height: 400,
      width: 500
    };
    
    
    Plotly.newPlot(pie, data, layout);
  
   // @TODO: Build a Bubble Chart using the sample data
   

   })
  

   

    

    

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  //console.log(selector)
  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    //console.log(sampleNames[0]);
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
      
    });
    
    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log(firstSample);
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
