import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import SearchBooks from './SearchBooks'

import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books:[]
  }
    
    componentDidMount(){
        BooksAPI.getAll().then((books)=>{
            this.setState({books})
        })
    }

    updateBookShelf=(book, shelf)=>{
      const action = {
        title: book.title,
        shelf: book.shelf
      }
   
      //TODO:Need to find a cleaner of doing the filtering and appending below
      book.shelf = shelf;
      this.setState((state)=>({
        books: state.books.filter((bookItem)=> bookItem.title !== book.title).concat([book])
      }))

      BooksAPI.update(book, shelf);
    }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
            <SearchBooks/>
        ) : (
          <div className="list-books">
             <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookList books={this.state.books} onUpdateBookShelf={this.updateBookShelf}/>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
            </div>
        )}
      </div>
    )
  }
}

export default BooksApp
