import {
	uniqueNamesGenerator,
	animals,
	adjectives,
	starWars,
	colors,
	Config,
} from "unique-names-generator";

export const generateRandomNames = () => {
	const config: Config = {
		dictionaries: [adjectives, colors, animals, starWars],
		separator: " ",
		length: 2,
        style: "capital",
	};
    return uniqueNamesGenerator(config).replace(/ /g, '-');
};
