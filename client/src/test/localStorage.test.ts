import { useLocalStorage } from "@/hooks/useLocalStorge";

const setlocalData = (k: string, v: string) => {
	const data = useLocalStorage(k, v);
	console.log(data);
};
setlocalData("hero", "suprman");
