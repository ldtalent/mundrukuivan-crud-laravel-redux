import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import Start from './start';







class Clock extends Component {



    render() {
        return (
            <Provider store={store}>
                <Start/>
            </Provider>

        )
    }

}


export default Clock;

if (document.getElementById('example')) {
    ReactDOM.render(<Clock />, document.getElementById('example'));
}
