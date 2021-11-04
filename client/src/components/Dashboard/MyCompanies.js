import React from "react";
import { Link } from "react-router-dom";
export default function MyCompanies({ user }) {
	console.log(user.companies);
	return (
		<div>
			{user.companies.length === 0 ? (
				<h5>
					You have no companies. {""}
					<a href="/add-company">Add a company</a> to get started!
				</h5>
			) : (
				<>
					<table>
						<tr>
							<th>Company Name</th>
							<th>Contact Name</th>
						</tr>
						{user.companies.map((company) => (
							<tr>
								<td key={company._id}>
									{" "}
									<Link to={`/company/${company._id}`}>
										{company.name}
									</Link>
								</td>
								{company.contacts.map((contact) => (
									<td>{contact.name}</td>
								))}
							</tr>
						))}
					</table>
				</>
			)}
		</div>
	);
}
