import React , { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";
import store from "./Store.js";
import { Loader } from "../Loader/Loader.jsx";
import ListUsers from "./Page/ListUsers.jsx";
import ListSelectedUsers from "./Page/ListSelectedUsers.jsx";
import NotFound from "./Page/NotFound404.jsx";
import User from "./Page/User.jsx";
import { prepareDataUser } from "./Common.js";

export const Main = (props) => {
	
	const [ ready, setReady ] = useState(false);
	
	const firstLoad = () => {
		fetch("https://randomuser.me/api/?key=BE6Y-WM2V-UFP1-O309&ref=1234abcd&results=20&page=1")
		.then(res => res.json())
		.then(res =>{
			console.log("RUN - ",res);
			let users = [], arr = [];
			res.results.forEach(item => {
				users = [...users, prepareDataUser(item)];
			});
			store.dispatch({type : "setAddUsers", payLoad : users});
			store.dispatch({type : "setParamsAsk", payLoad : res.info});
			setReady(true);
		})
		.catch(error => {
			console.log(error);
			if(confirm("Виникла помилка завантаження даних з серверу! Бажаєте повторити запит?"))
				firstLoad();
		});
	};
	
	useEffect( firstLoad, []);
	
	if(ready)
		return(
			<Router>
				<main>
					<nav>
						<ul>
							<li>
								<NavLink activeClassName="active" to="/ListUsers">Список користувачів</NavLink>
							</li>
							<li>
								<NavLink activeClassName="active" to="/ListSelectedUsers">Список відмічених користувачів</NavLink>
							</li>
						</ul>
					</nav>
					<Switch>
						<Route exact path="/ListUsers">
							<ListUsers />
						</Route>
						<Route exact path="/ListSelectedUsers">
							<ListSelectedUsers />
						</Route>
						<Route path="/user">
							<User />
						</Route>
						<Route path="/*">
							<NotFound />
						</Route>						
					</Switch>
					<div className="empty"></div>
				</main>
			</Router>	
		);
	else
		return(<Loader />);
	
};	