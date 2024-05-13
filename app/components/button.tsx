import { strict } from "assert";
import { ReactNode } from "react";

interface props {
	type: any, className: string, children: ReactNode, onClick: Function | string, style: any
}

const Button = ({
	children,
	onClick = "",
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
