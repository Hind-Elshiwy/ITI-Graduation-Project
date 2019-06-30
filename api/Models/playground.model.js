const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let playgroundSchema = mongoose.Schema({
    name: { type: String, required: "Name can't be empty" },
    owner: { type: ObjectId, ref: "User", required: "There must be owner for this playground" },
    mainImg: { type: String },
    city: { type: String, required: "City is required" },
    address: { type: String, required: "Address is required" },
    price: { type: Number, required: "Price is required" }
})



module.exports = mongoose.model('PlayGround', playgroundSchema);