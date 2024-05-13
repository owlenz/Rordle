import { ReactNode } from "react";

interface props {
	type: any, className?: string, children: ReactNode, style?: any
}

const Button = ({
	children,
	style = {},
	type,
	className = "",
}: props) => {
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
