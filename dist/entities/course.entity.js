"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    objective: String,
    place: String,
    hours: Number,
    target: String,
    instructor: String,
    period: String,
    prerequisites: String,
    users: {
        type: [{
                user: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'User'
                }
            }]
    }
});
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
