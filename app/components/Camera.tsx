import React from "react";
import CameraProps from "@typings/CameraProps";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

var cameraIcon = L.icon({
	iconUrl: "camera-icon.png",

	iconSize: [40, 40],
	iconAnchor: [20, 20],
	popupAnchor: [0, -15],
});

const Camera: React.FC<CameraProps> = (props: CameraProps) => {
	let url = `https://ns-webcams.its.sfu.ca/public/images/${props.name}.jpg`;

	setInterval(() => {
		fetch(url, { cache: "reload", mode: "no-cors" }).then(() =>
			document.body
				.querySelectorAll(`img[src='${url}']`)
				.forEach((img) => ((img as HTMLImageElement).src = url))
		);
	}, 600000);

	return (
		<Marker position={props.position} icon={cameraIcon}>
			<Popup minWidth={750}>
				<img
					src={url}
					alt={`${props.description}`}
					style={{ borderRadius: "5px" }}
				/>
			</Popup>
		</Marker>
	);
};

export default Camera;
