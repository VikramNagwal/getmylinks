import { Route, Routes } from "react-router-dom";
import LoginPage from "./views/authentication/Login.tsx";
import HomePage from "./views/Home.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import RegisterPage from "./views/authentication/Register.tsx";
import PhonePreview from "./components/Phone-preview.tsx";
import VerificationPage from "./views/verification/Verification.tsx";
import { EmailVerifyRequest } from "./views/verification/Appeal.tsx";
import { EmailContextProvider } from "./app/context/email-context.tsx";
import Dashboard from "./views/dashboard/Dashboard.tsx";

function App() {
	return (
		<>
			<EmailContextProvider>
				<Routes>
					<Route element={<HomePage />} index />
					<Route path="/:id" />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/:uuid/verify" element={<VerificationPage />} />
					<Route path="/admin" element={<Dashboard />} />
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
