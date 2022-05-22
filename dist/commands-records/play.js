"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.play = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const cli_color_1 = require("cli-color");
const robotjs_1 = require("robotjs");
const fs_2 = require("fs");
const util_1 = require("util");
function play(wait, id) {
    const dir = path_1.join(path_1.resolve(), "records");
    const file = fs_1.existsSync(id) ? id : path_1.join(dir, `${id}.json`);
    if (!fs_1.existsSync(file))
        return console.log(cli_color_1.red(`File id ${id} not found!`));
    const sleep = util_1.promisify(setTimeout);
    fs_2.readFile(file, async (err, data) => {
        if (err)
            return console.log(cli_color_1.red(`Error to read file id ${id}!`));
        console.log(JSON.parse(data.toString()));
        const cmdarray = JSON.parse(data.toString());
        await sleep(2000);
        cmdarray.sort((a, b) => a.time - b.time);
        cmdarray.forEach(async (cmd) => {
            await sleep(wait);
            robotjs_1.typeString(cmd.cmd);
            robotjs_1.keyTap("enter");
        });
        return;
    });
    return;
}
exports.play = play;
