import React, {Component} from 'react';
import './App.css';
import ListBooks from '../src/ListBooks';
import ExpandableComponent from '../src/ExpandableComponent';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>React animations</h2>
                </div>
                <ListBooks/>
                <ExpandableComponent/>
            </div>
        );
    }
}

export default App;
