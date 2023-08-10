"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const admin_1 = __importDefault(require("./routes/admin"));
const users_1 = __importDefault(require("./routes/users"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/admin', admin_1.default);
app.use('/users', users_1.default);
mongoose_1.default.connect('mongodb+srv://astk:qwerty1234@cluster0.v0dgsju.mongodb.net/CoursesApp');
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
