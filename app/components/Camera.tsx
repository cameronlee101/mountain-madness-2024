import React, { useState, useEffect } from "react";
import CameraProps from "@typings/CameraProps";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Button } from "@nextui-org/react";
import settings from "@assets/setting.json";

function updateImage(
	url: string,
	images: string[],
	setImages: React.Dispatch<React.SetStateAction<string[]>>,
	imageIndex: number,
	setImageIndex: React.Dispatch<React.SetStateAction<number>>
) {
	// fetch(url, { cache: "reload", mode: "cors" }).then((response) => {
	// fetch(url).then((response) => {
	// 	console.log(url);
	// 	response.blob().then((blob) => {
	// 		const reader = new FileReader();
	// 		reader.onloadend = () => {
	// 			let base64data = reader.result;
	// 			console.log("Base64 data:", base64data);
	// 			if (typeof base64data !== "string") {
	// 				return;
	// 			}
	// 			base64data = base64data.replace(
	// 				"data:application/octet-stream;base64,",
	// 				""
	// 			);
	// 			if (typeof base64data !== "string") {
	// 				return;
	// 			}
	// 			const data = base64data;
	// 			console.log("DATA IS", data);
	// 			// Store the previous image in the array
	// 			// setImages((previous) => [...previous, data]);
	// 			// Increase index if at the end.
	// 			if (imageIndex === images.length - 1) {
	// 				// Set imageIndex to now be images.length (the most recent image).
	// 				// setImageIndex((previous) => previous + 1);
	// 			}
	// 		};
	// 		console.log('blob is:', blob);
	// 		reader.readAsDataURL(blob);
	// 	});
	// 	// Force the DOM images to update.
	// 	// document.body
	// 	// 	.querySelectorAll(`img[src='${url}']`)
	// 	// 	.forEach((img) => ((img as HTMLImageElement).src = url))
	// });
	fetch(
		"/image?" +
			new URLSearchParams({
				url: url,
			})
	).then((data) => {
		data.json().then((info) => {
			// console.log("info:", info);

			// Store the previous image in the array
			setImages((previous) => {
				const newData = info.message;
				if (!previous.includes(newData)) {
					// if (imageIndex === images.length - 1) {
					// 	console.log('MOVING ONE FORWARDS');
					// 	// Set imageIndex to now be images.length (the most recent image).
					// 	setImageIndex(image);
					// }
					return [...previous, newData];
				} else {
					// console.log('already ADDED well well well');
					return [...previous];
				}
			});
		});
	});
}

const Camera: React.FC<CameraProps> = (props: CameraProps) => {
	const [images, setImages] = useState<string[]>([]);
	const [imageIndex, setImageIndex] = useState(-1);

	const cameraIcon = L.icon({
		iconUrl: `/cameras/${props.name}.png`,

		iconSize: [40, 40],
		iconAnchor: [20, 20],
		popupAnchor: [0, -15],
	});

	let url = `https://ns-webcams.its.sfu.ca/public/images/${props.name}.jpg`;

	// updateImage(url, images, setImages, imageIndex, setImageIndex);
	useEffect(() => {
		updateImage(url, images, setImages, imageIndex, setImageIndex);
		setInterval(() => {
			// console.log('updating images...');
			updateImage(url, images, setImages, imageIndex, setImageIndex);
		}, 10000);
	}, []);

	useEffect(() => {
		// console.log('images at index', imageIndex, 'with images', images, 'cur is', images[imageIndex]);
		console.log("images at index", imageIndex, "with images", images);
	}, [images, imageIndex]);

	useEffect(() => {
		console.log("checking if should updating index....");
		if (imageIndex == images.length - 2) {
			console.log("YESSSIRRR");
			setImageIndex(images.length - 1);
		} else {
			console.log("NOOSIRRR CAP");
		}
	}, [images]);
	// setInterval(() => {
	// 	updateImage(url, images, setImages, imageIndex, setImageIndex);
	// }, 10000);

	return (
		<Marker position={props.position} icon={cameraIcon}>
			<Popup minWidth={750}>
				<div className="flex flex-col gap-3">
					<img
						src={imageIndex >= 0 ? `${images[imageIndex]}` : url}
						// src={
						// 	url
						// }
						// alt={`${props.description}`}
						// style={{ borderRadius: "5px" }}
					/>
					<div className="flex justify-center gap-10">
						<Button
							color={imageIndex <= 0 ? "default" : "primary"}
							disabled={imageIndex <= 0}
							onClick={() => {
								setImageIndex((previous) => previous - 1);
							}}
						>
							Previous
						</Button>
						<Button
							color={imageIndex >= images.length - 1 ? "default" : "primary"}
							disabled={imageIndex >= images.length - 1}
							onClick={() => {
								setImageIndex((previous) => previous + 1);
							}}
						>
							Next
						</Button>
					</div>
				</div>
			</Popup>
		</Marker>
	);
};

export default Camera;
