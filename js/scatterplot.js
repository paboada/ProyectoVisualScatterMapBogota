/* global d3, handleMouseOver, handleMouseOut */

function draw_scatter(){
    
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]); 

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom"); 

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
   
d3.tsv("Datos/data.tsv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.Comparendos = +d.Comparendos;
    d.Siniestros = +d.Siniestros;
  });

  x.domain(d3.extent(data, function(d) { return d.Comparendos; })).nice();
  y.domain(d3.extent(data, function(d) { return d.Siniestros; })).nice();

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Comparendos");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Siniestros") 

  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.Comparendos); })
      .attr("cy", function(d) { return y(d.Siniestros); })
      .style("fill", function(d) { return color(d.Mes); })
      .on("mouseover",function(d) {
           console.log("movimiento de mouse");
           //console.log(d.Comparendos);
           console.log(d.Localidad);
           console.log(d.Mes);
                                    d3.select("body")
                                      .selectAll(d.Localidad)
                                      .attr("fill",color(d.Mes));
          
                                 })
      .on("mouseout", function(d) {
                                d3.select("body")
                                    .selectAll(d.Localidad)
                                    .attr("fill","#CCC");
                                 })
    ;

  /*var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate("+ 2 +"," + i * 19 + ")"; })
      ;

  legend.append("rect")
      .attr("x", width+10)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width)
      .attr("y", 9) 
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });*/
      

});
      
 
}

    


