import React, { Component } from 'react'

import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'

class ListBooks extends Component{
    render(){
        return(
            <div className="list-books-content">
              <div>
                <CurrentlyReading/>
                <WantToRead/>
                <Read/>
              </div>
            </div>
        )
    }
}

export default ListBooks;