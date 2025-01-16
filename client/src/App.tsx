import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Profile/LoginPage.tsx";
import HomePage from "./pages/HomePage";
import Terms from "./Agreement/TermsConditions.mdx";
import { Toaster } from "./components/ui/toaster.tsx";
import RegisterPage from "./pages/Profile/RegisterPage.tsx";
import UserBioPage from "./pages/Profile/UserBioPage.tsx";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/register/about-me" element={<UserBioPage />} />
				<Route path="/terms" element={<Terms />} />
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
