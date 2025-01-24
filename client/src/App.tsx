import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/profile/LoginPage.tsx";
import HomePage from "./pages/HomePage";
import Terms from "./Agreement/TermsConditions.mdx";
import { Toaster } from "./components/ui/toaster.tsx";
import RegisterPage from "./pages/profile/RegisterPage.tsx";
import UserBioPage from "./pages/profile/UserBioPage.tsx";
import PhonePreview from "./components/Phone-preview.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import VerificationPage from "./pages/VerificationPage.tsx";

const user = {
	avatar:
		"https://images.unsplash.com/photo-1736924862365-9038a7e1be81?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	username: "ranchod das",
};

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/register/about-me" element={<UserBioPage />} />
				<Route path="/:username/dashboard" element={<Dashboard />} />
				<Route path="/user/verify" element={<VerificationPage />} />
				<Route path="/terms" element={<Terms />} />
				<Route path="/phone-preview" element={<PhonePreview data={user} />} />
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
