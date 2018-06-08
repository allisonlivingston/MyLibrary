import React from 'react'

class FinishedBooks extends React.Component {
  render() {
    return(
      <div>
        <h2>Books I've Read</h2>
        <ul>
          {this.props.books.map((book, index) => {
            return(
              <li key={index}>{book.name}</li>
            )
          })}
        </ul>

      </div>
    )
  }
}

export default FinishedBooks
