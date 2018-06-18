import React from 'react'

class ToReadList extends React.Component {

  state = {
    showRadios: false,
    deleteBook: false,
    selectedBook: '',
    booksUnread: []
  }

  showRadioButtons = (event) => {
    event.preventDefault()
    this.setState({
      showRadios: !this.state.showRadios,
      deleteBook: !this.state.deleteBook
    })
    event.target.innerText === 'Cancel' ? event.target.innerText = 'Remove A Book' : event.target.innerText = 'Cancel'
  }

  selectBook = (event) => {
    this.setState({
      selectedBook: event.target.id
    })
  }

  resetForm = () => {
    this.setState({
      showRadios: false,
      deleteBook: false,
      selectedBook: '',
      booksUnread: []
    })
  }

  deleteBook = (event) => {
    event.preventDefault()
    let deletedURL = `http://localhost:3000/booksunread/${this.state.selectedBook}`
    fetch(deletedURL, {
      method: 'DELETE',
      mode: 'CORS'
    })
    .then(response => response.json())
    .then(booksUnread => this.props.removeUnreadBook(booksUnread))
  }

  render(){
    const showRadios = this.state.showRadios
    const deleteBook = this.state.deleteBook
    return(
      <div>
        <h2>Books I Want to Read</h2>
        <section ref="booksToReadSec">
          {this.props.list.map((book, index) => {
            return(
              <div key={index} className="books-to-read">
                {showRadios && <input type="radio" name="bookToRead" id={book.id} value={book.name} onClick={this.selectBook} />}
                <p>{book.name}</p>
              </div>
            )
          })}
        </section>
        <button onClick={this.showRadioButtons}>Remove A Book</button>
        {deleteBook && <button onClick={this.deleteBook}>Remove The Selected Book</button>}
      </div>
    )
  }
}

export default ToReadList
