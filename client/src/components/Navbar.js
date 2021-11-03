import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
export default function Navbar() {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};
	return (
		<nav>
			<div className="d-flex justify-content-between m-2">
				<Link to="/">Invoice System</Link>
				{Auth.loggedIn() ? (
					<>
						{/* Navbar when logged in */}
						<Link onClick={logout}>Logout</Link>
					</>
				) : (
					<>
						{/* Navbar when not logged in */}
						<Link to="/login">Login</Link>
						<Link to="/signup">Signup</Link>
					</>
				)}
			</div>
		</nav>
	);
}
