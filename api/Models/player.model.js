const mongoose = require('mongoose');
const User = require('./user.model');
const options = { discriminatorKey: 'kind' };

let playerSchema = User.discriminator('player',
    new mongoose.Schema({
        age: { type: Number, min: 18, max: 70, default: 18 }
    }, options));

module.exports = playerSchema;

