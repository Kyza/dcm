import { Link as BadLink } from "react-router-dom";

export default function Link(props) {
	return (props.to?.length ?? 0) === 0 ? (
		<span {...props}>{props.children}</span>
	) : /^https?:\/\//.test(props.to) ? (
		<a href={props.to} {...props} />
	) : (
		<BadLink {...props} />
	);
}
