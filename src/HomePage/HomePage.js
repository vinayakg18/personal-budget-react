import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Chart as ChartJS } from "chart.js/auto";
import * as d3 from "d3";
import { pie, arc } from "d3-shape";


function HomePage() {
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  useEffect(() => {
    const dataSource = {
      datasets: [
        {
          data: [],
          backgroundColor: [
            '#6FC3DF',
            '#9A5DFA',
            '#FFA800',
            '#73E8D0',
            '#FF5F6D',
            '#60C4A8',
            '#E68FFF'
          ],
        },
      ],
      labels: [],
    };

    function createChart() {
      var ctx = canvasRef.current.getContext("2d");
      var myPieChart = new ChartJS(ctx, { 
        type: "pie",
        data: dataSource,
      });
    }

    function getBudget() {
      axios.get("/data.json").then(function (res) {
        console.log(res);
        for (var i = 0; i < res.data.myBudget.length; i++) {
          dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
          dataSource.labels[i] = res.data.myBudget[i].title;
        }
        createChart();
        createD3Chart(res.data.myBudget);
      }).catch(function (error) {
        console.error("Error fetching budget data: ", error);
      });
    }
    function randomData(budgetData) {
        return budgetData.map(function (data) {
          return { label: data.title, value: data.budget };
        });
      }
    

    
      function createD3Chart(data) {
        const svg = d3.select(svgRef.current);
      

        const width = 500;
        const height = 500;
        const radius = Math.min(width, height) / 2;
      

        svg.attr("width", width).attr("height", height);
      

        const g = svg
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);
      
   
        const color = d3
          .scaleOrdinal()
          .domain(data.map((d) => d.title))
          .range(["#ccff66", "#ff0066", "#00ff00", "#6600ff", "#003300", "#ff0000", "#ff8c00"]);
    
      
  
        const pieGenerator = pie().value((d) => d.budget);
      

        const pathGenerator = arc()
          .outerRadius(radius * 0.6)
          .innerRadius(radius * 0.3);
      

        const arcs = pieGenerator(data);
      

        const arcPaths = g
          .selectAll("path")
          .data(arcs)
          .enter()
          .append("path")
          .attr("d", pathGenerator)
          .attr("fill", (d) => color(d.data.title))
          .attr("stroke", "white")
          .style("stroke-width", "2px");
      

        g.attr("transform", `translate(${width / 2},${height / 2})`);
      
        console.log("SVG Width:", width);
        console.log("SVG Height:", height);
      }

    getBudget();
  }, []);

  return (
      <><><><div className="container center" id="main">

          <div className="page-area">

              <div className="text-box">
                  <h1>Stay on track</h1>
                  <p>
                      Do you know where you are spending your money? If you really stop to track it down,
                      you would get surprised! Proper budget management depends on real data... and this
                      app will help you with that!
                  </p>
              </div>

              <div className="text-box">
                  <h1>Alerts</h1>
                  <p>
                      What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                  </p>
              </div>

              <div className="text-box">
                  <h1>Results</h1>
                  <p>
                      People who stick to a financial plan, budgeting every expense, get out of debt faster!
                      Also, they to live happier lives... since they expend without guilt or fear...
                      because they know it is all good and accounted for.
                  </p>
              </div>

              <div className="text-box">
                  <h1>Free</h1>
                  <p>
                      This app is free!!! And you are the only one holding your data!
                  </p>
              </div>

              <div className="text-box">
                  <h1>Stay on track</h1>
                  <p>
                      Do you know where you are spending your money? If you really stop to track it down,
                      you would get surprised! Proper budget management depends on real data... and this
                      app will help you with that!
                  </p>
              </div>

              <div className="text-box">
                  <h1>Alerts</h1>
                  <p>
                      What if your clothing budget ended? You will get an alert. The goal is to never go over the budget.
                  </p>
              </div>

              <div className="text-box">
                  <h1>Results</h1>
                  <p>
                      People who stick to a financial plan, budgeting every expense, get out of debt faster!
                      Also, they to live happier lives... since they expend without guilt or fear...
                      because they know it is all good and accounted for.
                  </p>
              </div>

              <div className="text-box">
                  <h1>Chart</h1>
                  <p>
                  <canvas ref={canvasRef} width="400" height="400"></canvas>
                     
                  </p>
              </div>
              <div className="new" id="this">
                  <h1>D3JS chart</h1>
                  <svg ref={svgRef} width={900} height={900}></svg>
              </div>
          </div>

      </div>

          <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.0/axios.min.js" integrity="sha512-aoTNnqZcT8B4AmeCFmiSnDlc4Nj/KPaZyB5G7JnOnUEkdNpCZs1LCankiYi01sLTyWy+m2P+W4XM+BuQ3Q4/Dg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script></>
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
          <script src="http://d3js.org/d3.v3.min.js"></script></>
         
          </>
  );
}

export default HomePage;