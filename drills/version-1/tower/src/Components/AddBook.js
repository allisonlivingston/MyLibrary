import React from 'react'
const url = 'https://dry-meadow-55679.herokuapp.com/'

class AddBook extends React.Component {

  state = {
    name: '',
    author: '',
    genre: '',
    timesRead: 0,
    showFields: false
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  toggleFields = (event) => {
    event.target.value === 'true' ? this.setState({ showFields: true }) : this.setState({ showFields: false })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      name: event.target.name.value
    })
    event.target.read.value === 'true' ? fetch(url+'booksread', {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        author: this.state.author,
        genre: this.state.genre,
        times_read: this.state.timesRead,
        enjoyed: this.state.enjoyed
      }),
      headers: ({
        'content-type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(booksRead => this.props.fetchBooksRead(booksRead))
      .then(this.resetForm()) : fetch(url+'booksunread', {
        method: 'POST',
        body: JSON.stringify({
          name: this.state.name,
          author: this.state.author,
          genre: this.state.genre
        }),
        headers: ({
          'content-type': 'application/json'
        })
      })
      .then(response => response.json())
      .then(booksUnread => {
        this.props.fetchBooksUnread(booksUnread)
      })
      .then(this.resetForm())
  }

  resetForm = () => {
    this.setState({
      name: '',
      author: '',
      genre: '',
      enjoyed: true,
      timesRead: 0,
      showFields: false
    })
  }

  render(){
    const showFields = this.state.showFields
    return(
      <div className="add-book">
        <h2>Add A Book to the List</h2>
        <form className="add-book-form" onSubmit={this.handleSubmit}>
          <label name="title" value="name">Book Name</label>
          <input className="add-book-input" type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
          <label name="author" value="author">Author</label>
          <input className="add-book-input" type="text" name="author" value={this.state.author} onChange={this.handleInputChange} />
          <label name="genre" value="genre">Genre</label>
          <input className="add-book-input" type="text" name="genre" value={this.state.genre} onChange={this.handleInputChange} />
          <div>
            <label name="read">Have You Read This Book?</label>
            <label name="read">Yes</label>
            <input className="add-book-input" type="radio" name="read" value="true" onClick={this.toggleFields}/>
            <label name="unread">No</label>
            <input className="add-book-input" type="radio" name="read" value="false" onClick={this.toggleFields}/>
          </div>
          {showFields && <div className="if-read">
            <section>
              <label name="timesread">Number of Times Read</label>
              <input name="timesRead" onChange={this.handleInputChange} />
            </section>
            <section>
              <label name="enjoyed">Would You Recommend This Book?</label>
              <label name="enjoyed">Yes</label>
              <input type="radio" name="enjoyed" value="true" onChange={this.handleInputChange} />
              <label name="unread">No</label>
              <input type="radio" name="enjoyed" value="false" onChange={this.handleInputChange} />
            </section>
          </div>}
          <button className="add-book-button" type="submit" name="submit" value="Add Book">Add Book</button>
        </form>
      </div>
    )
  }
}

export default AddBook
