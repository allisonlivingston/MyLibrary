import React from 'react'

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
    event.target.read.value === 'true' ? fetch('http://localhost:3000/booksread', {
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
      .then(booksRead => this.props.submitBook(booksRead))
      .then(this.resetForm()) : fetch('http://localhost:3000/booksunread', {
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
      .then(resp => resp.json())
      .then(booksUnread => {
        this.props.submitUnreadBook(booksUnread)
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
        <form onSubmit={this.handleSubmit}>
          <label name="title" value="name">Book Name</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
          <label name="author" value="author">Author</label>
          <input type="text" name="author" value={this.state.author} onChange={this.handleInputChange} />
          <label name="genre" value="genre">Genre</label>
          <input type="text" name="genre" value={this.state.genre} onChange={this.handleInputChange} />
          <div>
            <label name="read">Have You Read This Book?</label>
            <label name="read">Yes</label>
            <input type="radio" name="read" value="true" onClick={this.toggleFields}/>
            <label name="unread">No</label>
            <input type="radio" name="read" value="false" onClick={this.toggleFields}/>
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
          <input type="submit" name="submit" value="Add Book"/>
        </form>
      </div>
    )
  }
}

export default AddBook
