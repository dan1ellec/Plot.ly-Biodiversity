// so the dropdown menu needs to contain the ids of the patients

// will need to have:
// 1. a function that creates the metadata list thingo
// 2. a function that creates the bubble chart
// 3. a fucntion that creates the bar chart

// has columns and rows set up in index.html. use this for layout

// will also need
// 1. an initial function that puts the options in the dropdown
// 2. a way to call the above funcitons / trigger the change of graphs based on the slection
// I don't know if it will be a submit thing like what we have done previously because not sure we are entering the selection?
// tis is in index.html
// select id="selDataset" onchange="optionChanged(this.value)"></select>





// 1.  Use the D3 library to read in samples.json.

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//     - Use sample_values as the values for the bar chart.
//     - Use otu_ids as the labels for the bar chart.
//     - Use otu_labels as the hovertext for the chart.



// init();
// CREATING FUNCTION FOR DROPDOWN

function init() {
    // Using D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    // Using D3 library to read the samples.json file
    d3.json("../samples.json").then((data) => {
        console.log(data);
        // accessing the patient ids through the key "names"
        var ids = data.names;
        // logging the ids to check
        // get a 153 term long array of the ids
        console.log(ids);

        ids.forEach(function(x) {
            dropdownMenu.append("option").text(x).property("value", x);
          });       
    });
}

init();


// maybe if I make a plots function that has the plots, then a metadata function that has the metadata
// put the running of them in the init function
// then call an update plotly funciton on chnages
// Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("body").on("change", updatePlotly);

// creating a function for the dempgrapic panel
// having a variable 'id', because this will reference the specific id selected

function demographic(id) {
    d3.json("../samples.json").then((data) => {
        console.log(data);
        
        var metadata = data.metadata;
        console.log(metadata);

        // test: selecting the first dicitonary
        var idMetadata = metadata[0];

        //var id = 5;
        // Obtaining the dictionary for a selected id
        // var idMetadata = metadata["${id}"];
        // var idMetadata = metadata[id];
        // not sure which way will need

        console.log(idMetadata);        

        //obtaining the location of the dempgraphic panel
        var panelBody = d3.select("#sample-metadata")

        // need to obtain by id
        // id will need to be a variable becuase it will change

        // using object.entries to obtain the values as this looks at key/value pairs
        // adding the key value pairs to the panel with a h5 tag
        Object.entries(idMetadata).forEach(([key, value]) => {
            panelBody.append("h5").text(`${key}: ${value}`);
        })

})
};

demographic();

// creating function for the plots.
// will be using variable id again

function startingPlots(id){
    d3.json("../samples.json").then((data) => {

        // need to access the sample data section
        var sampleData = data.samples;
        console.log(sampleData);

        // this is how we reach the actual id in the dictionary
        // so the dictionary needs to be accessed through the idndex, then find id with .id
        // this gets id for index 0
        var idValue = sampleData[0].id;
        console.log(idValue);

        // need to display top ten OTUs in that individual
        // They are written in order of highest to lowest!!! yaya!
        // so just first ten!

        // obtaining section using index
        var section = sampleData[0];
        // var section = sampleData[id];

        // obtaining the values for the bar chart.
        var values = section.sample_values.slice(0, 10);
        // reversing
        var sample_values = values.reverse();
        console.log(sample_values);

        // obtaining the labels for the bar chart.
        var ids = section.otu_ids.slice(0, 10) ;
        var reverse_ids = ids.reverse();
        var string_ids = toString(reverse_ids)
        string_ids.forEach((x) => {
            
            var otu_ids = 'OTU' + x;

        })

        console.log(otu_ids);

        // Obtaining the hovertext for the bar chart.
        var labels = section.otu_labels.slice(0, 10) ;
        var otu_labels = labels.reverse();
        console.log(otu_labels );

        // will reverse to look like theirs
        var trace1 = [{
            type: 'bar',
            x: sample_values,
            y: otu_ids,
            text: otu_ids, 
            orientation: 'h',
            hoverinfo: otu_labels
          }];

        var layout = {
            title: "Greek gods search results",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
            };
          
        Plotly.newPlot('bar', trace1, layout);







    })  

};

startingPlots();


//maybe for changing: for index between whatever and whatever. if sampleData[idex].id = selected id then use that data


// // Using D3 library to read the samples.json file
// // The data from the JSON file is arbitrarily named importedData as the argument
// d3.json("../samples.json").then((data) => {
//     console.log(data);

//     var metadata = data.metadata;

//     console.log(metadata);
    
  
//     // // Sort the data array using the greekSearchResults value
//     // data.sort(function(a, b) {
//     //   return parseFloat(b.greekSearchResults) - parseFloat(a.greekSearchResults);
//     // });
  
//     // // Slice the first 10 objects for plotting
//     // data = data.slice(0, 10);
  
//     // // Reverse the array due to Plotly's defaults
//     // data = data.reverse();
  
//     // // Trace1 for the Greek Data
//     // var trace1 = {
//     //   x: data.map(row => row.greekSearchResults),
//     //   y: data.map(row => row.greekName),
//     //   text: data.map(row => row.greekName),
//     //   name: "Greek",
//     //   type: "bar",
//     //   orientation: "h"
//     // };
  
//     // // data
//     // var chartData = [trace1];
  
//     // // Apply the group bar mode to the layout
//     // var layout = {
//     //   title: "Greek gods search results",
//     //   margin: {
//     //     l: 100,
//     //     r: 100,
//     //     t: 100,
//     //     b: 100
//     //   }
//     // };
  
//     // // Render the plot to the div tag with id "plot"
//     // Plotly.newPlot("plot", chartData, layout);
//   });




// UPDATE PLOTLY EXAMPLE

// Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("body").on("change", updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//   // Use D3 to select the dropdown menu
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.node().value;

//   var CHART = d3.selectAll("#plot").node();

//   // Initialize x and y arrays
//   var x = [];
//   var y = [];

//   switch(dataset) {
//     case "dataset1":
//       x = [1, 2, 3, 4, 5];
//       y = [1, 2, 4, 8, 16];
//       break;

//     case "dataset2":
//       x = [10, 20, 30, 40, 50];
//       y = [1, 10, 100, 1000, 10000];
//       break;

//     case "dataset3":
//       x = [100, 200, 300, 400, 500];
//       y = [10, 100, 50, 10, 0];
//       break;

//     default:
//       x = [1, 2, 3, 4, 5];
//       y = [1, 2, 3, 4, 5];
//       break;
//   }


//   // Note the extra brackets around 'x' and 'y'
//   Plotly.restyle(CHART, "x", [x]);
//   Plotly.restyle(CHART, "y", [y]);
// }

