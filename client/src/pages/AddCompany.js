import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_COMPANY } from "../utils/mutations";
import AddContact from "./AddContact";
import Auth from "../utils/auth";

const AddCompany = (props) => {
	useEffect(() => {
		document.title = `${props.title} | React Site`;
	});
	const [name, setCompanyName] = useState("");
	// const [showContactForm, setShowContactForm] = useState(false);
	const [addCompany, { error, data }] = useMutation(ADD_COMPANY);

	const handleChange = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		setCompanyName(value);
	};
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

			// Run Company Query Here
			return <AddContact />;
		} catch (err) {
			console.error(err);
		}
	};
	// const toggleContactForm = (event) => {
	// 	event.preventDefault();
	// 	if (showContactForm === true) {
	// 		setShowContactForm(false);
	// 	} else {
	// 		setShowContactForm(true);
	// 	}
	// };
	return (
		<div className="">
			<div className="">
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
											onChange={handleChange}
										></input>
									</div>
									{/* {showContactForm ? <AddContact /> : null} */}
									<div>
										{/* <button
											className="readMoreBtn btn btn-primary btn-sm m-2 "
											onClick={toggleContactForm}
										>
											{!showContactForm
												? "Add Company Contact"
												: "Hide Company Contact Form"}
										</button> */}
										<button
											className="btn btn-sm btn-primary m-2"
											type="submit"
										>
											Save
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

export default AddCompany;
