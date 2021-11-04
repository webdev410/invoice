import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Redirect, useParams } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/client";
import { ADD_CONTACT } from "../utils/mutations";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const AddContact = ({ title }) => {
	useEffect(() => {
		document.title = `${title} | React Site`;
	});

	const [formState, setFormState] = useState({
		companyId: "",
		name: "",
		phone: "",
		email: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		zip: "",
	});

	const [addContact, { error, data }] = useMutation(ADD_CONTACT);

	const { username: userParam } = useParams();

	const { loading, data: meData } = useQuery(
		userParam ? QUERY_USER : QUERY_ME,
		{
			variables: { username: userParam },
		}
	);

	const user = meData?.me || meData?.user || {};
	console.log(user.companies);

	if (loading) {
		return <div>Loading...</div>;
	}
	// update state based on form input changes
	const handleChange = (event) => {
		const { name, value } = event.target;
		// if (name === "companyId") {
		// 	console.log(value);
		// }
		setFormState({ ...formState, [name]: value });
	};

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(formState);
		try {
			const { data } = await addContact({
				variables: { ...formState },
			});

			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		}

		// clear form values
		setFormState({
			companyId: "",
			name: "",
			phone: "",
			email: "",
			address1: "",
			address2: "",
			city: "",
			state: "",
			zip: "",
		});
	};

	return (
		<div className="mt-3">
			<div className="">
				<div className="card">
					<div className="card-header">
						<h3>Company Contact</h3>
					</div>
					<div className="card-body">
						{Auth.loggedIn() ? (
							<>
								<form className="" onSubmit={handleFormSubmit}>
									<select
										name="companyId"
										value={formState.companyId}
										onChange={handleChange}
										className="form-select"
									>
										<option selected>Choose company</option>
										{user.companies.map((company) => (
											<option
												key={company._id}
												name="companyId"
												value={company._id}
											>
												{company.name}
											</option>
										))}
									</select>
									<div className="form-group">
										<input
											name="name"
											placeholder="Name"
											value={formState.name}
											className="form-control"
											onChange={handleChange}
										></input>
									</div>
									<div className="form-group">
										<input
											name="phone"
											placeholder="Phone Number"
											value={formState.phone}
											className="form-control"
											onChange={handleChange}
										></input>
									</div>
									<div className="form-group">
										<input
											name="email"
											placeholder="Email"
											value={formState.email}
											className="form-control"
											onChange={handleChange}
										></input>
									</div>
									<div className="form-group">
										<input
											name="address1"
											placeholder="Address"
											value={formState.address1}
											className="form-control"
											onChange={handleChange}
										></input>
									</div>
									<div className="form-group">
										<input
											name="address2"
											placeholder="Address Line 2"
											value={formState.address2}
											className="form-control"
											onChange={handleChange}
										></input>
									</div>
									<div className="form-group">
										<input
											name="city"
											placeholder="City"
											value={formState.city}
											className="form-control"
											onChange={handleChange}
										></input>
									</div>
									<div className="form-group">
										<input
											name="state"
											placeholder="State"
											value={formState.state}
											className="form-control"
											onChange={handleChange}
										></input>
									</div>
									<div className="form-group">
										<input
											name="zip"
											placeholder="Zip Code"
											value={formState.zip}
											className="form-control"
											onChange={handleChange}
										></input>
									</div>

									<div>
										<button
											className="btn btn-sm btn-primary m-2"
											type="submit"
										>
											Add
										</button>
									</div>
								</form>
							</>
						) : (
							<p>
								Sorry, you need to be logged in. Please{" "}
								<Link to="/login">login</Link> or{" "}
								<Link to="/signup">signup.</Link>
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddContact;
