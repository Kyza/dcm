import { createStore } from "redux";

export default createStore(
	(
		state = localStorage.getItem("sidebar")
			? JSON.parse(localStorage.getItem("sidebar"))
			: { open: window.innerWidth > 950 },
		action
	) => {
		switch (action.type) {
			case "sidebar/open":
				state = {
					open: action.value,
				};
		}
		localStorage.setItem("sidebar", JSON.stringify(state));
		return state;
	}
);
