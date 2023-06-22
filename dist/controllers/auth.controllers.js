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
exports.renew = exports.login = exports.validateUsername = exports.register = void 0;
const class_validator_1 = require("class-validator");
const dtos_1 = require("../dtos");
const map_errors_helper_1 = require("../helpers/map-errors.helper");
const jwt_helper_1 = require("../helpers/jwt.helper");
const user_entity_1 = require("../entities/user.entity");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createUserDto = new dtos_1.CreateUserDto(req.body);
    const errors = yield (0, class_validator_1.validate)(createUserDto);
    if (errors.length > 0) {
        return res.status(400).json({
            status: false,
            errors: (0, map_errors_helper_1.mapErrors)(errors)
        });
    }
    try {
        const user = new user_entity_1.User();
        user.name = createUserDto.name;
        user.lastName = createUserDto.lastName;
        user.username = createUserDto.username;
        user.department = createUserDto.department;
        yield user.save();
        const accessToken = yield (0, jwt_helper_1.generedJWT)(user.id);
        res.status(200).json({
            status: true,
            user,
            accessToken
        });
    }
    catch (error) {
        handleExceptions(error, res);
    }
});
exports.register = register;
const validateUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        const user = yield user_entity_1.User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                status: false,
                message: `User with username "${username}" not found`
            });
        }
        const accessToken = yield (0, jwt_helper_1.generedJWT)(user.id);
        res.status(200).json({
            status: true,
            user,
            accessToken
        });
    }
    catch (error) {
        handleExceptions(error, res);
    }
});
exports.validateUsername = validateUsername;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = new dtos_1.LoginUserDto(req.body);
    const errors = yield (0, class_validator_1.validate)({ username });
    if (errors.length > 0) {
        return res.status(400).json({
            status: false,
            errors: (0, map_errors_helper_1.mapErrors)(errors)
        });
    }
    try {
        const user = yield user_entity_1.User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                status: false,
                message: `User with username "${username}" not found`
            });
        }
        const accessToken = yield (0, jwt_helper_1.generedJWT)(user.id);
        res.status(200).json({
            status: true,
            user,
            accessToken
        });
    }
    catch (error) {
        handleExceptions(error, res);
    }
});
exports.login = login;
const renew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const accessToken = yield (0, jwt_helper_1.generedJWT)(id);
    const user = yield user_entity_1.User.findById(id);
    if (!user) {
        return res.status(404).json({
            status: false,
            message: `User with id "${id}" not found`
        });
    }
    res.json({
        status: true,
        user,
        accessToken
    });
});
exports.renew = renew;
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
