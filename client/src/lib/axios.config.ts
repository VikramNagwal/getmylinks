import axios from "axios";

axios.defaults.withCredentials = true;

export const fireCall = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_BACKEND_URL,
});
