import React from "react";
import Map from "@/app/components/Map";

const Main: React.FC = () => {
	return (
		<div className="flex flex-col align-middle text-center w-screen min-h-screen p-8">
			<h1 className="text-2xl">Viewing SFU From A New Perspective</h1>
			<p className="mt-4">Click on a pin to see a camera view of SFU</p>
			<div className="flex flex-1 justify-center items-center w-full">
				<Map></Map>
			</div>
		</div>
	);
};

export default Main;
