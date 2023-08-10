"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = exports.adminAuth = exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET = 'SECr3t'; // This should be in an environment variable in a real application
const adminAuth = (req, res, next) => {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        var t = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(t, exports.SECRET, function (err, decodedPayload) {
            if (err) {
                return res.status(403).json({ message: 'Cannot verify token' });
            }
            if (!decodedPayload) {
                return res.sendStatus(403);
            }
            if (typeof decodedPayload == 'string') {
                return res.sendStatus(403);
            }
            if (decodedPayload.role == 'admin') {
                req.headers['username'] = decodedPayload.username;
                next();
            }
            else {
                return res.status(403).json({ message: 'Forbidden' });
            }
        });
    }
    else {
        res.status(403).json({ message: 'Unauthorized' });
    }
};
exports.adminAuth = adminAuth;
const userAuth = (req, res, next) => {
    if (req.headers.authorization) {
        var token = req.headers.authorization.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.SECRET, function (err, decodedPayload) {
            if (err) {
                return res.status(403).json({ message: 'Cannot verify token' });
            }
            if (!decodedPayload) {
                return res.sendStatus(403);
            }
            if (typeof decodedPayload == 'string') {
                return res.sendStatus(403);
            }
            if (decodedPayload.role == 'user') {
                req.headers['username'] = decodedPayload.username;
                next();
            }
            else {
                return res.status(403).json({ message: 'Forbidden' });
            }
        });
    }
    else {
        res.status(403).json({ message: 'Unauthorized' });
    }
};
exports.userAuth = userAuth;
