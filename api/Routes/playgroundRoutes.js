let express = require("express"),
    multer = require("multer");

let playgroundRoutes = express.Router();
let playgroundSchema = require("../Models/playground.model");
let appointmentSchema = require("../Models/appointment.model");

// multer
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg')
        cb(null, true);
    else
        cb(new Error("Not supported image type"), false);
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});
const upload = multer(
    { storage: storage, fileFilter: fileFilter }
);
// ===============================================================

playgroundRoutes.post("", upload.single("mainImg"), (req, res, next) => {
    req.body.mainImg = req.file.path;
    console.log(req.body);
    let playground = new playgroundSchema(req.body);
    playground.owner = req._id;
    console.log(playground);
    playground.save((err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    })
})

playgroundRoutes.put("/:id", upload.single("mainImg"), (req, res, next) => {
    if (req.file) {
        req.body.mainImg = req.file.path;
    }
    console.log(req.body);
    playgroundSchema.update({ _id: req.params.id },
        req.body, err => {
            if (!err) {
                playgroundSchema.findById(req.params.id, (err, result) => {
                    if (!err) {
                        console.log(result);
                        res.status(200).send(result);
                    }
                    else {
                        console.log(err);
                        return next(err);
                    }
                })
            }
            else {
                console.log(err);
                return next(err);
            }
        })
})
// Get all playgrounds
playgroundRoutes.get("", (req, res, next) => {
    playgroundSchema.find({}, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    });
})



// Get all playgrounds for current owner
playgroundRoutes.get("/owner", (req, res, next) => {
    playgroundSchema.find({ owner: req._id }, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    });
})

playgroundRoutes.get("/:id", (req, res, next) => {
    playgroundSchema.findById(req.params.id, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    });
});

playgroundRoutes.delete("/:id", (req, res, next) => {
    playgroundSchema.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            appointmentSchema.deleteMany({ playground: req.params.id }, err => {
                if (err) {
                    return next(err);
                }
            })
            res.status(200).send({ msg: "Deleted Successfully" });
        }
    });
})


module.exports = playgroundRoutes;
