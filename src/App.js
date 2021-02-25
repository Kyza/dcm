import { Sidebar } from "./components";
import { Home, Ban, BDInstallingAddons } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

import sidebarStore from "./stores/sidebar";

function App() {
	const [sidebarOpen, setSidebarOpen] = useState(sidebarStore.getState().open);
	const spring = useSpring({
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
			style={spring}
		>
			<Router>
				<Sidebar />
				<div id="content">
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/ban">
							<Ban />
						</Route>
						<Route exact path="/bd/installing-addons">
							<BDInstallingAddons />
						</Route>
					</Switch>
				</div>
			</Router>
		</animated.div>
	);
}

export default App;
