import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider, QueryClient } from "react-query";
import { PostHogProvider } from "posthog-js/react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

const options = {
	api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
};
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<PostHogProvider
		apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_API_KEY}
		options={options}
	>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<StrictMode>
					<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
						<App />
					</ThemeProvider>
				</StrictMode>
			</BrowserRouter>
		</QueryClientProvider>
	</PostHogProvider>,
);
