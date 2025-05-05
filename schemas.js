"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMatchSchema = exports.ResultSetSchema = exports.TeamDetailSchema = exports.TeamsSchema = exports.PlayerSchema = exports.TeamSchema = void 0;
var zod_1 = require("zod");
exports.TeamSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    shortName: zod_1.z.string(),
    tla: zod_1.z.string(),
    crest: zod_1.z.string(),
});
exports.PlayerSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    position: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string(),
    nationality: zod_1.z.string()
});
exports.TeamsSchema = zod_1.z.object({
    teams: zod_1.z.array(exports.TeamSchema),
});
exports.TeamDetailSchema = zod_1.z.object({
    squad: zod_1.z.array(exports.PlayerSchema),
});
exports.ResultSetSchema = zod_1.z.object({
    played: zod_1.z.number(),
    wins: zod_1.z.number(),
    losses: zod_1.z.number(),
    draws: zod_1.z.number(),
});
exports.TeamMatchSchema = zod_1.z.object({
    resultSet: exports.ResultSetSchema.optional(),
});
