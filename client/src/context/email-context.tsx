import { createContext, useContext, useState } from "react";

interface EmailContextType {
  email: string | null;
  isVerified: boolean;
  setEmailVerified: (isVerified: boolean) => void;
  setEmail: (email: string) => void;
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
  const [email, setEmail] = useState<string | null>(null);
  const [isVerified, setEmailVerified] = useState<boolean>(false);

  return (
    <EmailContext.Provider
      value={{ email, isVerified, setEmailVerified, setEmail }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export default EmailContext;
