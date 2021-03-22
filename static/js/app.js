




// CREATING FUNCTION FOR DROPDOWN and the initial graphs and demographic panel
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

    var initialIndex = 0;
    demographic(initialIndex);
    startingPlots(initialIndex);
    extra(initialIndex);

}

init();


// maybe if I make a plots function that has the plots, then a metadata function that has the metadata
// put the running of them in the init function
// then call an update plotly funciton on chnages
// Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("body").on("change", updatePlotly);

// creating a function for the dempgrapic panel
// having a variable 'index', because this will reference the specific id selected

function demographic(index) {
    d3.json("../samples.json").then((data) => {
        console.log(data);
        
        var metadata = data.metadata;
        console.log(metadata);

        // test: selecting the first dicitonary
        //var idMetadata = metadata[0];

        //var id = 5;
        // Obtaining the dictionary for a selected id
        // var idMetadata = metadata["${id}"];
        var idMetadata = metadata[index];
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

//demographic();

// creating function for the plots.
// will be using variable id again

function startingPlots(index){
    d3.json("../samples.json").then((data) => {

        // need to access the sample data section
        var sampleData = data.samples;
        console.log(sampleData);
        console.log("length")
        console.log(sampleData.length)

        // this is how we reach the actual id in the dictionary
        // so the dictionary needs to be accessed through the idndex, then find id with .id
        // this gets id for index 0
        var idValue = sampleData[0].id;
        console.log(idValue);

        // need to display top ten OTUs in that individual
        // They are written in order of highest to lowest!!! yaya!
        // so just first ten!

        // obtaining section using index
        //var section = sampleData[0];
        var section = sampleData[index];

        // obtaining the top ten values for the bar chart.
        var values = section.sample_values.slice(0, 10);
        // reversing the top ten values to accomodate the plotly graph set up
        var sample_values = values.reverse();
        console.log(sample_values);

        // obtaining the top 10 labels for the bar chart.
        var ids = section.otu_ids.slice(0, 10) ;
        // reversing the top ten labels to accomodate the plotly graph set up
        var reverse_ids = ids.reverse();
        // using map to add 'OTU' before each label
        let otu_ids = reverse_ids.map((a) => {
            return `OTU ${a}`;
          })
        console.log(otu_ids);

        // Obtaining the top ten hovertext values for the bar chart.
        var labels = section.otu_labels.slice(0, 10) ;
        // reversing the top ten hovertext values to accomodate the plotly graph set up
        var otu_labels = labels.reverse();
        console.log(otu_labels );

        // creating the trace for the bar chart
        var trace1 = [{
            type: 'bar',
            x: sample_values,
            y: otu_ids,
            text: otu_ids, 
            orientation: 'h',
            hoverinfo: otu_labels
          }];

        // creating the layout for the bar chart
        var layout = {
            title: "Top 10 OTUs",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
            };
        
        // plotting the bar chart
        Plotly.newPlot('bar', trace1, layout);



        //Creating a bubble chart that displays each sample.
        // Use otu_ids for the x values.
        // Use sample_values for the y values.
        // Use sample_values for the marker size.
        // Use otu_ids for the marker colors.
        // Use otu_labels for the text values.

        // think when using OTU ids actually need OUT ids before the OTU was added above, need them actuallly as numbers
        // so going to use reverse_ids instead
        // buble needs the full values not the shortened ten

        var sample_values_bubble = section.sample_values
        var otu_ids_bubble = section.otu_ids
        var out_labels_bubble = section.otu_labels


        var trace2 = [{
            x: otu_ids_bubble,
            y: sample_values_bubble,
            type: 'scatter',
            mode: 'markers',
            marker: {
                size: sample_values_bubble,
                color: otu_ids_bubble
            },
            text: out_labels_bubble

        }];

        var layout2 = {
            title: 'Bubble Chart All Samples',
                showlegend: false,
                //height: 600,
                //width: 1000,
                xaxis:{title: "OTU ID"}            
        };

        // plotting the bubble chart
        Plotly.newPlot('bubble', trace2, layout2);

    })  

};

//startingPlots();

// function bonus() {

//     d3.json("../samples.json").then((data) => {
//         console.log(data);
        
//         var metadata = data.metadata;
//         console.log(metadata);

//         // test: selecting the first dicitonary
//         //var idMetadata = metadata[0];

//         //var id = 5;
//         // Obtaining the dictionary for a selected id
//         // var idMetadata = metadata["${id}"];
//         var idMetadata = metadata[index];
//         // not sure which way will need

//         console.log(idMetadata);

//         var data = [
//             {
//             type: "indicator",
//             mode: "gauge", //"gauge+number+delta"
//             // value: 420,
//             title: { text: "Belly Button Washing Frequency <br> Scrubs Per Week", font: { size: 15 } },
//             //delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
//             gauge: {
//                 axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
//                 bar: { color: "darkblue" },
//                 bgcolor: "white",
//                 borderwidth: 2,
//                 bordercolor: "gray",
//                 steps: [
//                 { range: [0, 1], color: "cyan" },
//                 { range: [1, 2], color: "cyan" },
//                 { range: [2, 3], color: "cyan" },
//                 { range: [3, 4], color: "cyan" },
//                 { range: [4, 5], color: "cyan" },
//                 { range: [5, 6], color: "cyan" },
//                 { range: [6, 7], color: "cyan" },
//                 { range: [7, 8], color: "cyan" },
//                 { range: [8, 9], color: "cyan" }
//                 ],
//                 // threshold: {
//                 //   line: { color: "red", width: 4 },
//                 //   thickness: 0.75,
//                 //   value: 490
//                 // }
//             }
//             }
//         ];
        
//         var layout = {
//             width: 400,
//             height: 400,  // i think this height and width is setting where it is within the element, not actually the height and width of the chart
//             margin: { t: 25, r: 25, l: 25, b: 25 },
//             //paper_bgcolor: "lavender",
//             font: { color: "black", family: "Arial" },
//             shapes:[{
//                 type: 'path',
//                 path: 02,
//                 fillcolor: '850000',
//                 line: {
//                     color: '850000'
//                 }
//                 }]
//         };
      
//         Plotly.newPlot('gauge', data, layout);

//     })
// };

// bonus()


function extra(index){

    d3.json("../samples.json").then((data) => {
        console.log(data);
        
        var metadata = data.metadata;
        console.log(metadata);

        // test: selecting the first dicitonary
        //var idMetadata = metadata[0];

        //var id = 5;
        // Obtaining the dictionary for a selected id
        // var idMetadata = metadata["${id}"];
        var idMetadata = metadata[index];
        // not sure which way will need

        console.log(idMetadata); 

        var number = parseInt(idMetadata.wfreq)

        console.log(number);         

    
        // Enter a number between 0 and 9
        var scaledNumber = number * 20;
        // will be using trig to calculate the position of the arrow
        // this needs to be in degrees. So need to have 180 - scaledNumber indicating angle the arrow points to
        // therefore need to scale the number of washes for it to make sense in terms of the maximum value being 180 not 9
        // to scale from 9 to 180 need to multiply by 20, therefore will multiply all wash numbers by 20

        // Trig to calc meter point
        var degrees = 180 - scaledNumber,
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [{ type: 'scatter',
            x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'speed',
            text: scaledNumber,
            hoverinfo: 'text+name'},
            { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
            rotation: 90,
            text: ['8-9', '7-8', '6-7', '5-6','4-5', '3-4', '2-3', '1-2', '0-1', ''],
            textinfo: 'text',
            textposition:'inside',	  
            marker: {colors:['rgba(23, 130, 50 .7)', 'rgba(14, 127, 0, .6)',
                                'rgba(14, 140, 0, .5)', 'rgba(110, 154, 22, .5)',
                                'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                                'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)', 
                                'rgba(232, 226, 202, .3)', 'rgba(255, 255, 255, 0)',]},
            labels: ['8-9', '7-8', '6-7', '5-6','4-5', '3-4', '2-3', '1-2', '0-1', ''],
            hoverinfo: 'label',
            hole: .5,
            type: 'pie',
            showlegend: false
        }];

        var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
            }],
        title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
        height: 500,
        width: 500,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
        };

        Plotly.newPlot('gauge', data, layout);
    
    })
};

