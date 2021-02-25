import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

import sidebar from "../stores/sidebar";
import SidebarButton from "./SidebarButton";
import "./Sidebar.css";
import Menu from "./Menu";

export default function Sidebar() {
	const [sidebarOpen, setSidebarOpen] = useState(sidebar.getState().open);
	const spring = useSpring({
		opacity: sidebarOpen ? 1 : 0,
	});

	useEffect(() => {
		const sidebarUnsubscribe = sidebar.subscribe(() =>
			setSidebarOpen(sidebar.getState().open)
		);

		return () => {
			sidebarUnsubscribe();
		};
	}, []);

	return (
		<>
			<div id="sidebar-wrapper">
				<animated.div style={spring} id="sidebar">
					<SidebarButton to="/">Home</SidebarButton>
					<SidebarButton depth="0" redirect to="/ban">
						FAQ
					</SidebarButton>
					<SidebarButton to="/ban">Ban</SidebarButton>
					<SidebarButton to="/3">Page 3</SidebarButton>
					<SidebarButton depth="0" redirect to="/bd">
						Client Mods
					</SidebarButton>
					<SidebarButton to="/bd">BetterDiscord</SidebarButton>
					<SidebarButton to="/bd/installing-addons">
						Installing Addons
					</SidebarButton>
					<SidebarButton
						depth="2"
						to="https://github.com/rauenzi/BetterDiscordApp#installation"
					>
						Download
					</SidebarButton>
					<SidebarButton
						depth="2"
						to={
							Math.round(Math.random())
								? "https://discord.gg/0Tmfo5ZbORCRqbAd"
								: "https://discord.gg/sbA3xCJ"
						}
					>
						Server
					</SidebarButton>
					<SidebarButton to="/pc">Powercord</SidebarButton>
					<SidebarButton depth="2" to="https://powercord.dev/installation">
						Download
					</SidebarButton>
					<SidebarButton depth="2" to="https://discord.gg/gs4ZMbBfCh">
						Server
					</SidebarButton>
					<SidebarButton to="/vz">Vizality</SidebarButton>
					<SidebarButton depth="2" to="https://github.com/vizality/vizality/">
						Download
					</SidebarButton>
					<SidebarButton depth="2" to="https://discord.gg/Fvmsfv2">
						Server
					</SidebarButton>
				</animated.div>
				<div
					id="sidebar-toggle-button"
					onClick={() => {
						sidebar.dispatch({
							type: "sidebar/open",
							value: !sidebar.getState().open,
						});
					}}
				>
					<Menu id="sidebar-toggle-button-icon" />
				</div>
			</div>
		</>
	);
}
