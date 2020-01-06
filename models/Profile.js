const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
	type: {
		type: String
	},
	describe: {
		type: String
	},
	income: {
		type: Number,
		required: true
	},
	expend: {
		type: Number,
		required: true
	},
	cash: {
		type: Number,
		required: true
	},
	remark: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
