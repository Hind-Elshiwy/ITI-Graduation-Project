const port = 3000;
const express = require("express"),
    path = require("path"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    mongoose = require("mongoose"),
    userRoutes = require("./Routes/userRoutes"),
    appointmentRoutes = require("./Routes/appointmentRoutes"),
    playgroundRoutes = require("./Routes/playgroundRoutes");

// const authenticate = require("./middleware/jwt");
const server = express();

mongoose.connect(
    "mongodb://localhost:27017/kora",
    { useNewUrlParser: true },
    error => {
        if (error) {
            console.log("DB Connection Error " + error);
            next(error);
        }
    }
);

server.use(morgan("short"));
server.use('/uploads', express.static('uploads'));
server.use(cors({ origin: true }));
server.use(bodyParser.json());

server.use("/user", userRoutes);
// Authentication midleware
server.use(authenticate);

server.get('/', (req, res) => {
    console.log(req._id);
    res.send("hello world");
});
server.use("/appointment", appointmentRoutes);
server.use("/playground", playgroundRoutes);

server.use((err, req, res, next) => {
    console.log(err);
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else
        res.status(422).send(err)
});

server.listen(port, () => {
    console.log(`I am Listening on port ${port}`);
});