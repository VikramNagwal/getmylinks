import { useState } from "react";

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
	const [value, setValue] = useState<T>(() => {
		try {
			const data = localStorage.getItem(key);
			return data ? JSON.parse(data) : initialValue;
		} catch (error) {
			console.log("error while fetching data from localstorage");
			return initialValue;
		}
	});
	console.log(value, setValue);
	return <h1>h</h1>;
};
