import React, {Component} from 'react'
import * as d3 from 'd3'
import {rawData} from './PyramidSeed'
import './App.css'

class PopulationPyramid extends Component {
  componentDidMount() {
    const processedData = rawData.map((datum) => {
      return {
        year: +datum[0],
        age: +datum[1],
        sex: +datum[2],
        people: +datum[3]
      }
    })

    const margin = {top: 20, right: 40, bottom: 30, left: 20},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      barWidth = Math.floor(width / 19) - 1

    const x = d3.scaleLinear()
      .range([barWidth / 2, width - barWidth / 2]),
      y = d3.scaleLinear()
        .range([height, 0]),
      yAxis = d3.axisRight(y)
        .tickSize(-width)
        .tickFormat(function(d) { return Math.round(d / 1e6) + "M"; })

    const svg = d3.select(this.refs.anchor).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


    const birthyears = svg.append("g")
      .attr("class", "birthyears")

    // Title Text
    const title = svg.append("text")
      .attr("class", "title")
      .attr("dy", ".71em")
      .text(2000)

    const age1 = d3.max(processedData.map((datum) => {
      return datum.age
    })),
    year0 = d3.min(processedData.map((datum) => {
      return datum.year
    })),
    year1 = d3.max(processedData.map((datum) => {
      return datum.year
    }))
    let year = year1

    const yDomainUpdate = d3.max(processedData.map((datum) => {
      return datum.people
    }))
    x.domain([year1 - age1, year1])
    y.domain([0, yDomainUpdate])

    const data = d3.nest()
      .key((datum) => datum.year)
      .key((datum) => datum.year - datum.age)
      .rollup((v) => v.map((datum) => datum.people))
      .map(processedData)

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", `translate(${width},0)`)
      .call(yAxis)
      .selectAll("g")
      .filter((value)=> !value)
      .classed("zero", true)

    const birthyear = birthyears.selectAll(".birthyear")
      .data((d3.range(year0 - age1, year1 + 1, 5)))
      .enter().append("g")
      .attr("class", "birthyear")
      .attr("transform", (birthyear) => `translate(${x(birthyear)},0)`)
    birthyear.selectAll("rect")
      .data((birthyear) => (data.get(year).get(birthyear)) || [0, 0])
      .enter().append("rect")
      .attr("x", -barWidth / 2)
      .attr("width", barWidth)
      .attr("y", y)
      .attr("height", (value) => height - y(value))
      birthyear.append("text")
        .attr("y", height - 4)
        .text((birthyear) => birthyear)
      svg.selectAll(".age")
        .data(d3.range(0, age1 + 1, 5))
        .enter().append("text")
        .attr("class", "age")
        .attr("x", function(age) { return x(year - age); })
        .attr("y", height + 4)
        .attr("dy", ".71em")
        .text(function(age) { return age; })
        window.focus();
        d3.select(window).on("keydown", function() {
          switch (d3.event.keyCode) {
            case 37: year = Math.max(year0, year - 10); break
            case 39: year = Math.min(year1, year + 10); break
            default: return null
          }
          update();
        })

        function update() {
          if (!(data.has(year))) return;
          title.text(year);

          birthyears.transition()
              .duration(750)
              .attr("transform", "translate(" + (x(year1) - x(year)) + ",0)");

          birthyear.selectAll("rect")
              .data((birthyear) =>  (data.get(year).get(birthyear)) || [0, 0])
            .transition()
              .duration(750)
              .attr("y", y)
              .attr("height", function(value) { return height - y(value); });
        }
  }

  render() {
    return (
    <div ref="anchor" >
      <p className="caption">This diagram shows the distribution of age groups in the United States over the last 150 years. Use the arrow keys to observe the changing population. Data from the <a href='https://www.ipums.org/' >Minnesota Population Center</a>. Use the arrow keys to change the displayed year. The blue bars are the male population for each five-year age bracket, while the pink bars are the female population; the bars are partially transparent so that you can see how they overlap, unlike the traditional side-by-side display which makes it difficult to compare the relative distribution of the sexes.</p>
    </div>
    )
  }
}

export default PopulationPyramid
