/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "static.wikia.nocookie.net",
				// port: "",
				// pathname: "/riskofrain2_gamepedia_en/images/**/**/**/**/**/**/**",
			},
		],
	},
};

export default nextConfig;
