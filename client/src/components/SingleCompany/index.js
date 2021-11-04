import React from "react";
import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { QUERY_SINGLE_COMPANY } from "../../utils/queries";

export default function SingleCompany() {
	// Use `useParams()` to retrieve value of the route parameter `:profileId`
	const { companyId } = useParams();

	const { loading, data } = useQuery(QUERY_SINGLE_COMPANY, {
		variables: { companyId: companyId },
	});

	const company = data?.company || {};

	if (loading) {
		return "Loading...";
	}
	return (
		<div>
			<h1>{company.name}</h1>
		</div>
	);
}
