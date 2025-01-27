import chalk from "chalk";

export const logger = {
	error: (...args: unknown[]) => {
		console.log(chalk.red(...args));
	},
	info: (...args: unknown[]) => {
		console.log(chalk.blue(...args));
	},
	success: (...args: unknown[]) => {
		console.log(chalk.green(...args));
	},
	warning: (...args: unknown[]) => {
		console.log(chalk.yellow(...args));
	},
	debug: (...args: unknown[]) => {
		console.log(chalk.gray(...args));
	},
};