//extra(number)

//maybe for changing: for index between whatever and whatever. if sampleData[idex].id = selected id then use that data

//UPDATING

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("body").on("change", optionChanged(idSelection));

//input.onchange = updatePlotly();

// This function is called when a dropdown menu item is selected
function optionChanged(idSelection) {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var idSelection = dropdownMenu.node().value;

    // Selecting the bar chart
    var barChart = d3.selectAll("#bar").node();

    // Selecting the bubble chart
    var bubbleChart = d3.selectAll("#bubble").node();

    // Selecting the demographic panel
    var demographicPanel = d3.selectAll("#sample-metadata").node();

    console.log("demo panel");
    console.log(demographicPanel);

    // now need to link the value idSlection to a index

    //maybe for changing: for index between whatever and whatever. if sampleData[idex].id = selected id then use that data

    // this is how we reach the actual id in the dictionary
        // so the dictionary needs to be accessed through the idndex, then find id with .id
        // this gets id for index 0

    d3.json("../samples.json").then((data) => {

        // need to access the sample data section
        var sampleData = data.samples;

        // looping through each dictionary in the data
        for (var i = 0; i < sampleData.length; i++) {
            if(sampleData[i].id == idSelection){

                index = i;

                // removing the current values in the demographic panel
                var currentInfo = d3.select("#sample-metadata").selectAll("h5");
                console.log("currentInfo")
                console.log(currentInfo)

                currentInfo.remove();

                // d3.select("#sample-metadata")
                //     .selectAll("h5")
                //     .exit()
                //     .remove();

                // Object.entries(demographicPanel).forEach(([key, value]) => {
                //     demographicPanel.selectAll("h5").exit().remove(); //text(`${key}: ${value}`);
                // })

                // Updating the plots with the index value based on the selected id
                startingPlots(index);
                // Updating the demographic panel with the index value based on the selected id
                demographic(index);
                // updating gauge chart
                extra(index);

            
            }
    }

    // this seems to update plots well but the metadata panel adds to what is there
    // so need to somehome remove what is there first


        // for (var i = 0; i < sampleData.length; i++) {
        //     if(sampleData[i].id == $(this).attr("value")){

        //         index = i;
        //         startingPlots(index);
        //         demographic(index);
        //     }
        // }


    });

};



