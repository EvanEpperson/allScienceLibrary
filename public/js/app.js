

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
      <div className="main">
        <h2>Add a Book to the Library</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" onChange={this.handleChange} value={this.state.name} required/>
          <br />
          <label htmlFor="author">Author</label>
          <input type="text" id="author" onChange={this.handleChange} value={this.state.author} required/>
          <br />
          <label htmlFor="fiction">Fiction Type</label>
          <input type="text" id="fiction" onChange={this.handleChange} value={this.state.fiction} required/>
          <br />
          <label htmlFor="image">Image</label>
          <input type="text" id="image" onChange={this.handleChange} value={this.state.image}/>
          <br />
          <label htmlFor="description">Description</label>
          <input type="text" id="description" onChange={this.handleChange} value={this.state.description}/>
          <br />
          <input type="hidden" id="isCheckedOut" onChange={this.handleChange} value={false}/>
          <br />
          <input type="submit" value="Create Book" />
        </form>
        <h2>These are the Books in the Library:</h2>
        <Book name={this.state.name} author={this.state.author} fiction={this.state.fiction} image={this.state.image} description={this.state.description} books={this.state.books}></Book>
      </div>
    )
  }
}



ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
