"use client";
import React from "react";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@components/Map"), {
	loading: () => null,
	ssr: false,
});

const Main: React.FC = () => {
	return (
		<div className="flex flex-col align-middle text-center w-screen h-screen">
			<div className="flex flex-1 justify-center items-center w-full">
				<Map className="w-full h-full"></Map>
			</div>
		</div>
	);
};

export default Main;
