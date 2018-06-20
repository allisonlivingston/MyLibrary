import React, { Component } from 'react';
import './App.css';
import Header from './Components/Header'
import FinishedBooks from './Components/FinishedBooks'
import ToReadList from './Components/ToReadList'
import AddBook from './Components/AddBook'
import Chart from './Components/Chart'
import Footer from './Components/Footer'
const url = 'https://dry-meadow-55679.herokuapp.com/'

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

fetchBooksUnread = (booksUnread) => {
  this.setState({
    booksUnread: booksUnread.data
  })
}

fetchBooksRead = (booksRead) => {
  this.setState({
    booksRead: booksRead.data
  })
}

  render() {
    return (
      <div className="body">
        <Header />
        <section>
          <h1>My Library</h1>
          <main className="book-lists">
            <FinishedBooks books={this.state.booksRead} fetchBooksRead={this.fetchBooksRead}/>
            <ToReadList list={this.state.booksUnread} fetchBooksUnread={this.fetchBooksUnread}/>
          </main>
        </section>
        <section className="bottom-section">
          <AddBook fetchBooksUnread ={this.fetchBooksUnread} fetchBooksRead={this.fetchBooksRead}/>
          <Chart booksRead={this.state.booksRead} booksUnread={this.state.booksUnread}/>
        </section>
        <Footer />
      </div>
    )
  }
}

export default App;
