import React , { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Row from "./TableRow/Row.jsx";
import { Thead, prepareDataUser } from "../Common.js";

export const ListUsers = (props) => {
	
	const [ listUsers, setListUsers ] = useState(props.main.users);
	const inputFilter = useRef(null);
	
	useEffect(() => {
		inputFilter.current.value = "";
		setListUsers(props.main.users);
	}, [props.main.users.length]);
	
	const filter = (e) => {
		let str = e.target.value, 
		users = listUsers.filter(item => [item.firstName, item.lastName, `${item.firstName} ${item.lastName}`].some(item => item.indexOf(str) !== -1));
		console.log("str - ", str);
		if(str !== "")
			setListUsers(users);
		else
			setListUsers(props.main.users);
	}; 
	
	const loadMore = () => {
		let url = `https://randomuser.me/api/?
					key=${props.main.paramsAsk.key}&
					ref=${props.main.paramsAsk.ref}&
					results=${props.main.paramsAsk.results}&
					page=${props.main.paramsAsk.page+1}&
					seed=${props.main.paramsAsk.seed}`;
		fetch(url)
		.then(res => res.json())
		.then(res =>{
			console.log("RUN - ",res);
			let users = [], arr = [];
			res.results.forEach(item => {
				users = [...users, prepareDataUser(item)];
			});
			props.dispatch({type : "setAddUsers", payLoad : users});
			props.dispatch({type : "setParamsAsk", payLoad : res.info});
		})
		.catch(error => {
			console.log("ERROR ask randomuser.me - ", error);
			if(confirm("Виникла помилка завантаження даних з серверу! Бажаєте повторити запит?"))
				loadMore();
		});
	};
	
	return(
		<div className="col-12 mt-5">
			<div className="col-12 row mb-3">
				<span className="mr-3">Фільтр:</span>
				<span>
					<input className="custom-input" ref={inputFilter} type="text" onChange={(e) => setTimeout(filter(e), 250)} />
				</span>	
			</div>
			<table className="table">
				<Thead />
				<tbody>
					{listUsers.map(item => <Row key={item.id} id={item.id} />)}
				</tbody>	
			</table>
			<div className="row col-12 justify-content-center">
				<button className="custom-btn" onClick={loadMore}>Завантажити більше</button>
			</div>
		</div>
	);
	
};

function mapStateToProps( state ) {
    const { main } = state;
    return { main };
};
 
export default connect( mapStateToProps)( ListUsers );