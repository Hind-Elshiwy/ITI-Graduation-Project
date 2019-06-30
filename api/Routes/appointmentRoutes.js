let express = require("express"),
    mongoose = require("mongoose");

let appointmentRoutes = express.Router();
let appointmentSchema = require("../Models/appointment.model");

appointmentRoutes.post("/:id", (req, res, next) => {
    console.log(req.body);
    let appointment = new appointmentSchema({
        startTime: req.body.start,
        endTime: req.body.end,
        playground: req.params.id,
        player: req._id
    });
    appointment.save((err, result) => {
        if (err) {
            console.log(err);
            if (err.code == 11000)
                res.status(422).send(['The playground already booked up at this time']);
            else {
                return next(err);
            }
        }
        else {
            console.log(result);
            res.status(200).send(result);
        }
    })
})

// List Player Matches
appointmentRoutes.get("", (req, res) => {
    appointmentSchema.
        find({ player: req._id }).
        populate('playground').then
        (result => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(err);
            return next(err);
        });
});

// List PlayeGround Matches
appointmentRoutes.get("/:id", (req, res) => {
    appointmentSchema.find({ playground: req.params.id }).
        populate('player').then
        (result => {
            res.status(200).send(result);
        })
        .catch(err => {
            console.log(err);
            return next(err);
        });
});

appointmentRoutes.put("/:id", (req, res, next) => {
    appointmentSchema.update({ _id: req.params.id },
        { $set: { dateAndTime: req.body.date } },
        (err) => {
            if (err) {
                return next(err);
            }
            else {
                appointmentSchema.findById(req.params.id, (err, result) => {
                    console.log(result);
                    if (!err) {
                        res.status(200).send(result);
                    }
                    else {
                        return next(err);
                    }
                })
            }
        });
});

appointmentRoutes.delete("/:id", (req, res) => {
    appointmentSchema.deleteOne({ _id: req.params.id },
        (err, result) => {
            if (err) {
                return next(err);
            }
            else {
                res.status(200).send({ msg: "Deleted Successfully" });
            }
        });
});
module.exports = appointmentRoutes;
