"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("../middleware/");
const db_1 = require("../db/");
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to sign up user
    if (req.body.username && req.body.password) {
        var a = yield db_1.User.findOne({ username: req.body.username });
        if (a) {
            return res.status(401).json({ message: 'Username already exists' });
        }
        else {
            var newUser = new db_1.User({ username: req.body.username, password: req.body.password });
            yield newUser.save();
            var token = jsonwebtoken_1.default.sign({ username: req.body.username, role: 'user' }, middleware_1.SECRET, { expiresIn: '1h' });
            return res.json({ message: 'User created successfully', token: token });
        }
    }
    else {
        return res.status(400).send({ message: 'Insufficient parameters supplied' });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to log in user
    if (req.headers.username && req.headers.password) {
        var a = yield db_1.User.findOne({ username: req.headers.username, password: req.headers.password });
        if (a) {
            var token = jsonwebtoken_1.default.sign({ username: req.headers.username, role: 'user' }, middleware_1.SECRET, { expiresIn: '1h' });
            return res.json({ message: 'Logged in successfully', token: token });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    else {
        return res.status(400).send({ message: 'Insufficient parameters supplied' });
    }
}));
router.get('/me', middleware_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ username: req.headers['username'] });
}));
router.get('/courses', middleware_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to list all courses
    var a = yield db_1.Course.find({ published: true });
    res.json({ courses: a });
}));
router.get('/courses/:courseId', middleware_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to purchase a course
    var courseId = req.params.courseId;
    var a = yield db_1.Course.findById(courseId);
    console.log('a - ' + JSON.stringify(a));
    if (a) {
        var user = yield db_1.User.findOne({ username: req.headers['username'] });
        if (user) {
            //@ts-ignore
            user.purchasedCourses.push(a);
            yield user.save();
            res.json({ message: 'Course purchased successfully' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    else {
        res.status(401).json({ message: 'Course not found' });
    }
}));
router.get('/purchasedCourses', middleware_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to view purchased courses
    var user = yield db_1.User.findOne({ username: req.headers['username'] });
    if (user) {
        res.json({ purchasedCoursesIds: user.purchasedCourses || [] });
    }
    else {
        res.status(400).json({ message: 'User not found' });
    }
}));
router.get('/course/:courseId', middleware_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var courseId = req.params.courseId;
    var a = yield db_1.Course.findById(courseId);
    if (a) {
        res.status(200).json({ course: a });
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
exports.default = router;
