import React , { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Row from "./TableRow/Row.jsx";
import { Thead } from "../Common.js";

export const ListSelectedUsers = (props) => {
	
	const [ listUsers, setListUsers ] = useState(props.main.users.filter(item => item.selected));
	
	useEffect(() => {
		setListUsers(props.main.users.filter(item => item.selected));
	}, [props.main.users.filter(item => item.selected).length]);
	
	const filter = (e) => {
		let str = e.target.value, 
		users = listUsers.filter(item => [item.firstName, item.lastName].some(item => item.indexOf(str) !== -1));
		console.log("str - ", str);
		if(str !== "")
			setListUsers(users);
		else
			setListUsers(props.main.users.filter(item => item.selected));
	} 
	
	return(
		<div className="col-12 mt-5">
			<div className="col-12 row  mb-3">
				<span className="mr-3">Фільтр:</span>
				<span>
					<input className="custom-input" type="text" onChange={e => setTimeout(filter(e), 250)} />
				</span>	
			</div>
			<table className="table">
				<Thead />
				<tbody>
					{listUsers.map(item => <Row key={item.id} id={item.id} />)}
				</tbody>	
			</table>
		</div>
	);
	
};

function mapStateToProps( state ) {
    const { main } = state;
    return { main };
};
 
export default connect( mapStateToProps)(ListSelectedUsers);