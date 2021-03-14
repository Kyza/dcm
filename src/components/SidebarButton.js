import { useLocation } from "react-router-dom";
import Link from "./Link";
import Hashtag from "./Hashtag";
import "./SidebarButton.css";
import { memo } from "react";

export default memo(function SidebarButton(props) {
	const location = useLocation();

	const marginLeft =
		(props.depth ??
			props.to.split("/").filter((f) => f.trim().length > 0).length) *
			16 +
		8;

	return (
		<Link
			className={
				"sidebar-button" +
				(location.pathname === props.to && !props.redirect ? " selected" : "")
			}
			style={{
				marginLeft: marginLeft + "px",
				width: `calc(100% - ${marginLeft}px)`,
			}}
			to={props.to}
		>
			<>
				<Hashtag className="sidebar-button-icon" />
				<div className="sidebar-button-text">{props.children}</div>
			</>
		</Link>
	);
});
