import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

import Quote from "../components/Quote";

import bdInfo from "../stores/bdInfo";

export default function Ban() {
	const [downloads, setDownloads] = useState(0);
	const spring = useSpring({
		downloads,
		config: { friction: 60 },
	});

	useEffect(() => {
		const bdInfoState = bdInfo.getState();
		//api.github.com/repos/rauenzi/BBDInstaller/releases

		const bdInfoUnsubscribe = bdInfo.subscribe(() =>
			setDownloads(bdInfo.getState().downloads.count)
		);

		setDownloads(bdInfo.getState().downloads.count);

		if (Date.now() > bdInfoState.downloads.lastFetch + 60e3 * 3) {
			console.log("Updating BD info.");
			Promise.all([
				fetch(
					"https://api.github.com/repos/Jiiks/BetterDiscordApp/releases"
				).then((response) => response.json()),
				fetch(
					"https://api.github.com/repos/rauenzi/BetterDiscordApp/releases"
				).then((response) => response.json()),
				fetch(
					"https://api.github.com/repos/rauenzi/BBDInstaller/releases"
				).then((response) => response.json()),
			]).then((repos) => {
				let count = 0;
				for (const repo of repos) {
					if (!Array.isArray(repo))
						return console.log("Failed to update BD info.");
					for (const release of repo) {
						for (const binary of release.assets) {
							count += binary.download_count;
						}
					}
				}
				console.log("BD info updated.");
				bdInfo.dispatch({ type: "downloads/set", value: count });
			});
		}

		return () => {
			bdInfoUnsubscribe();
		};
	}, []);

	return (
		<>
			<h1 className="huge">
				<animated.div>
					{spring.downloads.interpolate((x) => Math.round(x).toLocaleString())}
				</animated.div>
			</h1>
			<p>That's how many times BetterDiscord has been downloaded.</p>
			<h1 className="huge">0</h1>
			<p>
				That's how many accounts have been terminated for simply using a client
				mod.
			</p>
			<h1>So will I get banned for using a client mod?</h1>
			<p>
				That being said,{" "}
				<b>
					the chances of your account being terminated for using a client mod
					are next to none
				</b>
				. As long as you stick to{" "}
				<Link to="ethical-plugins">ethical plugins</Link> such as ones from the
				plugin stores of <a href="https://you-thought.com/">BetterDiscord</a>,
				Powercord, and Vizality, your account should stay safe.
			</p>
			<h1>So why does Discord say otherwise?</h1>
			<p>Here's a quote from Discord's Terms of Service.</p>
			<p>
				<Quote>
					The Company reserves the right to refuse any user access to the
					Services without notice for any reason, including but not limited to a
					violation of the Terms.
				</Quote>
			</p>
			<p>
				That means Discord reserves the right to choose any punishment they want
				for anything at all. This can include for no reason for a punishment,
				and no punishment for a reason. As for why they don't say they won't
				punish you for breaking their Terms of Service by modifying their
				client, that would be like saying they don't enforce their own rules.
			</p>
		</>
	);
}
