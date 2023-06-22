"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comprobarJWT = exports.generedJWT = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const generedJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, process.env.JWT_SEED, {
            expiresIn: '4h'
        }, (err, accessToken) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el jsonwebtoken');
            }
            resolve(accessToken);
        });
    });
};
exports.generedJWT = generedJWT;
const comprobarJWT = (accessToken = '') => {
    try {
        const { id } = jwt.verify(accessToken.split(' ')[1], process.env.JWT_SEED);
        console.log(id);
        return [true, id];
    }
    catch (error) {
        return [false, null];
    }
};
exports.comprobarJWT = comprobarJWT;
