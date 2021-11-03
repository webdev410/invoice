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
	dueDate: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp),
	},
	company: {
		type: Schema.Types.ObjectId,
		ref: "Company",
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

const Project = model("Project", projectSchema);

module.exports = Project;
