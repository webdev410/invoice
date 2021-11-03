const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const noteSchema = new Schema({
	body: {
		type: String,
		trim: true,
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
});

const Note = model("Note", noteSchema);

module.exports = Note;
