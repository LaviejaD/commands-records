"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rec = void 0;
const readline_1 = __importDefault(require("readline"));
const cli_color_1 = require("cli-color");
const fs_1 = require("fs");
const path_1 = require("path");
const uuid_1 = require("uuid");
function rec() {
    console.log(`${cli_color_1.green("Starting records...")}`);
    const dir = path_1.join(path_1.resolve(), "records");
    if (!fs_1.existsSync(dir))
        fs_1.mkdirSync(dir);
    const cmdarray = [];
    const rl = readline_1.default.createInterface({ input: process.stdin, output: process.stdout });
    rl.on("line", (line) => {
        if (line.trim().startsWith("close"))
            return rl.close();
        if (line.length === 0)
            return;
        cmdarray.push({
            cmd: line,
            time: new Date().getTime(),
        });
    });
    rl.on('close', () => {
        console.log(`${cli_color_1.green("Closing records...")}`);
        if (cmdarray.length === 0)
            return;
        const rl2 = readline_1.default.createInterface({ input: process.stdin, output: process.stdout });
        rl2.question(`${cli_color_1.green("Do you want to save the records? (y/n)")}`, (answer) => {
            if (answer.toLowerCase() != "y")
                return;
            rl2.question(`${cli_color_1.green("Enter the name of the file ?:")}`, (answer1) => {
                const file = path_1.join(dir, `${answer1.length != 0 ? answer1 : uuid_1.v4()}.json`);
                fs_1.writeFile(file, JSON.stringify(cmdarray), (err) => (err ? console.log(`${cli_color_1.red("Error to save Record! :c")}`) : false));
                console.log(`${cli_color_1.green("Records saved! in:")}\n${cli_color_1.blue(file)}`);
                rl2.close();
            });
        });
    });
    return;
}
exports.rec = rec;
