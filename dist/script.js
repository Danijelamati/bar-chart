fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").
then(response => response.json()).
then(function (response) {

  const dataset = response.data;

  const svgWidth = 925;
  const svgHeight = 500;

  const padding = 50;

  const width = svgWidth - padding * 2;
  const height = svgHeight - padding;
  const barWidth = width / dataset.length;




  const xScale = d3.scaleTime().
  domain([new Date(dataset[0][0]), new Date(dataset[dataset.length - 1][0])]).
  range([0, width]);

  const yScale = d3.scaleLinear().
  domain([0, 1000 + d3.max(dataset, x => x[1])]).
  range([height, 0]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  const svg = d3.select("svg").
  attr("width", svgWidth).
  attr("height", svgHeight);

  const tooltip = d3.tip().
  attr("id", "tooltip").
  html(x => {
    d3.select("#tooltip").attr("data-date", x[0]);
    return `Date:${x[0]} <br> GDP:${x[1]}`;
  });

  svg.call(tooltip);

  svg.selectAll("rect").
  data(dataset).
  enter().
  append("rect").
  attr("class", "bar").
  attr("data-date", x => x[0]).
  attr("data-gdp", x => x[1]).
  attr("x", (x, i) => barWidth * i + padding + 1).
  attr("y", x => yScale(x[1])).
  attr("width", barWidth).
  attr("height", x => height - yScale(x[1])).
  attr("fill", "navy").
  on('mouseover', tooltip.show).
  on('mouseout', tooltip.hide);

  svg.append("g").
  attr("id", "x-axis").
  attr("transform", "translate(" + padding + "," + height + ")").
  call(xAxis);

  svg.append("g").
  attr("id", "y-axis").
  attr("transform", "translate(" + padding + ", 0)").
  call(yAxis);

});