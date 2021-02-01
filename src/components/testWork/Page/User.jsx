import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

export const User = (props) => {
	
	let history = useHistory();
	
	return(
		<div className="col-12 row mt-5">
			<div className="col-4" style={{"textAlign" : "center"}}>
				<img src={props.main.users.find(item => item.id === props.main.selectedId).img.large}/>
			</div>
			<div className="col-8">
				<div className="col-12 row">
					<span className="col-4">Ім'я:</span>
					<span className="col">{props.main.users.find(item => item.id === props.main.selectedId).firstName}</span>
				</div>
				<div className="col-12 row">
					<span className="col-4">Прізвище:</span>
					<span className="col">{props.main.users.find(item => item.id === props.main.selectedId).lastName}</span>
				</div>
				<div className="col-12 row">
					<span className="col-4">Дата народження:</span>
					<span className="col">{props.main.users.find(item => item.id === props.main.selectedId).birthday}</span>
				</div>
				<div className="col-12 row">
					<span className="col-4">Адреса:</span>
					<span className="col">{props.main.users.find(item => item.id === props.main.selectedId).address}</span>
				</div>
				<div className="col-12 row">
					<span className="col-4">Гендерна принадлежність:</span>
					<span className="col">{props.main.users.find(item => item.id === props.main.selectedId).gender}</span>
				</div>
				<div className="col-12 row">
					<span className="col-4">Телефон:</span>
					<span className="col">{props.main.users.find(item => item.id === props.main.selectedId).phone}</span>
				</div>
				<div className="col-12 row">
					<span className="col-4">Email:</span>
					<span className="col">{props.main.users.find(item => item.id === props.main.selectedId).email}</span>
				</div>
			</div>
			<div className="col-12 row justify-content-center mt-3">
				<button className="custom-btn" onClick={() => history.goBack()}>Повернутися до списку</button>
			</div>
		</div>
	);
	
}

function mapStateToProps( state ) {
    const { main } = state;
    return { main };
};
 
export default connect( mapStateToProps)( User );