const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const profileSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	contact: {
		type: Schema.Types.ObjectId,
		ref: "Contact",
	},
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
