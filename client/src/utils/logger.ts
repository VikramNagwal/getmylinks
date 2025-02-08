import chalk from "chalk";

export const logger = {
	success: (...args: unknown[]) => {
		console.log(chalk.green(...args));
	},
	warn: (...args: unknown[]) => {
		console.log(chalk.yellow(...args));
	},
	info: (...args: unknown[]) => {
		console.log(chalk.blue(...args));
	},
	error: (...args: unknown[]) => {
		console.log(chalk.bgRed(...args));
	},
};
