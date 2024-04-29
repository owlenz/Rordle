const Button = ({
	children,
	onClick = "",
	style = {},
	type,
	className = "",
}) => {
	return (
		<button
			// onClick={onClick}
			type={type || "button"}
			className={`${className} buttonX `}
			style={style}
		>
			{children}
		</button>
	);
};

export default Button;
