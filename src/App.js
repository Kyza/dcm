import { Sidebar } from "./components";

import {
	BrowserRouter as Router,
	Switch,
	Route,
	useLocation,
} from "react-router-dom";

import { useState, useEffect, lazy, Suspense } from "react";
import { useSpring, animated, useTransition } from "react-spring";

import sidebarStore from "./stores/sidebar";

import Lazy from "./pages/Lazy";

const Home = lazy(() => import("./pages/Home"));
const Ban = lazy(() => import("./pages/Ban"));
const BDInstallingAddons = lazy(() => import("./pages/BDInstallingAddons"));
const WebpackModules = lazy(() => import("./pages/WebpackModules"));

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(sidebarStore.getState().open);
	const sidebarSpring = useSpring({
		gridTemplateColumns: `${
			sidebarOpen ? (window.innerWidth <= 958 ? window.innerWidth : 400) : 24
		}px auto`,
	});

	useEffect(() => {
		const sidebarUnsubscribe = sidebarStore.subscribe(() =>
			setSidebarOpen(sidebarStore.getState().open)
		);

		return () => {
			sidebarUnsubscribe();
		};
	}, []);

	return (
		<animated.div
			id="body"
			className={`sidebar-${sidebarOpen ? "open" : "closed"}`}
			style={sidebarSpring}
		>
			<Router>
				<Sidebar />
				<div id="content">
					<Suspense fallback={<Lazy />}>
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route exact path="/ban">
								<Ban />
							</Route>
							<Route exact path="/concepts/webpack-modules">
								<WebpackModules />
							</Route>
							<Route exact path="/betterdiscord/installing-addons">
								<BDInstallingAddons />
							</Route>
						</Switch>
					</Suspense>
				</div>
			</Router>
		</animated.div>
	);
}

export default App;
