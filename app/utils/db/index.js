
// Bring Mongoose into the app
const mongoose = require('mongoose');
const config = require('../../config/environment');


// Create the database connection
mongoose.connect(config.mongo.uri, { useNewUrlParser: true });

// CONNECTION EVENTS

// When successfully connected
mongoose.connection.on('connected', () => {
    console.info(`Mongoose default connection open to ${config.mongo.uri}`);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
    console.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.debug('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});