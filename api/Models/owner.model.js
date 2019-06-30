const mongoose = require('mongoose');
const User = require('./user.model');
const options = { discriminatorKey: 'kind' };

let ownerSchema = User.discriminator('owner',
    new mongoose.Schema({

    }, options));

module.exports = ownerSchema;
