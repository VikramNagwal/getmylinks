import { createContext, useContext, useState } from "react";

interface EmailContextType {
	email: string;
	username: string;
	isVerified: boolean;
	setEmailVerified: (isVerified: boolean) => void;
	setEmail: (email: string) => void;
	setUsername: (username: string) => void;
	getDatafromLocalStorage: () => {
		email: string;
		username: string;
		isVerified: boolean;
	};
	logout: () => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export function useEmail() {
	const context = useContext(EmailContext);
	if (context === undefined) {
		throw new Error("useEmail must be used within an EmailContextProvider");
	}
	return context;
}

export const EmailContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [email, setEmail] = useState<string>(
		() => localStorage.getItem("email") || "",
	);
	const [username, setUsername] = useState<string>(
		() => localStorage.getItem("username") || "",
	);
	const [isVerified, setEmailVerified] = useState<boolean>(
		() => localStorage.getItem("isVerified") === "true",
	);

	function getDatafromLocalStorage() {
		setEmail(localStorage.getItem("email") || "");
		setUsername(localStorage.getItem("username") || "");
		setEmailVerified(localStorage.getItem("isVerified") === "true");
		return {
			email,
			username,
			isVerified,
		};
	}

	function logout() {
		setEmail("");
		setUsername("");
		setEmailVerified(false);
	}

	return (
		<EmailContext.Provider
			value={{
				email,
				username,
				isVerified,
				setUsername,
				setEmailVerified,
				setEmail,
				getDatafromLocalStorage,
				logout,
			}}
		>
			{children}
		</EmailContext.Provider>
	);
};

export default EmailContext;
