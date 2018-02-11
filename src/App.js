import React from 'react';
import {Route} from 'react-router-dom';

import './App.css'
import BookShelves from './BookShelves'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books:[],
    searchResults:[]
  }
    
    componentDidMount(){
        BooksAPI.getAll().then((books)=>{
            this.setState({books})
        })
    }

    updateBookShelf=(book, shelf)=>{
      //TODO:Need to find a cleaner of doing the filtering and appending below
      book.shelf = shelf;
      this.setState((state)=>({
        books: state.books.filter((bookItem)=> bookItem.title !== book.title).concat([book])
      }))

      BooksAPI.update(book, shelf);
    }

     searchBooks = (searchTerm)=>{
       alert(searchTerm)
        BooksAPI.search(searchTerm).then((results)=>{
            this.setState({
                searchResults: results
            })
        })
    }

  render() {
    return (
      <div className="app">
        <Route exact path='/add' render={()=>(
              <SearchBooks books={this.state.books}  onUpdateBookShelf={this.updateBookShelf}/> 
          )}/>
        <Route exact path='/' render={()=>(
            <BookShelves books={this.state.books} onUpdateBookShelf={this.updateBookShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
