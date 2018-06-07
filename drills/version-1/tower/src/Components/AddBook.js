import React from 'react'

class AddBook extends React.Component {
  render(){
    return(
      <div className="add-book">
        <h2>Which Books Would You Like to Add?</h2>
        <form>
          <label name="title">Book Name</label>
          <input type="text" name="book-name" />
          <label name="author">Author</label>
          <input type="text" name="author" />
          <input type="submit" name="submit" value="Add Book"/>
        </form>
      </div>
    )
  }
}

export default AddBook
