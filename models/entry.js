const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
	entry: Number,
	entryText: String,
});

const Entry = mongoose.model("entry", entrySchema);

module.exports = Entry;