const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const itemSchema = new Schema({
	description: {
		type: String,
		required: true,
		trim: true,
	},
	units: {
		type: Number,
		required: true,
		default: 0,
	},
	unitPrice: {
		type: Number,
		required: true,
		min: 0.99,
	},
	invoice: {
		type: Schema.Types.ObjectId,
		ref: "Invoice",
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

const Item = model("Item", itemSchema);

module.exports = Item;
