import React, {Component} from 'react'
import * as d3 from 'd3'
import {nodes, links} from './GraphSeed'

class ForceDirectedGraph extends Component {
  componentDidMount() {
    const svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

    const tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "rgba(255, 140, 0, 0.85)")
    .style("font", "300 1.0em Helvetica Neue")
    .style("padding", "5px")
    .style("border-radius", "5px")
    .style("z-index", "10")
    .text("a simple tooltip");

    const color = d3.scaleOrdinal()
      .range(["red", "green", "blue", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

    const dragstarted = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    const dragged = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    const dragended = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    const runner = (nodes, links) => {

      const link = svg.append("g")
          .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
          .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

      const node = svg.append("g")
          .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
          .attr("r", 5)
          .attr("fill", (d) => color(d.group))
          .on("mouseover", function(d){ tooltip.text(d.id); return tooltip.style("visibility", "visible")})
          .on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");})
          .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));

      node.append("title")
          .text(function(d) { return d.id; })

      const ticked = () => {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
      }

      simulation
          .nodes(nodes)
          .on("tick", ticked);

      simulation.force("link")
          .links(links);
    }
    runner(nodes, links)
  }
  render() {
    return (
      <div>
        <p className="caption">This simple force-directed graph shows character co-occurence in Les Misérables.</p>
        <svg width="960" height="600" />
      </div>
    )
  }
}

export default ForceDirectedGraph
