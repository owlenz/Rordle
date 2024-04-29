import HealthBar from "@/components/healthBar";
import Button from "../components/button";

const Home = () => {
	return (
		<main className="flex flex-col items-center p-16 font-bombard">
			<HealthBar></HealthBar>
			<h2 className=" text-white">sdsaads</h2>
			<div className="flex gap-10">
				<Button type={"button"}>Back</Button>
				<Button
					className="bg-[#BF1DF4] border-purple-400 hover:bg-[#C500FF] hover:bg-opacity-100"
					type={"button"}
				>
					Back
				</Button>
			</div>
		</main>
	);
};

export default Home;
