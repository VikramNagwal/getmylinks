export const generateRandomUid = () => {
	return crypto.randomUUID();
};
const data = generateRandomUid();
console.log(data);
