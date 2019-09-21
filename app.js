function buildData(data) {
  
    // Use `d3.json` to fetch the metadata for a sample
    let endpoint = '/coordinates';
    d3.json(endpoint).then(function(data){
      // Use d3 to select the panel with id of `#sample-metadata`
      coordinateDataContent = d3.select('#coordinates_data')
      // Use `.html("") to clear any existing metadata
      coordinateDataContent.html('');
      // Use `Object.entries` to add each key and value pair to the panel
      let coordinateData = Object.entries(data);
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
  
      for (let i = 0; i < coordinateData.length; i++) {
        // coordinateData[i] is each inner list -> [key, value]
        // create a text string: 'key: value'
        let string = coordinateData[i][0] + ': ' + coordinateData[i][1];
  
        // create a paragraph or text element to contain this string
        coordinateDataContent.append('p').text(string);
      }
  
    });
  
  }