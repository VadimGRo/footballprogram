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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer_1 = require("inquirer");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: ".env.local" });
var ora_1 = require("ora");
var apimanager_1 = require("./apimanager");
var spinner = (0, ora_1.default)("Loading");
function getTeamNames() {
    return __awaiter(this, void 0, void 0, function () {
        var teamNames;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spinner.start();
                    return [4 /*yield*/, apimanager_1.apiManager.getTeamNames()];
                case 1:
                    teamNames = _a.sent();
                    spinner.stop();
                    console.log("\nTeam names:");
                    teamNames.forEach(function (name) { return console.log(name); });
                    return [2 /*return*/];
            }
        });
    });
}
function getTeamInfo() {
    return __awaiter(this, void 0, void 0, function () {
        var data, answers, team;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spinner.start();
                    return [4 /*yield*/, apimanager_1.apiManager.getData()];
                case 1:
                    data = _a.sent();
                    spinner.stop();
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: "list",
                                name: "choose",
                                message: "About what team do you want to know information?\n",
                                choices: data.teams.map(function (team) { return team.name; }),
                            },
                        ])];
                case 2:
                    answers = _a.sent();
                    return [4 /*yield*/, apimanager_1.apiManager.getTeamDataByName(answers.choose)];
                case 3:
                    team = _a.sent();
                    console.log("\nInformation about your team:");
                    console.log("id: ".concat(team.id));
                    console.log("name: ".concat(team.name));
                    console.log("shortName: ".concat(team.shortName));
                    console.log("tla: ".concat(team.tla));
                    console.log("crest: ".concat(team.crest));
                    return [2 /*return*/];
            }
        });
    });
}
function getPlayers() {
    return __awaiter(this, void 0, void 0, function () {
        var data, answers, players;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spinner.start();
                    return [4 /*yield*/, apimanager_1.apiManager.getData()];
                case 1:
                    data = _a.sent();
                    spinner.stop();
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: "list",
                                name: "choose",
                                message: "Choose a team to view its players:\n",
                                choices: data.teams.map(function (team) { return ({
                                    name: team.name,
                                    value: team.id,
                                }); }),
                            },
                        ])];
                case 2:
                    answers = _a.sent();
                    spinner.start();
                    return [4 /*yield*/, apimanager_1.apiManager.getPlayers(answers.choose)];
                case 3:
                    players = _a.sent();
                    spinner.stop();
                    console.log("\nPlayers of the team:");
                    players.forEach(function (player) {
                        console.log("".concat(player.name, " - ").concat(player.position));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function getTeamStatistics() {
    return __awaiter(this, void 0, void 0, function () {
        var data, answers, stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spinner.start();
                    return [4 /*yield*/, apimanager_1.apiManager.getData()];
                case 1:
                    data = _a.sent();
                    spinner.stop();
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: "list",
                                name: "choose",
                                message: "Choose a team to view its statistics:\n",
                                choices: data.teams.map(function (team) { return ({
                                    name: team.name,
                                    value: team.id,
                                }); }),
                            },
                        ])];
                case 2:
                    answers = _a.sent();
                    spinner.start();
                    return [4 /*yield*/, apimanager_1.apiManager.getTeamStatistics(answers.choose)];
                case 3:
                    stats = _a.sent();
                    spinner.stop();
                    if (stats) {
                        console.log("\nTeam statistics:");
                        console.log("Matches: ".concat(stats.played));
                        console.log("Wins: ".concat(stats.wins));
                        console.log("Losses: ".concat(stats.losses));
                        console.log("Draws: ".concat(stats.draws));
                    }
                    else {
                        console.log("No statistics found.");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function promptUser() {
    return __awaiter(this, void 0, void 0, function () {
        var answers, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            type: "list",
                            name: "action",
                            message: "What do you want to do?",
                            choices: [
                                "Team names",
                                "Information about teams",
                                "Players from the team",
                                "Statistic of the team",
                                "Exit",
                            ],
                        },
                    ])];
                case 1:
                    answers = _b.sent();
                    _a = answers.action;
                    switch (_a) {
                        case "Team names": return [3 /*break*/, 2];
                        case "Information about teams": return [3 /*break*/, 4];
                        case "Players from the team": return [3 /*break*/, 6];
                        case "Statistic of the team": return [3 /*break*/, 8];
                        case "Exit": return [3 /*break*/, 10];
                    }
                    return [3 /*break*/, 11];
                case 2: return [4 /*yield*/, getTeamNames()];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 4: return [4 /*yield*/, getTeamInfo()];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 6: return [4 /*yield*/, getPlayers()];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 8: return [4 /*yield*/, getTeamStatistics()];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 10:
                    console.log("Goodbye!");
                    process.exit(0);
                    _b.label = 11;
                case 11: return [2 /*return*/];
            }
        });
    });
}
promptUser();
