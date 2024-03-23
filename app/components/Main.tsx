"use client";
import React from "react";
import Map from "@components/Map";
import Camera from "@components/Camera";

const Main: React.FC = () => {
	return (
		<div className="flex flex-col align-middle text-center w-screen h-screen">
			<div className="flex flex-1 justify-center items-center w-full">
				<Map className="w-full h-full z-0">
					<Camera
						name="gaglardi-current"
						description="Gaglardi intersection."
						position={[49.274625147218664, -122.92517058936349]}
					/>
				</Map>
			</div>
		</div>
	);
};

export default Main;
