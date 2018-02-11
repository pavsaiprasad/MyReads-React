import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'

class SearchBooks extends Component{
     static propTypes = {
     books: PropTypes.array.isRequired,
     onUpdateBookShelf: PropTypes.func.isRequired
    }
    state = {
        searchResults:[]
    }
    searchBooks = (searchTerm)=>{
        if (searchTerm.length < 3)
         return;
        BooksAPI.search(searchTerm).then((results)=>{
            const updatedResults = results.map((result)=>{
                const existingBook = this.props.books.filter((book)=> book.id===result.id)
                if(existingBook.length===1){
                    result.shelf = existingBook[0].shelf;
                }
                return result;
            })
            
            this.setState({
                searchResults: updatedResults
            })
        })
    }
    render(){
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(event)=> this.searchBooks(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
                {this.state.searchResults && (
                    <BooksGrid books={this.state.searchResults} onUpdateBookShelf={this.props.onUpdateBookShelf}/>
                )}
            </div>
          </div>
        )
    }
}

export default SearchBooks; 

