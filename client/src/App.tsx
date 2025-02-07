import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.tsx";
import HomePage from "./pages/HomePage";
import { Toaster } from "./components/ui/toaster.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import PhonePreview from "./components/Phone-preview.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import VerificationPage from "./pages/auth/VerificationPage.tsx";
import { EmailVerifyRequest } from "./pages/auth/Email-verification-appeal.tsx";
import { EmailContextProvider } from "./context/email-context.tsx";

function App() {
	return (
		<>
			<EmailContextProvider>
				<Routes>
					<Route index element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/:uuid/verify" element={<VerificationPage />} />
					<Route path="/:username/dashboard" element={<Dashboard />} />
					<Route
						path="/request/verify-email"
						element={<EmailVerifyRequest />}
					/>
					<Route path="/phone-preview" element={<PhonePreview />} />
				</Routes>
				<Toaster />
			</EmailContextProvider>
		</>
	);
}

export default App;
