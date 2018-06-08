import React from 'react'

class AddBook extends React.Component {

  state = {
    name: '',
    read: true
  }

  // handleClick = () => {
  //   this.setState({
  //     finished: !this.state.finished
  //   })
  //   console.log(this.state.finished);
  // }
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }


handleSubmit = (event) => {
  event.preventDefault()
  console.log(event.target.name.value)
  this.setState({
    name: event.target.name
  })
  // console.log(event.target)
  // console.log(event.target.submit[0])
  // console.log(event.target.submit[1])
  //
  //
  //
  // this.props.addBook(this.state)
  this.resetForm()




}

resetForm = () => {
  this.setState({
    name: ''
  })
}

  render(){
    return(
      <div className="add-book">
        <h2>Add A Book to the List</h2>
        <form onSubmit={this.handleSubmit}>
          <label name="title" value="name">Book Name</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
          <div>
            <label name="read">Have You Read This Book?</label>
            <label name="read">Yes</label>
            <input type="radio" name="yes" value="true" onChange={this.handleInputChange}/>
            <label name="unread">No</label>
            <input type="radio" name="yes" value="false" onChange={this.handleInputChange}/>
          </div>


          <input type="submit" name="submit" value="Add Book" onChange={this.handleInputChange}/>

        </form>
      </div>
    )
  }
}

export default AddBook
