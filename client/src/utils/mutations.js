import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				name
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser(
		$name: String!
		$username: String!
		$email: String!
		$password: String!
	) {
		addUser(
			name: $name
			username: $username
			email: $email
			password: $password
		) {
			token
			user {
				_id
				name
			}
		}
	}
`;

export const ADD_COMPANY = gql`
	mutation addCompany($name: String!) {
		addCompany(name: $name) {
			_id
			user {
				_id
			}
		}
	}
`;
export const ADD_CONTACT = gql`
	mutation addContact(
		$companyId: ID
		$name: String
		$phone: String
		$email: String
		$address1: String
		$address2: String
		$city: String
		$state: String
		$zip: String
	) {
		addContact(
			companyId: $companyId
			name: $name
			phone: $phone
			email: $email
			address1: $address1
			address2: $address2
			city: $city
			state: $state
			zip: $zip
		) {
			company {
				_id
			}
			name
			phone
			email
			address1
			address2
			city
			state
			zip
		}
	}
`;
