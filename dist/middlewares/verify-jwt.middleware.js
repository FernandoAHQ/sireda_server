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
exports.verifyJwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const verifyJwt = (req, res, next) => {
    try {
        if (!req.headers['authorization']) {
            return res.status(401).json({
                status: false,
                message: 'No hay accessToken'
            });
        }
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const accessToken = bearerToken[1];
        const { id } = jwt.verify(accessToken, process.env.JWT_SEED);
        req.id = id;
        next();
    }
    catch (error) {
        res.status(401).json({
            status: false,
            message: 'Token inválido.'
        });
    }
};
exports.verifyJwt = verifyJwt;
