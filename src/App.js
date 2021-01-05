//imports
import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import SearchTable from "./components/SearchTable/SearchTable";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";


//Determines app state
const App = () => {
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [allUsers, setAllUsers] = useState([]);
	const [sortAsc, setSortAsc] = useState(true);

	//Function to sort user array
	const sortUsers = (users, asc) => {
		users.sort((a, b) =>
			fullNameLowerCase(a).localeCompare(fullNameLowerCase(b))
		);
		if (!asc) users.reverse();
		return users;
	};

	//funtion to return users by name
	const fullNameLowerCase = (user) =>
		(user.name.first + " " + user.name.last).toLocaleLowerCase();

	// Loads users from "randomuser" API 
	const loadUsersFromApi = async () => {
		var config = {
			method: "get",
			url: `https://randomuser.me/api/?results=200&nat=us`,
		};

		await axios(config)
			.then(function (res) {
				let users = res.data.results;
				users = sortUsers(users, sortAsc);
				setFilteredUsers(users);
				setAllUsers(users);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	// Filters users by name 
	const filterUsersbyName = (search) => {
		// convert to lowercase for faster search 
		const searchLowerCase = search.toLocaleLowerCase();
		// filters out users who meet the search
		let filteredUsers = allUsers.filter((u) =>
			fullNameLowerCase(u).includes(searchLowerCase)
		);
		setFilteredUsers(sortUsers(filteredUsers, sortAsc));
	};
		// sorts returned users in alphabetical order
	const sortFilteredUsersByName = () => {
		let order = !sortAsc;
		setSortAsc(order);
		setFilteredUsers(sortUsers(filteredUsers, order));
	};
		//loads the list
	useEffect(() => {
		loadUsersFromApi();
	}, []);

	//HTML outline
	return (
		<Container fluid className="App p-0">
			<Row>
				<Col>
					<Header
						title="Employee Directory"
						subtitle="Type a name in the search bar!"
					/>
					<Search
						name=""
						onValueChange={(search) => filterUsersbyName(search)}
					/>

					<SearchTable
						asc={sortAsc}
						data={filteredUsers}
						sort={() => sortFilteredUsersByName()}
					/>
				</Col>
			</Row>
		</Container>
	);
};
//exports the app
export default App;
