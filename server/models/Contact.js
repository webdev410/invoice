const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const contactSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	phone: {
		type: String,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
	},
	address1: {
		type: String,
		trim: true,
	},
	address2: {
		type: String,
		trim: true,
	},
	city: {
		type: String,
		trim: true,
	},
	state: {
		type: String,
		trim: true,
	},
	zip: {
		type: String,
		trim: true,
	},
	company: {
		type: Schema.Types.ObjectId,
		ref: "Company",
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
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

const Contact = model("Contact", contactSchema);

module.exports = Contact;
