import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header'
import FinishedBooks from './Components/FinishedBooks'
import ToReadList from './Components/ToReadList'
import AddBook from './Components/AddBook'
// import Footer from './Components/Footer'
const url = 'http://localhost:3000/'

class App extends Component {

constructor(props) {
  super(props)
  this.state = {
    booksRead: [],
    booksUnread: []
  }
}

componentDidMount(){
  fetch(url+'booksread')
  .then(response => response.json())
  .then(data => {
    this.setState({
      booksRead: data.data
    })
  })

  fetch(url+'booksunread')
  .then(response => response.json())
  .then(data => {
    this.setState({
      booksUnread: data.data
    })
  })
}

submitUnreadBook = (booksUnread) => {
  this.setState({
    booksUnread:booksUnread.data})
}


removeUnreadBook = (booksUnread) => {
  this.setState({
    booksUnread:booksUnread.data
  })
}

  render() {
    return (
      <div className="body">
        <Header />
        <section>
          <h1>My Library</h1>
          <main className="book-lists">
            <FinishedBooks books={this.state.booksRead} />
            <ToReadList  removeUnreadBook={this.removeUnreadBook} list={this.state.booksUnread} />
          </main>
        </section>
        <AddBook submitUnreadBook ={this.submitUnreadBook}/>
        {/* <Footer /> */}
      </div>
    )
  }
}

export default App;
