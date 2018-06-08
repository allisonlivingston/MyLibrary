import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header'
import FinishedBooks from './Components/FinishedBooks'
import ToReadList from './Components/ToReadList'
import AddBook from './Components/AddBook'
import Footer from './Components/Footer'

class App extends Component {

constructor(props) {
  super(props)
  this.state = {
    booksRead: [],
    booksUnread: []
  }
}

componentDidMount(){
  fetch('https://dry-meadow-55679.herokuapp.com/booksread')
  .then(response => response.json())
  .then(data => {
    this.setState({
      booksRead: data
    })
  })

  fetch('https://dry-meadow-55679.herokuapp.com/booksunread')
  .then(response => response.json())
  .then(data => {
    this.setState({
      booksUnread: data
    })
  })
}

addBook = (book) => {
  this.setState({
    booksUnread: this.state.booksUnread.concat(book)
  })
}

submitBook = (book) => {
  this.setState({
    booksRead: this.state.booksRead.concat(book)
  })
}


  render() {
    return (
      <div className="body">
        <Header />
        <section>
          <h1>My Library</h1>
          <main className="book-lists">
            <FinishedBooks books={this.state.booksRead}/>
            <ToReadList books={this.state.booksUnread}/>
          </main>
        </section>
        <AddBook submitBook={this.submitBook} addBook={this.addBook}/>
        <Footer />
      </div>
    )
  }
}

export default App;
