import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import { moment } from "../../Common.js";

export const Row = (props) => {
	
	let history = useHistory();
	
	const [ user, setUser ] = useState(props.main.users.find(item => item.id === props.id));
	
	const selectedUser = () => {
		let temp = {
			...user, 
			selected : true,
			dateSelected : moment().format("YYYY-MM-DDTHH:mm:ss"),
		};
		setUser(temp);
		props.dispatch({type : "setChangedUser", payLoad : temp});
	}
	
	const delleteUser = () => {
		let temp = {
			...user, 
			selected : false,
			dateSelected : "",
		};
		setUser(temp);
		props.dispatch({type : "setChangedUser", payLoad : temp});
	}
	
	return(
		<tr>
			<th className="first" onClick={() => {
				props.dispatch({type : "setSelectedId", payLoad : user.id});
				history.push(`/user/${user.id}`);			
			}} >
				{user.id}
			</th>
			<th>
				<img src={user.img.medium}/>
			</th>
			<th>{user.firstName}</th>
			<th>{user.lastName}</th>
			<th className="last">
				{!user.selected ? 
					<div>
						<IconButton onClick={selectedUser}><AddCircleOutlineIcon size="large"/></IconButton>
					</div>
				:		
					<>
						<div>
							<IconButton onClick={delleteUser}><HighlightOffIcon size="large"/></IconButton>
						</div>
						<div>
							<div>Відмітили в:</div>
							<div>{user.dateSelected}</div>
						</div>
					</>	
				}	
			</th>
		</tr>
	);
	
};

function mapStateToProps( state ) {
    const { main } = state;
    return { main };
};
 
export default connect( mapStateToProps)( Row );
