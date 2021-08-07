'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');

var schemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: { createdAt: 'create_date', updatedAt: 'last_updated' }
};

var UserSchema = new Schema({
    email: { type: String },
    username: { type: String, default: '' },
    status: { type: Boolean },
    hashedPassword: { type: String },
    salt: String,
    is_deleted: { type: Boolean, default: false },
}, schemaOptions);

UserSchema.plugin(autopopulate);

/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
    this.last_updated = new Date();
    return next()
});

module.exports = mongoose.model('User', UserSchema);