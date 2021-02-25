import "./Quote.css";

export default function Quote(props) {
	return (
		<div className="quote">
			<div className="quote-bar" />
			<div className="quote-content">{props.children}</div>
		</div>
	);
}
