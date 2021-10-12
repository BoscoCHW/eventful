const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userDataSchema = new Schema({
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
	events: { type : Array , "default" : [] }	,
    avatar: { type: String }
})

module.exports = mongoose.model('userData', userDataSchema)