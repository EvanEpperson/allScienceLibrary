

class Book extends React.Component {
  state = {
    name: "",
    author: "",
    fiction: "",
    image: "",
    description: "",
    isCheckedOut: false,
    books: this.props.books,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  checkOutBook = (event) => {
    this.setState({
      isCheckedOut: true,
    });
  };

  checkInBook = (event) => {
    this.setState({
      isCheckedOut: false,
    });
  };

  deleteBook = (event) => {
    axios.delete("/books/" + event.target.value).then((response) => {
      this.setState({
        books: response.data,
      });
    });
  };

  updateBook = (event) => {
    event.preventDefault();
    event.target.reset();
    const id = event.target.id;
    axios.put("/books/" + id, this.state).then((response) => {
      this.setState({
        books: response.data,
        name: "",
        author: "",
        fiction: "",
        image: "",
        description: "",
        isCheckedOut: false,
      });
    });
  };

  bookFlip = function init() {
      var $books = $("#bk-list > li > div.bk-book"),
      booksCount = $books.length;
    $books.each(function () {
      var $book = $(this),
        $other = $books.not($book),
        $parent = $book.parent(),
        $page = $book.children("div.bk-page"),
        $bookview = $parent.find("button.bk-bookview"),
        $content = $page.children("div.bk-content"),
        current = 0;
      /////////////////flip page function only  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      $parent.find("button.bk-bookback").on("click", function () {
        $bookview.removeClass("bk-active");

        if ($book.data("flip")) {
          $book
            .data({ opened: false, flip: false })
            .removeClass("bk-viewback")
            .addClass("bk-bookdefault");
        } else {
          $book
            .data({ opened: false, flip: true })
            .removeClass("bk-viewinside bk-bookdefault")
            .addClass("bk-viewback");
        }
      });
      /////////////////view inside function only //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      $bookview.on("click", function () {
        var $this = $(this);

        $other
          .data("opened", false)
          .removeClass("bk-viewinside")
          .parent()
          .css("z-index", 0)
          .find("button.bk-bookview")
          .removeClass("bk-active");
        if (!$other.hasClass("bk-viewback")) {
          $other.addClass("bk-bookdefault");
        }

        if ($book.data("opened")) {
          $this.removeClass("bk-active");
          $book
            .data({ opened: false, flip: false })
            .removeClass("bk-viewinside")
            .addClass("bk-bookdefault");
        } else {
          $this.addClass("bk-active");
          $book
            .data({ opened: true, flip: false })
            .removeClass("bk-viewback bk-bookdefault")
            .addClass("bk-viewinside");
          $parent.css("z-index", booksCount);
          current = 0;
          $content
            .removeClass("bk-content-current")
            .eq(current)
            .addClass("bk-content-current");
        }
      });
    });
  };

  componentDidMount = () => {
    axios.get("/books").then((response) => {
      this.setState({
        books: response.data,
      });
    });
  };

  render = () => {
    return (
    <div className="main">
      <ul id="bk-list" className="bk-list clearfix">
        {this.state.books.map((book) => {
          return (
            <li key={book._id} className="mapLi">
              <div className="bk-book book-1 bk-bookdefault">
                <div className="bk-front">
                  <div className="bk-cover-back"></div>
                  <div className="bk-cover">
                    {/* works but needs more work in css for it to match with every book  */}
                    <a
                      href="https://www.barnesandnoble.com/b/nonfiction/_/N-1py2"
                      target="_blank"
                    >
                      <img src={book.image} alt={book.name} />
                    </a>
                    <h2>
                      <span></span>
                      <span></span>
                    </h2>
                  </div>
                </div>
                {/* inside of the book maybe need to make another discription if we want to keep this feature */}
                <div className="bk-page edit-title">
                  <div className="bk-content bk-content-current">
                    {/* <details className="mapDetails"> */}
                    <summary className="edit-title">Edit this Book</summary>
                    <form id={book._id} onSubmit={this.updateBook}>
                    <div className="form-floating">
                      <input type="text" id="name" className="input-box-edit form-control" onChange={this.handleChange} value={this.state.name} placeholder="Name" required/>
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating">
                      <input type="text" id="author" className="form-control input-box-edit" onChange={this.handleChange} value={this.state.author} placeholder="Author" required/>
                      <label htmlFor="author">Author</label>
                    </div>
                    <div className="form-floating">
                      <select className="form-select input-box-edit" id="fiction" aria-label="Floating label select " onChange={this.handleChange} value={this.state.fiction} required>
                        <option selected></option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                      </select>
                      <label htmlFor="fiction">Fiction Type</label>
                    </div>
                    <div className="form-floating">
                      <input type="text" id="image" className="form-control input-box-edit" onChange={this.handleChange} value={this.state.image} placeholder="Image"/>
                      <label htmlFor="image">Image</label>
                    </div>
                    <div className="form-floating">
                      <input id="description" className="form-control input-box-edit" onChange={this.handleChange} value={this.state.description} placeholder="Description"/>
                      <label htmlFor="description">Description</label>
                    </div>
                      <input
                        type="hidden"
                        id="isCheckedOut"
                        onChange={this.handleChange}
                        value={false}
                      />
                      <input
                        className="inputEditButton btn btn-outline-info"
                        type="submit"
                        value="Update Book"
                      />
                    </form>
                    <button
                      className="deleteButton btn btn-outline-info"
                      value={book._id}
                      onClick={this.deleteBook}
                    >
                      DELETE
                    </button>
                    {/* </details> */}
                  </div>
                  <div className="bk-content">
                    <p>{book.description}</p>
                  </div>
                  <div className="bk-content">
                    <p>{book.description}</p>
                  </div>
                </div>

                {/* inside of the book */}
                <div className="bk-back">
                  <p>{book.description}</p>
                </div>
                <div className="bk-right"></div>
                <div className="bk-left">
                  <h2>
                    <span>{book.author}</span>
                    <span>{book.name}</span>
                  </h2>
                </div>
                <div className="bk-top"></div>
                <div className="bk-bottom"></div>
              </div>
              <div className="bk-info">
                <button
                  className="bk-bookback"
                  onClick={this.bookFlip}
                >
                  Flip
                </button>
                <button className="bk-bookview" onClick={this.bookFlip}>
                  View inside
                </button>
                <h3 className="authorName">
                  <span>{book.author}</span>
                  <span>{book.name}</span>
                </h3>
              </div>

              {this.state.isCheckedOut === false && (
                <button
                  className="checkOutButton"
                  value={book._id}
                  onClick={this.checkOutBook}
                >
                  Check Out This Book
                </button>
              )}
              {this.state.isCheckedOut === true && (
                <button
                  className="checkInButton"
                  value={book._id}
                  onClick={this.checkInBook}
                >
                  Check In This Book
                </button>

              )}
            </li>
          );
        })}
      </ul>
    </div>
    );
  };
}
