//set margins
// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 30, left: 60},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


//create svg object
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// d3 to select data
d3.csv("../data/data.csv").then(function(data) {
    //.row(function(d) {return {key: d.key, value: +d.value}; })
    //.get(function(error, rows) {console.log(rows); })
    console.log(data);

    var x = d3.scaleLinear()
        .domain([0, 24])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
      .domain([0, 28])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", d => x(d.poverty))
      .attr("cy", d => y(d.healthcare))
      .attr("r", 12)
      .style("fill", "blue")
      .attr("opacity", "0.5");
}).catch(function(error) {
  console.log(error);
});