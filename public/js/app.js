class App extends React.Component {
  state = {
    name: '',
    author: '',
    fiction: '',
    image:'',
    description:'',
    isCheckedOut: false,
    books:[]
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios
    .post('/books', this.state)
    .then((response) =>
      this.setState({
        books: response.data,
        name: '',
        author: '',
        fiction: '',
        image: '',
        description:'',
        isCheckedOut: false,
      })
    )
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
      <div>
        <h2>Add a Book to the Library</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" onChange={this.handleChange} value={this.state.name}/>
          <br />
          <label htmlFor="author">Author</label>
          <input type="text" id="author" onChange={this.handleChange} value={this.state.author}/>
          <br />
          <label htmlFor="fiction">fiction Type</label>
          <input type="text" id="fiction" onChange={this.handleChange} value={this.state.fiction}/>
          <br />
          <label htmlFor="image">Image</label>
          <input type="text" id="image" onChange={this.handleChange} value={this.state.image}/>
          <br />
          <label htmlFor="description">Description</label>
          <input type="text" id="description" onChange={this.handleChange} value={this.state.description}/>
          <br />
          <label htmlFor="isCheckedOut">Name</label>
          <input type="hidden" id="isCheckedOut" onChange={this.handleChange} value={false}/>
          <br />
          <input type="submit" value="Create Book" />
        </form>
        <h2>These are the Books in the Library:</h2>
        <ul>
          {this.state.books.map((book) => {
            return (
              <li key={book.id}>
                {book.name} <br/>
                {book.author} <br/>
                {book.fiction} <br/>
                {book.description} <br/>
                <details>
                  <summary>Edit this Book</summary>
                    <form id={book._id} onSubmit={this.updateBook}>
                    <label htmlFor="name">Name</label>
                    <br />
                    <input
                      type="text"
                      id="name"
                      onChange={this.handleChange}
                    />
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
                    <input type="submit" value="Update Book" />
                  </form>
                </details>
                <img src={book.image} alt={book.name} />
                <button value={book._id} onClick={this.deleteBook}>
                  DELETE
                </button>
                <button >
                  Check Out This Book
                </button>
              </li>
            )}
          })
        </ul>
      </div>
    )
  }
}



ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
