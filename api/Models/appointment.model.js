const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let appointmentSchema = mongoose.Schema({
    startTime: { type: Date, required: "You didn't select your reservation start time" },
    endTime: { type: Date, required: "You didn't select your reservation end time" },
    playground: { type: ObjectId, ref: "PlayGround", required: "PlayGround is required" },
    player: { type: ObjectId, ref: "User", required: "Player is required" }
})


appointmentSchema.index({ playground: 1, startTime: 1 }, { unique: true });

appointmentSchema.path('startTime').validate((value) => {
    return value > new Date()
}, "The appointment can not be scheduled in the past");

appointmentSchema.path('endTime').validate((value) => {
    return value > new Date()
}, "The appointment can not be scheduled in the past");
module.exports = mongoose.model('Appointment', appointmentSchema);