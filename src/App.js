import React from 'react';
import {Route} from 'react-router-dom';

import './App.css';
import BookShelves from './BookShelves';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';

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

  /**
  * @description updates book shelf
  * @param {object} book - The book whose shelf needs to be updated
  * @param {string} shelf - The shelf to be assigned to the book
  */
  updateBookShelf=(book,shelf)=>{
    BooksAPI.update(book, shelf).then((result)=>{
        this.setState((state)=>({
        books: state.books.filter((bookItem)=> bookItem.id !== book.id).concat({...book, shelf})
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={()=>(
              <SearchBooks books={this.state.books}  onUpdateBookShelf={this.updateBookShelf}/> 
          )}/>
        <Route exact path='/' render={()=>(
            <BookShelves books={this.state.books} onUpdateBookShelf={this.updateBookShelf}/>
        )}/>
      </div>
    )
    }
}

export default BooksApp;
