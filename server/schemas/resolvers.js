const { AuthenticationError } = require("apollo-server-express");
const { User, Company, Contact } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		users: async () => {
			return User.find().populate("companies");
		},
		user: async (parent, { username }) => {
			return User.findOne({ username }).populate("companies");
		},
		me: async (parent, args, context) => {
			if (context.user) {
				return User.findOne({ _id: context.user._id })
					.populate("companies")
					.populate({
						path: "companies",
						populate: "contacts",
					});
			}
			throw new AuthenticationError("You need to be logged in!");
		},
		company: async (parent, { companyId }) => {
			return await Company.findById(companyId);
		},
	},

	Mutation: {
		addUser: async (parent, { name, username, email, password }) => {
			const user = await User.create({ name, username, email, password });
			const token = signToken(user);
			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError(
					"No user found with this email address"
				);
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect credentials");
			}

			const token = signToken(user);

			return { token, user };
		},
		addCompany: async (parent, { name }, context) => {
			if (context.user) {
				const company = await Company.create({
					name,
					user: context.user._id,
				});

				await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { companies: company._id } }
				);

				return company;
			}
			throw new AuthenticationError("You need to be logged in!");
		},
		addContact: async (
			parent,
			{
				companyId,
				name,
				phone,
				email,
				address1,
				address2,
				city,
				state,
				zip,
			},
			context
		) => {
			if (context.user) {
				const contact = await Contact.create({
					company: companyId,
					name,
					phone,
					email,
					address1,
					address2,
					city,
					state,
					zip,
					company,
					user: context.user._id,
				});

				await Company.findOneAndUpdate(
					{ _id: companyId },
					{ $addToSet: { contacts: contact._id } }
				);

				return contact;
			}
			throw new AuthenticationError("You need to be logged in!");
		},
	},
};

module.exports = resolvers;
