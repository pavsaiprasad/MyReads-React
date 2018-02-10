import React, {Component} from 'react'
import {Link} from 'react-router-dom'

function ListItem(props) {
  const backgroundImage = props.value.imageLinks.thumbnail;
  const bookTitle = props.value.title;
  const bookAuthors = props.value.authors;
  return <li>
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${backgroundImage})` }}></div>
                <div className="book-shelf-changer">
                    <select value={props.shelf} onChange={(event) => {props.onUpdateBookShelf(props.value, event.target.value)}}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{bookTitle}</div>
                <div className="book-authors">{bookAuthors}</div>
            </div>
        </li>;
}

function BookListItems(props) {
  const books = props.books;
  const listItems = books.filter((b)=>b.shelf===`${props.filter}`).map((book) =>
    <ListItem key={book.title.toString()}
              value={book} onUpdateBookShelf={props.onUpdateBookShelf} shelf={props.filter}/> 
  );
  return (
    <ol className="books-grid">
      {listItems}
    </ol>
  );
}

class BookList extends Component{
    render(){
        const books = this.props.books;
        return(
             <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <BookListItems books={books} filter='currentlyReading' onUpdateBookShelf={this.props.onUpdateBookShelf}/>
                    </div>
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <BookListItems books={books} filter='wantToRead' onUpdateBookShelf={this.props.onUpdateBookShelf}/>
                    </div>
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <BookListItems books={books} filter='read' onUpdateBookShelf={this.props.onUpdateBookShelf}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/add">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookList;