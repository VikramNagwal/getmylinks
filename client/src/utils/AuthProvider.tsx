import { KindeProvider } from "@kinde-oss/kinde-auth-react";


import { ReactNode } from 'react';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => (
    <KindeProvider
        clientId={String(import.meta.env.VITE_AUTH_CLIENT_ID)}
        domain={String(import.meta.env.VITE_AUTH_DOMAIN)}
        redirectUri={String(import.meta.env.VITE_REDIRECT_URI)}
        logoutUri={String(import.meta.env.VITE_LOGOUT_URI)}
    >
        {children}
    </KindeProvider>
)