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


function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/register/about-me" element={<UserBioPage />} />
				<Route path="/:username/dashboard" element={<Dashboard />} />
				<Route path="/:uuid/verify" element={<VerificationPage />} />
				<Route path="/terms" element={<Terms />} />
				<Route path="/phone-preview" element={<PhonePreview  />} />
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
