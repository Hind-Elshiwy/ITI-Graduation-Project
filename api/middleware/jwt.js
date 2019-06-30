const jwt = require('jsonwebtoken');

authenticate = (req, res, next) => {
    try {
        // console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "AmrWali_Project")
        req._id = decoded._id;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "Not Authorized"
        });
    }
}

module.exports = authenticate