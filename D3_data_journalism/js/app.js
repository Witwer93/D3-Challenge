//set margins
// set the dimensions and margins of the graph
var margin = {top: 20, right: 40, bottom: 60, left: 100},
    width = 750 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;


//create svg object
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  
var chartGroup =  svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// d3 to select data
d3.csv("../data/data.csv").then(function(data) {
    //.row(function(d) {return {key: d.key, value: +d.value}; })
    //.get(function(error, rows) {console.log(rows); })
    console.log(data);

    //parse data/cast as numbers
    data.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });

    //create scale functions
    var xScale = d3.scaleLinear()
        .domain([8, d3.max(data, d => d.poverty)])
        .range([0, width]);        

    var yScale = d3.scaleLinear()
      .domain([4, d3.max(data, d => d.healthcare) + 4])
      .range([height, 0]);

    //create axis functions
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    //append axes to the chart
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);


    //create circles
    svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", d => xScale(d.poverty))
      .attr("cy", d => yScale(d.healthcare))
      .attr("r", 10)
      .style("fill", "blue")
      .attr("opacity", "0.5");

    var labels = chartGroup.selectAll("null").data(data).enter().append("text");

    labels
      .attr("x", function(d) {
        return xScale(d.poverty);
      })
      .attr("y", function(d) {
        return yScale(d.healthcare);
      })
      .text(function(d) {
        return d.abbr;
      })
      .attr("font-family", "Garamond")
      .attr("font-size", "10px")
      .attr("text-anchor", "middle")
      .attr("fill", "red");

    //create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0-(height/2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width/2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .text("In Poverty (%)");
}).catch(function(error) {
  console.log(error);
});