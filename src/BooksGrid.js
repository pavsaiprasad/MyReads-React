import React, {Component} from 'react'

function ListItem(props){
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

 function BooksFullList(props) {
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

class BooksGrid extends Component{
    render(){
        return(
            <BooksFullList books={this.props.books} filter={this.props.filter} onUpdateBookShelf={this.props.onUpdateBookShelf}/>
        )
    }
}

export default BooksGrid;