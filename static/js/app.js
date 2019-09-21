function buildData() {

    // Use `d3.json` to fetch the metadata for a sample
    let endpoint = '/coordinates';
    d3.json(endpoint).then(function(data){
      console.log(data);
      // Use d3 to select the panel with id of `#sample-metadata`
      coordinateDataContent = d3.select('#coordinates_data');
      // Use `.html("") to clear any existing metadata
      coordinateDataContent.html('');
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.

      coordinateDataContent.append('p').text("coordinates");
      data = data.coordinates;
      for (let i = 0; i < data.length; i++) {
        // coordinateData[i] is each inner list -> [key, value]
        // create a text string: 'key: value'
        let string = data[i][0] + ': ' + data[i][1];
        // create a paragraph or text element to contain this string
        coordinateDataContent.append('p').text(string);

      }
    });
}

buildData();