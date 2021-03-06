import React, { useState } from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./css/App.css";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddCompany from "./pages/AddCompany";
import Dashboard from "./components/Dashboard";
import AddContact from "./pages/AddContact";
import SingleCompany from "./components/SingleCompany";
// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
	uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem("id_token");
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="App d-flex flex-column justify-content-between">
					<Navbar></Navbar>
					<Route exact path="/">
						<Home title="Home" />
					</Route>
					<Route exact path="/signup">
						<Signup title="Signup" />
					</Route>
					<Route exact path="/login">
						<Login title="Login" />
					</Route>
					<Route exact path="/dashboard">
						<Dashboard title="Dashboard" />
					</Route>
					<Route exact path="/add-company">
						<AddCompany title="Add Company" />
					</Route>
					<Route exact path="/add-contact">
						<AddContact title="Add Contact" />
					</Route>
					<Route exact path="/company/:companyId">
						<SingleCompany title="Company" />
					</Route>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
