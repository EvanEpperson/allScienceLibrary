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

      if ($content.length > 1) {
        var $navPrev = $('<span class="bk-page-prev">&lt;</span>'),
          $navNext = $('<span class="bk-page-next">&gt;</span>');

        // $page.append($("<nav></nav>").append($navPrev, $navNext));

        $navPrev.on("click", function () {
          if (current > 0) {
            --current;
            $content
              .removeClass("bk-content-current")
              .eq(current)
              .addClass("bk-content-current");
          }
          return false;
        });

        $navNext.on("click", function () {
          if (current < $content.length - 1) {
            ++current;
            $content
              .removeClass("bk-content-current")
              .eq(current)
              .addClass("bk-content-current");
          }
          return false;
        });
      }
    });
  }


  componentDidMount = () => {
    axios.get("/books").then((response) => {
      this.setState({
        books: response.data,
      });
    });
  };

  render = () => {
    return (
      <ul id="bk-list" className="bk-list clearfix">
        {this.state.books.map((book) => {
          return (
            <li key={book._id} className="mapLi">
              <div className="bk-book book-1 bk-bookdefault">
                <div className="bk-front">
                  <div className="bk-cover-back"></div>
                  <div className="bk-cover">
                    {/* works but needs more work in css for it to match with every book  */}
                    {/* <img src={book.image} alt={book.name} /> */}
                    <h2>
                      <span>{book.author}</span>
                      <span>{book.name}</span>
                    </h2>
                  </div>
                </div>
                {/* inside of the book maybe need to make another discription if we want to keep this feature */}
                <div className="bk-page">
                  <div className="bk-content bk-content-current">
                    <p>{book.description}</p>
                  </div>
                  <div className="bk-content">
                    <p>{book.description}</p>
                  </div>
                  <div className="bk-content">
                    <p>{book.description}</p>
                  </div>
                </div>


                {/* inside of the book  */}
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
                <button className="bk-bookback" onClick={this.bookFlip}>
                  Flip
                </button>
                <button className="bk-bookview" onClick={this.bookFlip}>View inside</button>
                <h3>
                  <span>Anthony Burghiss</span>
                  <span>A Catwork Orange</span>
                </h3>
                <p>
                  Social prophecy? Black comedy? Study of freewill? A Clockwork
                  Orange is all of these. It is also a dazzling experiment in
                  language, as Burghiss creates a new language - 'meow', the cat
                  slang of a not-too-distant future.
                </p>
              </div>
                {/* <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
		            <script src="newbook.js"></script>
		            <script>
			            $(function() {

				              Books.init()

			            });
		            </script> */}

              {/* regular code that i may have to delete later on  */}
              {/* keeping this down  */}
              {/* <p className="mapPName"> {book.name}</p> <br />
              <p className="mapPName"> {book.author}</p> <br />
              <p className="mapPName"> {book.fiction}</p> <br />
              <p className="mapPName">{book.description}</p> <br /> */}
              <details className="mapDetails">
                <summary className="mapSummary">Edit this Book</summary>
                <form id={book._id} onSubmit={this.updateBook}>
                  <label htmlFor="name">Name</label>
                  <br />
                  <input type="text" id="name" onChange={this.testing} />
                  <br />
                  <label htmlFor="author">Author</label>
                  <br />
                  <input type="text" id="author" onChange={this.handleChange} />
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
                  <input type="text" id="image" onChange={this.handleChange} />
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
                  <input
                    className="inputEditButton"
                    type="submit"
                    value="Update Book"
                  />
                </form>
              </details>
              <img src={book.image} alt={book.name} />
              <div className="bk-info">
                <button className="bk-bookback">Flip</button>
                <button className="bk-bookview">View inside</button>
                {/* <h3>
								<span>Anthony Burghiss</span>
								<span>A Catwork Orange</span>
							</h3>
							<p>Social prophecy? Black comedy? Study of freewill? A Clockwork Orange is all of these. It is also a dazzling experiment in language, as Burghiss creates a new language - 'meow', the cat slang of a not-too-distant future.</p>
						</div>  */}
              </div>
              {/* delete button  */}
              {/* <button
                className="deleteButton"
                value={book._id}
                onClick={this.deleteBook}
              >
                DELETE
              </button>
              {this.props.isCheckedOut === false && (
                <button
                  className="checkOutButton"
                  value={book._id}
                  onClick={this.checkOutBook}
                >
                  Check Out This Book
                </button>
              )}
              {this.props.isCheckedOut === true && (
                <button
                  className="checkInButton"
                  value={book._id}
                  onClick={this.checkInBook}
                >
                  Check In This Book
                </button>
              )} */}
            </li>
          );
        })}
      </ul>
    );
  };
}
