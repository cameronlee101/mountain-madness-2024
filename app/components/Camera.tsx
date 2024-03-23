import React from "react";
import CameraProps from "@typings/CameraProps";
import { Marker, Popup } from "react-leaflet";

const Camera: React.FC<CameraProps> = (props: CameraProps) => {
	return (
		<Marker position={props.position}>
			<Popup>
				<img
					src={`https://ns-webcams.its.sfu.ca/public/images/${props.name}.jpg`}
					alt={`${props.description}`}
					style={{
						width: 500,
						height: 500,
					}}
				/>
			</Popup>
		</Marker>
	);
};

export default Camera;
