const ratelimit = require('express-rate-limit');

const limiter = ratelimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handelr: (req, res) => {
        status:"error",
        res.status(429).json({status:"error", message: "Too many requests, please try again later." });
    }

});

module.exports = limiter;