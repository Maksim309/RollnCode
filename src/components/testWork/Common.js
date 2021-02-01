import React from "react";

export var moment = require('moment');

export function Thead() {
	return(
		<thead>
			<tr>
				<th>ID</th>
				<th>Аватар</th>
				<th>Ім'я</th>
				<th>Прізвище</th>
				<th>Дія</th>
			</tr>
		</thead>
	);
}

export function prepareDataUser(user) {
	return{
		id : user.login.uuid,
		img : {
			small : user.picture.thumbnail,
			medium : user.picture.medium,
			large : user.picture.large,
		},
		gender : user.gender,
		address :  `Країна: ${user.location.country}, Місто: ${user.location.city}, Вулиця: ${user.location.street.name}, ${user.location.street.number}`,
		firstName : user.name.first,
		lastName : user.name.last,
		email : user.email,
		phone : user.phone,
		birthday : user.dob.date,
		selected : false,
		deteSelected : false,
	};
}