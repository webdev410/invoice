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
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp),
	},
});

const Company = model("Company", companySchema);

module.exports = Company;
