import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/Theme-provider.tsx";
import { Provider } from "react-redux";
import { Provider as Wrapper } from "react-wrap-balancer";
import { QueryClientProvider, QueryClient } from "react-query";
import { PostHogProvider } from "posthog-js/react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { store } from "./app/store.ts";

const queryClient = new QueryClient();
const options = {
	api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
};

createRoot(document.getElementById("root")!).render(
	<PostHogProvider
		apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_API_KEY}
		options={options}
	>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<BrowserRouter>
					<Wrapper>
						<StrictMode>
							<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
								<App />
							</ThemeProvider>
						</StrictMode>
					</Wrapper>
				</BrowserRouter>
			</Provider>
		</QueryClientProvider>
	</PostHogProvider>,
);
