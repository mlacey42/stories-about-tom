const mongoose = require('mongoose');

const countSchema = new mongoose.Schema({
	totalCount: Number
});

const Count = mongoose.model("count", countSchema);

module.exports = Count;