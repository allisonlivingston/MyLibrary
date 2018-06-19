import React from 'react'

class FinishedBooks extends React.Component {

    state = {
      removeBook: true,
      removeBookName: 'Remove A Book',
      editBookName: 'Edit A Book',
      updateBook: false,
      showRadios: false,
      deleteBook: false,
      editBook: true,
      selectedBookId: null,
      selectedBookTitle: '',
      selectedBookAuthor: '',
      selectedBookGenre: '',
      booksRead: []
    }

    showRadioButtons = (event) => {
      event.preventDefault()
      this.setState({
        showRadios: !this.state.showRadios,
        deleteBook: !this.state.deleteBook,
        editBook: !this.state.editBook,
        selectedBookId: null
      })
      event.target.innerText === 'Cancel' ? this.setState({ removeBookName: 'Remove A Book' }) : this.setState({ removeBookName: 'Cancel' })
    }

    selectBook = (event) => {
      this.setState({
        selectedBookId: parseInt(event.target.id)
      })
    }

    fillUpdateForm = (event) => {
      setTimeout(() => {
        for(let i=0; i<this.props.books.length; i++) {
          if(parseInt(this.state.selectedBookId) === parseInt(this.props.books[i].id)) {
            this.setState({
              selectedBookTitle: this.props.books[i].name,
              selectedBookAuthor: this.props.books[i].author,
              selectedBookGenre: this.props.books[i].genre
            })
          }
        }
      }, 10)
    }

    handleInputChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    updateBook = (event) => {
      event.preventDefault()
      const url = `https://dry-meadow-55679.herokuapp.com/booksread/${this.state.selectedBookId}`
      const postData = {
        name: this.state.selectedBookTitle,
        author: this.state.selectedBookAuthor,
        genre: this.state.selectedBookGenre
      }
      fetch(url, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(postData),
      })
      .then(response => response.json())
      .then(booksRead => {
        this.props.fetchBooksRead(booksRead)
      })
      .then(this.resetForm())
    }

    resetForm = () => {
      this.setState({
        removeBookName: 'Remove A Book',
        editBookName: 'Edit A Book',
        editBook: true,
        removeBook: true,
        showRadios: false,
        deleteBook: false,
        updateBook: false,
        selectedBookId: null,
        booksRead: []
      })
    }

    editBookButton = (event) => {
      event.preventDefault()
      this.setState({
        showRadios: !this.state.showRadios,
        removeBook: !this.state.removeBook,
        updateBook: !this.state.updateBook,
        selectedBookId: null
      })
      event.target.innerText === 'Cancel' ? this.setState({ editBookName: 'Edit A Book'}) : this.setState({ editBookName: 'Cancel'})
    }

    deleteBook = (event) => {
      event.preventDefault()
      let deletedURL = `https://dry-meadow-55679.herokuapp.com/booksread/${this.state.selectedBookId}`
      fetch(deletedURL, {
        method: 'DELETE',
        mode: 'CORS'
      })
      .then(response => response.json())
      .then(booksRead => this.props.fetchBooksRead(booksRead))
      .then(this.resetForm())
    }

  render() {
    const showRadios = this.state.showRadios
    const removeBook = this.state.removeBook
    const deleteBook = this.state.deleteBook
    const editBook = this.state.editBook
    const updateBook = this.state.updateBook
    return(
      <div className="book-list-div">
        <h2>Books I've Read</h2>
        <section className="books-to-read-sec">
          {this.props.books.map((book, index) => {
            return(
              <div key={index} className="books-list">
                <section className="books-list-name">
                  {showRadios && <input type="radio" name="bookToRead" id={book.id} value={book.name} onClick={(event) => {this.selectBook(event) ; this.fillUpdateForm(event)}} />}
                  <p>{book.name}</p>
                </section>
                {this.state.selectedBookId === book.id && <div id={book.id} className="book-update-fields">
                  <label>Book Title</label>
                  <input name="selectedBookTitle" value={this.state.selectedBookTitle} onChange={this.handleInputChange}></input>
                  <label>Author</label>
                  <input name="selectedBookAuthor" value={this.state.selectedBookAuthor} onChange={this.handleInputChange}></input>
                  <label>Genre</label>
                  <input name="selectedBookGenre" value={this.state.selectedBookGenre} onChange={this.handleInputChange}></input>
                </div>}
              </div>
            )
          })}
        </section>
        <section className="edit-book-buttons-section">
          {removeBook && <button onClick={this.showRadioButtons}>{this.state.removeBookName}</button>}
          {deleteBook && <button onClick={this.deleteBook}>Remove The Selected Book</button>}
          {editBook && <button onClick={this.editBookButton}>{this.state.editBookName}</button>}
          {updateBook && <button onClick={this.updateBook}>Update Book</button>}
        </section>

      </div>
    )
  }
}

export default FinishedBooks
