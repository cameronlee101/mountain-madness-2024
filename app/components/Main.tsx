"use client";
import React from "react";
import Map from "@components/Map";
import Camera from "@components/Camera";
import TitleCard from "./TitleCard";

const Main: React.FC = () => {
	return (
		<div className="flex flex-col align-middle text-center w-screen h-screen">
			<TitleCard />
			<div className="flex flex-1 justify-center items-center w-full">
				<Map className="w-full h-full z-0">
					<Camera
						name="gaglardi-current"
						description="Gaglardi intersection."
						position={[49.27382446075663, -122.92559885491221]}
					/>
                    <Camera
						name="aqn-current"
						description="AQ."
						position={[49.27855484810059, -122.9174309249192]}
					/>
                    <Camera
						name="aqsw-current"
						description="AQ south-west view from the south-west corner."
						position={[49.27855484810059, -122.9174309249192]}
					/>
				</Map>
			</div>
		</div>
	);
};

export default Main;
