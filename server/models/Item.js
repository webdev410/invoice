const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const itemSchema = new Schema({
	description: {
		type: String,
		required: true,
		trim: true,
	},
	units: {
		type: Boolean,
		required: true,
		default: false,
	},
	unitPrice: {
		type: Boolean,
		required: true,
		default: false,
	},
	invoice: {
		type: Schema.Types.ObjectId,
		ref: "Invoice",
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

const Item = model("Item", itemSchema);

module.exports = Item;
