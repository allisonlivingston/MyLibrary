import React, { Component } from 'react';
import './App.css';
import FinishedBooks from './Components/FinishedBooks'
import ToReadList from './Components/ToReadList'
import Header from './Components/Header'
import Footer from './Components/Footer'

class App extends Component {

constructor(props) {
  super(props)
  this.state = {
    books: []
  }
}

componentDidMount(){
  fetch('https://dry-meadow-55679.herokuapp.com/books')
  .then(response => response.json())
  .then(data => {
    this.setState({
      books: data
    })
  })
}


// handleClick = () => {
//   this.setState({
//     finished: !this.state.finished
//   })
//   console.log(this.state.finished);
// }


  render() {
    return (
      <div className="body">
        <Header />
        <section>
          <h1>My Library</h1>
          <main className="book-lists">
            <FinishedBooks books={this.state.books}/>
            <ToReadList />
          </main>
        </section>
        <Footer />
      </div>
    )
  }
}

export default App;
