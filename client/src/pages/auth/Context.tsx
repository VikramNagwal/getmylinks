import { useState, createContext, useContext } from "react";

interface authContextProps {
	email: string;
	username: string;
	setEmail: (email: string) => void;
	setUsername: (username: string) => void;
}

const AuthContext = createContext<authContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");

	return (
		<AuthContext.Provider value={{ email, username, setEmail, setUsername }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuthContext must be used within AuthProvider!");
	}

	return context;
};
