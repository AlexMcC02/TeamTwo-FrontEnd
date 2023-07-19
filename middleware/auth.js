"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (req, res, next) {
    if (req.session.token && req.session.token.length > 0) {
        next();
    }
    else {
        res.redirect('/login');
    }
};
