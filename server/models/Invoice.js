const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const invoiceSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	isPaid: {
		type: Boolean,
		required: true,
		default: false,
	},
	archived: {
		type: Boolean,
		required: true,
		default: false,
	},
	payBy: {
		type: Date,
		default: Date.now() + 30,
		get: (timestamp) => dateFormat(timestamp),
	},
	items: [
		{
			type: Schema.Types.ObjectId,
			ref: "Item",
		},
	],
	project: {
		type: Schema.Types.ObjectId,
		ref: "Project",
	},
	notes: [
		{
			body: {
				type: String,
				required: true,
			},
			author: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
			createdAt: {
				type: Date,
				default: Date.now,
				get: (timestamp) => dateFormat(timestamp),
			},
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp),
	},
});

const Invoice = model("Invoice", invoiceSchema);

module.exports = Invoice;
