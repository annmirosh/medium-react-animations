import React, {Component} from 'react';
import {ListGroupItem, Glyphicon} from 'react-bootstrap';
import Transition from 'react-transition-group/Transition';
import './index.css';

class ListBookItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayed: true
        };

        this.delete = this.delete.bind(this);
        this.onExitedCb = this.onExitedCb.bind(this);
    }

    delete() {
        this.setState({displayed: false});
    }

    onExitedCb() {
        this.props.onDeleteBook(this.props.book.id)
    }

    render() {
        let {book}=this.props;
        let duration = 500,
            defaultStyle = {
                transition: `opacity ${duration}ms linear, height ${duration}ms linear`,
                opacity: 0,
                height: '0px'
            },
            transitionStyles = {
                entering: {opacity: 0, height: '0px'},
                entered: {opacity: 1, height: '42px'},
                exiting: {opacity: 0, height: '0px'},
                exited: {opacity: 0, height: '0px'},
            };
        return (
            <Transition
                in={this.state.displayed}
                appear={true}
                timeout={duration}
                onExited={this.onExitedCb}>
                {(state) => (
                    <ListGroupItem style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                        {book.title}
                        <div className="pull-right" onClick={this.delete}>
                            <Glyphicon data-book-id={book.id}
                                       glyph="remove-sign"/>
                        </div>
                    </ListGroupItem>
                )}
            </Transition>);
    }
}

export default ListBookItem;

//
// import React from 'react';
// import {ListGroupItem, Glyphicon} from 'react-bootstrap';
//
// const ListBookItem = ({book, onDeleteBook}) => {
//     return (<ListGroupItem key={book.id}>
//         {book.title}
//         <div className="pull-right"
//              onClick={onDeleteBook.bind(this, book.id)}>
//             <Glyphicon data-book-id={book.id}
//                        glyph="remove-sign"/>
//         </div>
//     </ListGroupItem>);
// };
//
// export default ListBookItem;
