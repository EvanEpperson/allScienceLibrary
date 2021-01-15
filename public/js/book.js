class Book extends React.Component {
  state = {
    name: '',
    author: '',
    fiction: '',
    image:'',
    description:'',
    isCheckedOut: false,
    books: this.props.books
  }


  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  checkOutBook = event => {
    this.setState({
      isCheckedOut: true
    })
  }

  checkInBook = event => {
    this.setState({
      isCheckedOut: false
    })
  }

  deleteBook = event => {
  axios
    .delete('/books/' + event.target.value)
    .then(response => {
      this.setState({
        books: response.data
      })
    })
}

  updateBook = event => {
    event.preventDefault()
    event.target.reset()
    const id = event.target.id
    axios
     .put('/books/' + id, this.state)
     .then(response => {
        this.setState({
          books: response.data,
          name: '',
          author: '',
          fiction: '',
          image: '',
          description:'',
          isCheckedOut: false,
        })
      })
  }

  componentDidMount = () => {
    axios
      .get('/books')
      .then((response) => {
        this.setState({
          books: response.data
        })
      })
  }

  render = () => {
    return (

      <ul>
        {this.state.books.map((book) => {
          return (
            <li key={book.id} className="mapLi">
              <p className="mapPName"> {book.name}</p> <br />
              <p className="mapPName"> {book.author}</p> <br />
              <p className="mapPName"> {book.fiction}</p> <br />
              <p className="mapPName">{book.description}</p> <br />
              <details className="mapDetails">
                <summary className="mapSummary">Edit this Book</summary>
                <form id={book._id} onSubmit={this.updateBook}>
                  <label htmlFor="name">Name</label>
                  <br />
                  <input type="text" id="name" onChange={this.handleChange} />
                  <br />
                  <label htmlFor="author">Author</label>
                  <br />
                  <input
                    type="text"
                    id="author"
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="fiction">Fiction Type</label>
                  <br />
                  <input
                    type="text"
                    id="fiction"
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="image">Image</label>
                  <br />
                  <input
                    type="text"
                    id="image"
                    onChange={this.handleChange}
                  />
                  <br />
                  <label htmlFor="description">Description</label>
                  <br />
                  <input
                    type="text"
                    id="description"
                    onChange={this.handleChange}
                  />
                  <br />
                  <input
                    type="hidden"
                    id="isCheckedOut"
                    onChange={this.handleChange}
                    value={false}
                  />
                  <br />
                  <br />
                  <input className="inputEditButton" type="submit" value="Update Book" />
                </form>
              </details>
              <img src={book.image} alt={book.name} />
              <button className="deleteButton" value={book._id} onClick={this.deleteBook}>
                DELETE
              </button>
              {this.props.isCheckedOut === false &&
              <button className="checkOutButton" value={book._id} onClick={this.checkOutBook}>Check Out This Book</button>
              }
              {this.props.isCheckedOut === true &&
              <button className="checkInButton" value={book._id} onClick={this.checkInBook}>Check In This Book</button>
              }
            </li>
          );}
        )}
      </ul>
    )
  }
}
