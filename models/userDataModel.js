const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userDataSchema = new Schema({
    name: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
	events: [ {
        id: { type: String },
        title: { type: String },
        description: { type: String},
        importance: { type: String },
		image_url: { type: String },
		tags: [
            { type: String }
        ],
		date: { type: String }
    }]	,
    avatar: { type: String }
})

module.exports = mongoose.model('userData', userDataSchema)