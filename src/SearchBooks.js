import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Debounce} from 'react-throttle'

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

    /**
     * @description Searches for books and updates shelves if search results have already been assigned to a shelf
     * @param {string} searchTerm - the query used for search for books
     */
    searchBooks = (searchTerm)=>{
        this.setState({ searchResults: []}, () => {
            if (searchTerm.length === 0){
                return;
            }
            BooksAPI.search(searchTerm).then((results)=>{
                if(results && !results.error){
                    this.setState({
                        searchResults: results.map((bookInSearchResult)=>{
                            const matchingBookAlreadyOnShelf = this.props.books.find((book)=> book.id===bookInSearchResult.id)
                            
                            return {
                                ...bookInSearchResult, 
                                shelf: matchingBookAlreadyOnShelf ? matchingBookAlreadyOnShelf.shelf: 'none'};
                        })  
                    })
                }
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
                        <Debounce time="500" handler="onChange">
                            <input type="text" placeholder="Search by title or author" onChange={(event)=> this.searchBooks(event.target.value)}/>
                        </Debounce>

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

