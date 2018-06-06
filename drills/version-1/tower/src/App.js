import React, { Component } from 'react';
import './App.css';
import FinishedBooks from './Components/FinishedBooks'

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


handleClick = () => {
  this.setState({
    finished: !this.state.finished
  })
  console.log(this.state.finished);
}





  render() {
    return (
      <div className="App">
        <section>
          <h1>Library </h1>
          <label>Have I Read This Book Yet?</label>
          <div>
            {this.state.books.map(book => {
              return(
                <a href="">{book.name}</a>
              )
            })}
          </div>
          <input type="checkbox" onClick={this.handleClick} />
        </section>
        <FinishedBooks />
      </div>
    );
  }
}

export default App;
