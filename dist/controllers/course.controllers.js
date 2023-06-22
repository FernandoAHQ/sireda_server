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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = exports.findAll = exports.signup = exports.register = void 0;
const class_validator_1 = require("class-validator");
const map_errors_helper_1 = require("../helpers/map-errors.helper");
const course_entity_1 = require("../entities/course.entity");
const create_course_dto_1 = require("../dtos/course/create-course.dto");
const user_entity_1 = require("../entities/user.entity");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createCoruseDto = new create_course_dto_1.CreateCourseDto(req.body);
    const errors = yield (0, class_validator_1.validate)(createCoruseDto);
    if (errors.length > 0) {
        return res.status(400).json({
            status: false,
            errors: (0, map_errors_helper_1.mapErrors)(errors)
        });
    }
    try {
        const course = new course_entity_1.Course();
        course.title = createCoruseDto.title;
        course.objective = createCoruseDto.objective;
        course.place = createCoruseDto.place;
        course.period = createCoruseDto.period;
        course.target = createCoruseDto.target;
        course.hours = createCoruseDto.hours;
        course.instructor = createCoruseDto.instructor;
        course.prerequisites = createCoruseDto.prerequisites;
        yield course.save();
        res.status(200).json({
            status: true,
            course,
        });
    }
    catch (error) {
        handleExceptions(error, res);
    }
});
exports.register = register;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, course } = req.body;
    try {
        const courseExists = yield course_entity_1.Course.findById(course);
        const userExists = yield user_entity_1.User.findById(user);
        if (!courseExists || !userExists) {
            return res.status(404).json({
                status: false,
                message: 'Error',
            });
        }
        for (let i = 0; i < courseExists.users.length; i++) {
            console.log(courseExists.users[i]);
            if (courseExists.users[i].toString().includes(user)) {
                return res.status(200).json({
                    status: false,
                    message: "Ya estás inscrito a este curso",
                });
            }
        }
        courseExists === null || courseExists === void 0 ? void 0 : courseExists.users.push(userExists.id);
        yield courseExists.save();
        res.status(200).json({
            status: true,
            message: "Te has inscrito al curso: " + courseExists.title,
        });
    }
    catch (error) {
        handleExceptions(error, res);
    }
});
exports.signup = signup;
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield course_entity_1.Course.find({});
        res.status(200).json({
            status: true,
            courses,
        });
    }
    catch (error) {
        handleExceptions(error, res);
    }
});
exports.findAll = findAll;
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(404).json({
            status: false,
            message: "Nope",
        });
    try {
        const course = yield course_entity_1.Course.findById(id);
        res.status(200).json({
            status: true,
            course,
        });
    }
    catch (error) {
        handleExceptions(error, res);
    }
});
exports.findOne = findOne;
const handleExceptions = (error, res) => {
    if (error.code == '23505') {
        return res.status(400).json({
            status: false,
            message: `${error.detail}`
        });
    }
    console.log(error);
    return res.status(500).json({
        status: false,
        message: `Unexpected error, check server logs.`
    });
};
