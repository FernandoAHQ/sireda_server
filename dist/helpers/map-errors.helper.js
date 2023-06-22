"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapErrors = void 0;
const mapErrors = (errors) => {
    let errorConstraints = [];
    errors.forEach(err => {
        for (const key in err.constraints) {
            errorConstraints.push(err.constraints[key]);
        }
    });
    return errorConstraints;
};
exports.mapErrors = mapErrors;
