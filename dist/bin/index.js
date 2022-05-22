#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
process.argv.splice(0, 2);
const rec_1 = require("../commands-records/rec");
const play_1 = require("../commands-records/play");
const cli_color_1 = require("cli-color");
const options = {
    "help": () => { },
    "play": (wait, id) => { play_1.play(wait, id); },
    "wait": (n = 5) => n * 1000,
};
(() => {
    if (process.argv.length === 0) {
        rec_1.rec();
        return;
    }
    let time = 5000;
    let id = "";
    let play = false;
    for (let index = 0; index < process.argv.length; index++) {
        const element = process.argv[index];
        if (element === "--help" || element === "-h") {
            options["help"]();
            break;
        }
        if (element === "--wait" || element === "-w") {
            time = options["wait"](Number(process.argv[index + 1]));
            index++;
            continue;
        }
        if (element === "--play" || element === "-p") {
            if (!process.argv[index + 1]) {
                console.log(cli_color_1.bgRed("Argument Error:"), cli_color_1.bgBlack(" You must enter the id of the record!"));
                break;
            }
            play = true;
            id = process.argv[index + 1];
            index++;
            continue;
        }
    }
    if (play)
        options["play"](time, id);
    console.log(process.argv);
    return;
})();
