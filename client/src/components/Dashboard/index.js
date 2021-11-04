import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";

import MyCompanies from "./MyCompanies";

import Auth from "../../utils/auth";

const Dashboard = () => {
	const { username: userParam } = useParams();

	const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
		variables: { username: userParam },
	});

	const user = data?.me || data?.user || {};
	console.log(user);
	// redirect to personal profile page if username is yours
	if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
		return <Redirect to="/me" />;
	}

	if (loading) {
		return <div className="">Loading...</div>;
	}

	if (!user?.username) {
		return (
			<h4>
				You need to be logged in to see this. Use the navigation links
				above to sign up or log in!
			</h4>
		);
	}
	return (
		<div>
			<h2>{userParam ? `${user.username}'s` : "Your"} Dashboard</h2>
			<MyCompanies user={user} />
		</div>
	);
};
export default Dashboard;
