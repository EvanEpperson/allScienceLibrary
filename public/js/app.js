

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
    axios.post('/books', this.state).then((response) =>
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
        <div className="d-grid gap-2 d-md-flex justify-content-md-end dropstart">
          <button className="btn btn-outline-info create-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Add a New Book
          </button>
          <div className="collapse" id="collapseExample">
            <div className="card card-body create-form-card create-form" >
              <form onSubmit={this.handleSubmit}>
                <div className="form-floating mb-3">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" className="input-box form-control" onChange={this.handleChange} value={this.state.name} required/>
                </div>
                <br />
                <div className="form-floating mb-3">
                  <label htmlFor="author">Author</label>
                  <input type="text" id="author" className="form-control input-box" onChange={this.handleChange} value={this.state.author} required/>
                </div>
                <br />
                <div className="form-floating">
                  <select className="form-select input-box" id="fiction" aria-label="Floating label select " onChange={this.handleChange} value={this.state.fiction} required>
                    <option selected></option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                  </select>
                  <label htmlFor="fiction">Fiction Type</label>
                </div>
                <br />
                <div className="form-floating mb-3">
                  <label htmlFor="image">Image</label>
                  <input type="text" id="image" className="form-control input-box" onChange={this.handleChange} value={this.state.image}/>
                </div>
                <br />
                <div className="form-floating mb-3">
                  <label htmlFor="description">Description</label>
                  <textarea id="description" className="form-control input-box" onChange={this.handleChange} value={this.state.description}>
                  </textarea>
                </div>
                <br />
                <input type="hidden" id="isCheckedOut" onChange={this.handleChange} value={false}/>
                <br />
                <input className="btn btn-outline-info create-button" type="submit" value="Create Book" />
              </form>
            </div>
          </div>
        </div>
        <h2 className="these">These are the Books in the Library:</h2>
        <Book name={this.state.name} author={this.state.author} fiction={this.state.fiction} image={this.state.image} description={this.state.description} books={this.state.books}></Book>
      </div>
    )
  }
}



ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
