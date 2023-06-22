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
exports.addMessage = exports.getAllUsers = exports.userDisconnected = exports.userConnected = void 0;
const message_entity_1 = require("../entities/message.entity");
const user_entity_1 = require("../entities/user.entity");
const userConnected = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_entity_1.User.findById(id);
    if (!user)
        return null;
    user.isOnline = true;
    yield user.save();
    return user;
});
exports.userConnected = userConnected;
const userDisconnected = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_entity_1.User.findById(id);
    if (!user)
        return null;
    user.isOnline = false;
    yield user.save();
    return user;
});
exports.userDisconnected = userDisconnected;
const getAllUsers = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_entity_1.User.find({
        _id: { $ne: id },
        order: {
            isOnline: "DESC",
        }
    });
    return users;
});
exports.getAllUsers = getAllUsers;
const addMessage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = new message_entity_1.Message(payload);
        yield message.save();
        return message;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.addMessage = addMessage;
