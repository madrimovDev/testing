import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css";
import "./index.css";
import { StyleProvider } from "@ant-design/cssinjs";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={client}>
				<StyleProvider hashPriority="high">
					<ConfigProvider
						theme={{
							algorithm: theme.darkAlgorithm,
						}}
					>
						<App />
					</ConfigProvider>
				</StyleProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
);

