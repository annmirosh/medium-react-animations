import React, {Component} from 'react';
import {Row, Col, Well} from 'react-bootstrap';
import Transition from 'react-transition-group/Transition';
import './index.css';
import quotes from '../data/quotes';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const duration = 400;

class ExpandableComponent extends Component {
    constructor(props) {
        super(props);
        this.quote = null;
        this.constPart = null;
        this.dynamicPart = null;
        this.state = {
            collapsed: true,
            quote: this.getRandomQuote(),
            minHeight: 0,
            maxHeight: 0,
        };
        this.toggleState = this.toggleState.bind(this);
    }

    componentDidMount() {
        let constPartHeight = this.constPart.getBoundingClientRect().height;
        let dynamicPartHeight = this.dynamicPart.getBoundingClientRect().height;
        this.setState({
            minHeight: constPartHeight,
            maxHeight: constPartHeight + dynamicPartHeight
        });
    }

    componentDidUpdate() {
        let constPartHeight = this.constPart.getBoundingClientRect().height;
        let dynamicPartHeight = this.dynamicPart.getBoundingClientRect().height;

        if (this.state.minHeight !== constPartHeight ||
            this.state.maxHeight !== constPartHeight + dynamicPartHeight) {
            this.setState({
                minHeight: constPartHeight,
                maxHeight: constPartHeight + dynamicPartHeight
            });
        }
    }

    toggleState() {
        let newCollapsedFlag = !this.state.collapsed,
            newState = {collapsed: newCollapsedFlag};

        this.setState(newState);
    }

    getRandomQuote() {
        return quotes[getRandomInt(0, 3)];
    }

    render() {
        let {collapsed} = this.state,
            defaultStyle = {
                transition: `height ${duration}ms ease-in-out`,
                height: this.state.minHeight + 'px'
            },
            transitionStyles = {
                entering: {height: this.state.minHeight + 'px'},
                entered: {height: this.state.maxHeight + 'px'}
            },
            componentClass = "expandable-component";

        if (!this.state.minHeight) {
            componentClass += ' invisible';
        }

        return (
            <div className={componentClass} ref="some">
                <Transition in={!collapsed}
                            timeout={duration}
                            onExited={() => {
                                this.setState({quote: this.getRandomQuote()});
                            }}>
                    {(state) => (
                        <div style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                            <div onClick={this.toggleState}>
                                <div ref={(elem) => this.constPart = elem}
                                     className="const-part">
                                    <h1>
                                        "The colour of the magic"
                                    </h1>
                                    <Row>
                                        <Col xs={6} xsOffset={6}>
                                            Terry Pratchett, 1983
                                        </Col>
                                    </Row>
                                </div>
                                <div ref={(elem) => this.dynamicPart = elem}
                                     className="dynamic-part">
                                    <br/>
                                    <Well>{this.state.quote}</Well>
                                </div>
                            </div>
                        </div>
                    )}
                </Transition>
            </div>
        );
    }
}

export default ExpandableComponent;
