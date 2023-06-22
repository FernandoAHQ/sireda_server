"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_controllers_1 = require("../controllers/messages.controllers");
const verify_jwt_middleware_1 = require("../middlewares/verify-jwt.middleware");
const router = (0, express_1.Router)();
router.get('/:from', verify_jwt_middleware_1.verifyJwt, messages_controllers_1.getChat);
exports.default = router;
