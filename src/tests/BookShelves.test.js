import React from 'react'
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router';
import BookShelves from '../BookShelves';

describe('BookShelf',()=>{
    const listOfBooks = [{"id":123, "title": "The Linux Command Line","imageLinks":"{'thumbnail':http://thumbnail.com'}"}]
        const bookShelf = mount(
            <MemoryRouter initialEntries={[ '/random' ]}>
                <BookShelves
                    books = {listOfBooks}
                    onUpdateBookShelf = {()=> true}
                />
            </MemoryRouter>
        );
    it('renders currentlyreading shelf',()=>{
        expect(bookShelf.find('.currentlyreading').exists()).toBeTruthy();
    })

    it('renders wanttoread shelf',()=>{
        expect(bookShelf.find('.wanttoread').exists()).toBeTruthy();
    })

    it('renders wanttoread shelf',()=>{
        expect(bookShelf.find('.read').exists()).toBeTruthy();
    })

     it('contains a link to search and add a book',()=>{
        expect(bookShelf.find('.open-search').exists()).toBeTruthy();
        expect(bookShelf.find('.open-search').children()).toHaveLength(1);
    })
})