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
    // logic to sign up admin
    if (req.body.username && req.body.password) {
        var a = yield db_1.Admin.findOne({ username: req.body.username });
        if (a) {
            res.status(401).send('Username already exists.');
        }
        else {
            var newEntry = new db_1.Admin({ username: req.body.username, password: req.body.password });
            yield newEntry.save();
            var token = jsonwebtoken_1.default.sign({ username: req.body.username, role: 'admin' }, middleware_1.SECRET, { expiresIn: '1h' });
            res.status(200).send({ message: 'Admin created successfully', token: token });
        }
    }
    else {
        res.status(400).send('Insufficient parameters supplied.');
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to log in admin
    if (req.headers.username && req.headers.password) {
        var a = yield db_1.Admin.findOne({ username: req.headers.username, password: req.headers.password });
        if (a) {
            var token = jsonwebtoken_1.default.sign({ username: req.body.username, role: 'admin' }, middleware_1.SECRET, { expiresIn: '1h' });
            res.json({ message: 'Logged in successfully', token: token });
        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    else {
        res.status(400).send('Insufficient parameters supplied.');
    }
}));
router.get('/me', middleware_1.adminAuth, (req, res) => {
    res.json({ username: req.headers['username'] });
});
router.post('/courses', middleware_1.adminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to create a course
    var newCourse = req.body;
    if (newCourse.title && newCourse.description && newCourse.price && newCourse.imageLink && newCourse.published) {
        var a = new db_1.Course(newCourse);
        yield a.save();
        res.json({ message: 'Course created successfully', courseId: a.id });
    }
    else {
        res.status(400).send({ message: 'Insufficient parameters supplied' });
    }
}));
router.put('/courses/:courseId', middleware_1.adminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to edit a course
    var courseId = req.params.courseId;
    var a = yield db_1.Course.findByIdAndUpdate(courseId, req.body, { new: true });
    if (a) {
        res.json({ message: 'Course updated successfully' });
    }
    else {
        res.status(401).json({ message: 'Course not found' });
    }
}));
router.get('/courses', middleware_1.adminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // logic to get all courses
    var a = yield db_1.Course.find({});
    res.json({ courses: a });
}));
router.get('/course/:courseId', middleware_1.adminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
