import React from "react";
import CameraProps from "@typings/CameraProps";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// async function reloadImg(url: string): Promise<void> {
// 	await fetch(url, { cache: "reload", mode: "no-cors" });
// 	document.body
// 		.querySelectorAll(`img[src='${url}']`)
// 		.forEach((img) => (img.src = url));
// }

var cameraIcon = L.icon({
	iconUrl: "camera-icon-right.png",

	iconSize: [40, 40], // size of the icon
	iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
	popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
});

const Camera: React.FC<CameraProps> = (props: CameraProps) => {
	let url = `https://ns-webcams.its.sfu.ca/public/images/${props.name}.jpg`;

	setInterval(() => {
		fetch(url, { cache: "reload", mode: "no-cors" }).then(() =>
			document.body
				.querySelectorAll(`img[src='${url}']`)
				.forEach((img) => ((img as HTMLImageElement).src = url))
		);
	}, 60000);

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
