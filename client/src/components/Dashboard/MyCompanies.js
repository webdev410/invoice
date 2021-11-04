import React from "react";

export default function MyCompanies({ user }) {
	console.log(user);
	return (
		<div>
			{user.companies.length === 0 ? (
				<h5>
					You have no companies. {""}
					<a href="/add-company">Add a company</a> to get started!
				</h5>
			) : (
				<>
					{user.companies.map((company) => (
						<div>{company.name}</div>
					))}
				</>
			)}
		</div>
	);
}
