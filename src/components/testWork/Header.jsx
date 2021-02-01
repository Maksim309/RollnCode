import React, { useState } from "react";
import { connect } from "react-redux";
import { moment } from "./Common.js";

window.stopInterval;

export const Header = (props) => {
	
	const [ time, setTime ] = useState(moment().format("HH:mm:ss"));
	const [ countUsers, setCountUsers ] = useState(0);
	
	let interval = setInterval(() => {
		//console.log("run interval");
		setTime(moment().format("HH:mm:ss"));
	}, 250);
	
	window.stopInterval = () => {
		clearInterval(interval);
	};
	
	return (
		<header>
			<span className="col-6">Час - {time}</span>
			<span className="col-6">Кількість відмічених користувачів: {props.main.users.filter(item => item.selected).length}</span>
		</header>
	);
}

function mapStateToProps( state ) {
    const { main } = state;
    return { main };
};
 
export default connect( mapStateToProps)( Header );	