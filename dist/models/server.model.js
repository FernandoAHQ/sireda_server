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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const sockets_model_1 = require("./sockets.model");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../database/config");
// Rutas
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const message_routes_1 = __importDefault(require("../routes/message.routes"));
const course_routes_1 = __importDefault(require("../routes/course.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = +process.env.PORT;
        this.server = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.server);
    }
    middlewares() {
        // this.app.use(morgan('dev'))
        // Habilitar CORS
        this.app.use((0, cors_1.default)());
        // Parseo del body
        // this.app.use( express.json() );
        this.app.use(body_parser_1.default.json());
        // Habilitar rutas
        this.app.use('/api/auth', auth_routes_1.default);
        this.app.use('/api/course', course_routes_1.default);
        this.app.use('/api/messages', message_routes_1.default);
        this.app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
    }
    init() {
        (0, config_1.dbConnection)();
        // Inicializar middlewares
        this.middlewares();
        // Inicializar sockets
        const sockets = new sockets_model_1.Sockets(this.io);
        sockets.handleEvents();
        // Inicializar servidor
        this.server.listen(this.port, () => __awaiter(this, void 0, void 0, function* () {
            console.log(`Servidor corriendo en el puerto: ${this.port}`);
        }));
    }
}
exports.Server = Server;
