import { existsSync } from "fs";
import { join, resolve } from "path";
import { red } from "cli-color";
import { typeString, keyTap } from "robotjs";
import { readFile } from "fs";
import { promisify } from "util";

interface cmdhistori {
	cmd: string;
	time: number;
}
export function play(wait: number, id: string) {
	const dir = join(resolve(), "records");
	const file = existsSync(id) ? id : join(dir, `${id}.json`);
	if (!existsSync(file)) return console.log(red(`File id ${id} not found!`));
	const sleep = promisify(setTimeout);

	readFile(file, async (err, data) => {

		if (err) return console.log(red(`Error to read file id ${id}!`));
		console.log(JSON.parse(data.toString()));
		const cmdarray: cmdhistori[] = JSON.parse(data.toString());
		await sleep(2000)
		cmdarray.sort((a, b) => a.time - b.time);

		cmdarray.forEach(async (cmd) => {
			await sleep(wait);
			typeString(cmd.cmd);
			keyTap("enter");
		})

		return;
	})
	return;
}