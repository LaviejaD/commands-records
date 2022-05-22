#!/usr/bin/env node
process.argv.splice(0, 2);
import { rec } from "../commands-records/rec";
import { play } from "../commands-records/play";
import { bgRed, bgBlack } from "cli-color";


const options = {
	"help": () => { },
	"play": (wait: number, id: string) => { play(wait, id) },
	"wait": (n: number = 3) => n * 1000,
};

(() => {
	if (process.argv.length === 0) {
		rec();
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
				console.log(bgRed("Argument Error:"), bgBlack(" You must enter the id of the record!"));
				break;
			}
			play = true;
			id = process.argv[index + 1];
			index++;
			continue;
		}
	}

	if (play) options["play"](time, id);
	console.log(process.argv);
	return;
})()	