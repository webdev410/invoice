import { gql } from "@apollo/client";

export const QUERY_USER = gql`
	query user($username: String!) {
		user(username: $username) {
			_id
			name
			username
			email
		}
	}
`;
export const QUERY_SINGLE_COMPANY = gql`
	query company($companyId: ID!) {
		company(companyId: $companyId) {
			_id
			name
		}
	}
`;

export const QUERY_ME = gql`
	query me {
		me {
			_id
			name
			username
			email
			companies {
				_id
				name
				contacts {
					_id
					name
					email
					phone
				}
			}
		}
	}
`;
