"use client";
import React from "react";
import Map from "@components/Map";
import Camera from "@components/Camera";
import TitleCard from "./TitleCard";
import { WeatherModal } from "./WeatherModal";

const Main: React.FC = () => {
	return (
		<div className="flex flex-col align-middle text-center w-screen h-screen">
			<TitleCard />
			<WeatherModal />
			<div className="flex flex-1 justify-center items-center w-full">
				<Map className="w-full h-full z-0">
					{/* <Camera
						name="gaglardi-current"
						description="Gaglardi intersection."
						position={[49.27382446075663, -122.92559885491221]}
					/>
					<Camera
						name="aqn-current"
						description="AQ north, looking into the AQ courtyard."
						position={[49.27855484810059, -122.9174309249192]}
					/> */}
					<Camera
						name="aqsw-current"
						description="AQ south-west corner, looking south-west."
						position={[49.27847938137774, -122.91784932211006]}
					/>
					{/* <Camera
						name="aqse-current"
						description="AQ south-east corner, looking north-east."
						position={[49.27828620368422, -122.91573304015539]}
					/>
					<Camera
						name="towern-current"
						description="Tower road north view."
						position={[49.276574492849676, -122.90955202781595]}
					/>
					<Camera
						name="towers-current"
						description="Tower road south view."
						position={[49.27640048219852, -122.90962956339361]}
					/>
					<Camera
						name="udn-current"
						description="University drive north."
						position={[49.279826691898535, -122.9194149082602]}
					/>
					<Camera
						name="wmcroof-current"
						description="Blusson hall roof south."
						position={[49.27911263418895, -122.91363968049325]}
					/> */}
				</Map>
			</div>
		</div>
	);
};

export default Main;
