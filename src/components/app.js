import React, { Component } from "react";
import '../styles/main.scss';
import { Start } from './testWork/Start.jsx';
import { Provider } from 'react-redux';
import store from './testWork/Store.js';

class App extends Component {

    constructor(){
		super();
	};
	
    render() { 
		return(
			<Provider store={ store }>
				<Start />
			</Provider>	
		);
    };
}

export default App;