const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const projectSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
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

const Project = model("Project", projectSchema);

module.exports = Project;
