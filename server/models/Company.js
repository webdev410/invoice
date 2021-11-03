const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const companySchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	contacts: [
		{
			type: Schema.Types.ObjectId,
			ref: "Contact",
		},
	],
	projects: [
		{
			type: Schema.Types.ObjectId,
			ref: "Project",
		},
	],
	notes: [
		{
			type: Schema.Types.ObjectId,
			ref: "Note",
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp),
	},
});

const Company = model("Company", companySchema);

module.exports = Company;
