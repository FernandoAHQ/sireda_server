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
exports.Sockets = void 0;
const jwt_helper_1 = require("../helpers/jwt.helper");
const users_events_1 = require("../sockets/users.events");
class Sockets {
    constructor(io) {
        this.io = io;
    }
    handleEvents() {
        this.io.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
            // Validar accessToken
            const [isValid, id] = (0, jwt_helper_1.comprobarJWT)(socket.handshake.query['Authorization']);
            if (!isValid) {
                console.log('Socket no identificado');
                return socket.disconnect();
            }
            console.log('Cliente conectado', id);
            yield (0, users_events_1.userConnected)(id);
            // Unir al usuario a su sala
            socket.join(id);
            // Escuchar mensaje personal 
            socket.on('personal-message', (payload) => __awaiter(this, void 0, void 0, function* () {
                //Grabar mensaje en base de datos
                const message = yield (0, users_events_1.addMessage)(payload);
                this.io.to(payload.to).emit('personal-message', message);
                this.io.to(payload.from).emit('personal-message', message);
            }));
            // Emitir usuarios conectados a TODOS
            this.io.emit('list-users', yield (0, users_events_1.getAllUsers)(id));
            socket.on('disconnect', (reason) => __awaiter(this, void 0, void 0, function* () {
                console.log('Cliente desconectado', { id, reason });
                yield (0, users_events_1.userDisconnected)(id);
                this.io.emit('list-users', yield (0, users_events_1.getAllUsers)(id));
            }));
        }));
    }
}
exports.Sockets = Sockets;
