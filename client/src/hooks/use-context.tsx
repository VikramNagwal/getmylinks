import { ReactNode } from "react";

const useContextProvider = ({ children }: { children: ReactNode }) => {
	return <div>{children}</div>;
};

export default useContextProvider;
