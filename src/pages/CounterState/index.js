import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';

class CounterState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    render() {
        return (
            <div>
                <div>state</div>
                <div>{this.state.count}</div>
                <button type="button" onClick={() => this.setState((state) => ({ count: state.count - 1 }))}>-</button>
                <button type="button" onClick={() => this.setState((state) => ({ count: state.count + 1 }))}>+</button>
                <button type="button" onClick={() => this.setState({ count: 0 })}>reset</button>
            </div>
        );
    }
}

export default hot(CounterState);