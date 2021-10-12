const mongoose = require('mongoose');

const connectToMongo = (uri) => mongoose.connect(
        uri, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true
        }
    );

module.exports = {connect: connectToMongo}