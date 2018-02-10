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
            <BookList books={this.state.books}/>
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
