import { createStore } from "redux";

export default createStore(
	(
		state = localStorage.getItem("bdInfo")
			? JSON.parse(localStorage.getItem("bdInfo"))
			: { downloads: { count: 0, lastFetch: 0 } },
		action
	) => {
		switch (action.type) {
			case "downloads/set":
				state.downloads = {
					count: action.value,
					lastFetch: Date.now(),
				};
		}
		localStorage.setItem("bdInfo", JSON.stringify(state));
		return state;
	}
);
