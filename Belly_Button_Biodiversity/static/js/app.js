
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
  // Get new data whenever the dropdown selection changes
   /* data route */
   var url = "/samples/"+ sample;
   d3.json(url).then(function(response) {
     console.log(response)
     var pieChart = d3.select("#pie");
     // remove any children from the list to
    pieChart.html("");
    

   })
  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
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
