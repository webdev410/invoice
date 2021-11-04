import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_COMPANY } from "../utils/mutations";

import Auth from "../utils/auth";

const AddCompany = (props) => {
	useEffect(() => {
		document.title = `${props.title} | React Site`;
	});
	const [name, setCompanyName] = useState("");
	const [addCompany, { error, data }] = useMutation(ADD_COMPANY);

	// update state based on form input changes
	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		setCompanyName(value);
	};

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await addCompany({
				variables: {
					name,
				},
			});
			alert(`Successfully added ${name}`);
			setCompanyName("");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="card">
			<div className="card-header">
				<h3>Add Company</h3>
			</div>
			<div className="card-body">
				{Auth.loggedIn() ? (
					<>
						<form className="" onSubmit={handleFormSubmit}>
							<div className="form-group">
								<input
									name="name"
									placeholder="Company Name"
									value={name}
									className="form-control w-100"
									style={{
										lineHeight: "1.5",
										resize: "vertical",
									}}
									onChange={handleChange}
								></input>
							</div>

							<div>
								<button
									className="btn btn-sm btn-primary m-2"
									type="submit"
								>
									Add Company
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
	);
};

export default AddCompany;
