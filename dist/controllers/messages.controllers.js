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
exports.create = exports.getChat = void 0;
const class_validator_1 = require("class-validator");
const dtos_1 = require("../dtos");
const message_entity_1 = require("../entities/message.entity");
const user_entity_1 = require("../entities/user.entity");
const map_errors_helper_1 = require("../helpers/map-errors.helper");
const getChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const from = req.id;
    const to = req.params.from;
    const last30 = yield message_entity_1.Message.find({
        $or: [
            { from: from, to: to },
            { from: to, to: from },
        ]
    })
        .sort({ createdAt: 'asc' })
        .limit(30);
    res.json({
        status: true,
        messages: last30
    });
});
exports.getChat = getChat;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.id;
    const createMessageDto = new dtos_1.CreateMessageDto(req.body);
    const errors = yield (0, class_validator_1.validate)(createMessageDto);
    if (errors.length > 0) {
        return res.status(400).json({
            status: false,
            errors: (0, map_errors_helper_1.mapErrors)(errors)
        });
    }
    const user = yield user_entity_1.User.findById(id);
    if (!user) {
        return res.status(404).json({
            status: false,
            message: `User with id "${id}" not found`
        });
    }
    // const message = new Message()
    // message.content = createMessageDto.content;
    // message.to = user;
    // message.from = user; 
    const message = new message_entity_1.Message(Object.assign(Object.assign({}, createMessageDto), { to: user, from: user }));
    yield message.save();
    res.json({
        status: true,
        message
    });
});
exports.create = create;
