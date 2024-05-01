import React from "react";

const XDD = async () => {
	const xdd = await fetch("example.com").then((e) => e.json());
	return <div>{xdd}</div>;
};

export default XDD;
