import readline from "readline";
import { green, red, blue } from "cli-color";
import { existsSync, writeFile, mkdirSync } from "fs";
import { join, resolve } from "path";
import { v4 as uuidv4 } from 'uuid';


interface cmdhistori {
	cmd: string;
	time: number;
}

export function rec() {

	console.log(`${green("Starting records...")}`);
	const dir = join(resolve(), "records");
	if (!existsSync(dir)) mkdirSync(dir);

	const cmdarray: cmdhistori[] = [];
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

	rl.on("line", (line) => {
		if (line.trim().startsWith("close")) return rl.close();
		if (line.length === 0) return;

		cmdarray.push({
			cmd: line,
			time: new Date().getTime(),
		});

	})

	rl.on('close', () => {
		console.log(`${green("Closing records...")}`);

		if (cmdarray.length === 0) return;
		const rl2 = readline.createInterface({ input: process.stdin, output: process.stdout });

		rl2.question(`${green("Do you want to save the records? (y/n)")}`, (answer) => {
			if (answer.toLowerCase() != "y") return;

			rl2.question(`${green("Enter the name of the file ?:")}`, (answer1) => {

				const file = join(dir, `${answer1.length != 0 ? answer1 : uuidv4()}.json`);
				writeFile(file, JSON.stringify(cmdarray),
					(err) => (err ? console.log(`${red("Error to save Record! :c")}`) : false)
				);

				console.log(`${green("Records saved! in:")}\n${blue(file)}`);
				rl2.close();
			});

		});
	});
	return;
}