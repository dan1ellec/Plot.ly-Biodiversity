




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



