import React, {Component} from 'react';
import './index.css';
import {ListGroup, Button} from 'react-bootstrap';
import  ListBookItem from '../ListBookItem';
import  booksData from '../data/books';

class ListBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: []
        };
        this.addBook = this.addBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    addBook() {
        this.setState({
            books: [
                ...this.state.books,
                booksData[this.state.books.length]
            ]
        });
    }

    deleteBook(bookId) {
        this.setState({
            books: this.state.books.filter((book, i) => book.id !== bookId)
        });
    }

    render() {
        let {books} = this.state,
            addBookBtnClass = 'add-book-btn';

        if (books.length === booksData.length) {
            addBookBtnClass += ' invisible';
        }

        return (
            <div className="list-books">
                <div className={addBookBtnClass}>
                    <Button
                        bsStyle="primary"
                        onClick={this.addBook}>Add book</Button>
                </div>

                {books && books.length > 0 &&
                <ListGroup>
                    {books.map((book) => {
                        return <ListBookItem
                            key={book.id}
                            book={book}
                            onDeleteBook={this.deleteBook}/>;
                    }, this)}
                </ListGroup>}
            </div>
        );
    }
}
export default ListBooks;
