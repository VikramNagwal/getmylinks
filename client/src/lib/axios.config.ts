import axios from "axios";

export default axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_BACKEND_URL,
});
