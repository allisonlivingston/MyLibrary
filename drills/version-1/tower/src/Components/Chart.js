import React, { Component } from 'react';
import { VictoryBar, VictoryContainer, VictoryChart} from 'victory';

class Chart extends Component {
  render() {
    return (
      <div className="book-chart">
        <h2>Book Totals</h2>
        <VictoryChart
          domainPadding={100}
        >
          <VictoryBar
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{ data: { fill: "#25A994" } }}
            categories={{ x: ["Books Read", "Books Unread"] }}
            data={[{x: 1, y: this.props.booksRead.length}, {x: 2, y: this.props.booksUnread.length}]}
            domain={{ x: [0, 2] }}
            barRatio={0.5}
          />
        </VictoryChart>
      </div>

    )
  }
}

export default Chart
