"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controllers_1 = require("../controllers/course.controllers");
const router = (0, express_1.Router)();
router.post('/register', course_controllers_1.register);
router.get('/all', course_controllers_1.findAll);
router.post('/signup', course_controllers_1.signup);
router.get('/details/:id', course_controllers_1.findOne);
// router.get('/renew', verifyJwt , renew )
exports.default = router;
