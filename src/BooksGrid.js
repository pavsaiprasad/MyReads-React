import React, {Component} from 'react'

/**
 * @description Builds book list items
 * @param {object} props - book props
 */
function ListItem(props){
    const backgroundImage = props.value.imageLinks? props.value.imageLinks.thumbnail : '';
    const bookTitle = props.value.title;
    const bookAuthors = props.value.authors;
    return <li>
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${backgroundImage})` }}></div>
                <div className="book-shelf-changer">
                    <select value={props.shelf} onChange={(event) => {props.onUpdateBookShelf(props.value, event.target.value)}}>
                    <option value="-1" disabled>Move to...</option>
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

/**
 * @description Builds an ordered list of books
 * @param {object} props - book props
 */
function BooksFullList(props) {
    const books = props.books;
    const listItems= (books && books.length>0) ? books.map((book) => 
        <ListItem key={book.id.toString()}
    value={book} onUpdateBookShelf={props.onUpdateBookShelf} shelf={book.shelf}/>
    ) : [];

    return (
    <ol className="books-grid">
        {listItems}
    </ol>
    );
}

class BooksGrid extends Component{
    render(){
        return(
            <BooksFullList books={this.props.books} onUpdateBookShelf={this.props.onUpdateBookShelf}/>
        )
    }
}

export default BooksGrid;