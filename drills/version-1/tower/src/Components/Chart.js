import React from 'react'

class Chart extends React.Component {
  render(){
    return(
      <section className="chart-section">
        <canvas id="myChart" width="400" height="400"></canvas>
        <script>
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ["2014", "2015", "2016"],
            datasets: [{
              data: [73, 199, 395],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Graduates'
                },
                ticks: {
                  beginAtZero:true
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Year of Graduation'
                }
              }]
            }
          }
        })
        </script>
      </section>
    )
  }
}

export default Chart
