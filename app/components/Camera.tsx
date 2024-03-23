import React from "react";
import CameraProps from "@typings/CameraProps";
import { Marker, Popup } from "react-leaflet";

// async function reloadImg(url: string): Promise<void> {
// 	await fetch(url, { cache: "reload", mode: "no-cors" });
// 	document.body
// 		.querySelectorAll(`img[src='${url}']`)
// 		.forEach((img) => (img.src = url));
// }

const Camera: React.FC<CameraProps> = (props: CameraProps) => {
	return (
		<Marker position={props.position}>
			<Popup minWidth={750}>
				<img
					src={`https://ns-webcams.its.sfu.ca/public/images/${props.name}.jpg`}
					alt={`${props.description}`}
				/>
			</Popup>
		</Marker>
	);
};

export default Camera;
