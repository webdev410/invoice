const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type User {
		_id: ID!
		name: String!
		username: String!
		email: String!
		password: String!
		createdAt: String!
		companies: [Company]
	}
	type Category {
		_id: ID!
		name: String!
	}
	type Company {
		_id: ID!
		name: String!
		user: User
		notes: [Note]
		contacts: [Contact]
		projects: [Project]
	}
	type Contact {
		_id: ID!
		name: String!
		phone: String
		email: String
		address1: String
		address2: String
		city: String
		zip: String
		company: Company
		notes: [Note]
		createdBy: User
	}
	type Invoice {
		title: String
		isPaid: Boolean!
		archived: Boolean!
		payBy: String
		items: [Item]
		project: Project
		notes: [Note]
		createdAt: String
	}
	type Note {
		_id: ID!
		body: String
		author: User
		createdAt: String
	}
	type Profile {
		name: String
		contact: Contact
	}
	type Project {
		title: String
		category: Category
		archived: Boolean
		dueDate: String
		company: Company
		notes: [Note]
		createdAt: String
	}
	type Auth {
		token: ID!
		user: User
	}

	type Query {
		users: [User]
		user(username: String!): User
		me: User
	}

	type Mutation {
		addUser(
			name: String!
			username: String!
			email: String!
			password: String!
		): Auth
		login(email: String!, password: String!): Auth
	}
`;

module.exports = typeDefs;
