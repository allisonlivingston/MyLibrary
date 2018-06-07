import React from 'react'

class ToReadList extends React.Component {
  render(){
    return(
      <div>
        <h2>Books I Want to Read</h2>
        <ul className="unread-books">
          {this.props.books.map(book => {
            return(
              <a href="">{book.name}</a>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default ToReadList
