import React, { useState, useEffect } from "react";
import CameraProps from "@typings/CameraProps";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Button } from "@nextui-org/react";
import settings from "@assets/setting.json";

function updateImage(
	name: string,
	images: string[],
	setImages: React.Dispatch<React.SetStateAction<string[]>>,
	imageIndex: number,
	setImageIndex: React.Dispatch<React.SetStateAction<number>>
) {
	fetch(
		"/image?" +
			new URLSearchParams({
				name: name,
			})
	).then((data) => {
		data.json().then((info) => {
			let addedNewOne = false;
			let addedAtMax = false;
			setImages((previous) => {
				const newData = info.message;
				if (!previous.includes(newData)) {
					if (previous.length >= settings.maxImages) {
						const curPrevious = previous;
						const numKeep = settings.maxImages - 1; // Need to ensure a free spot for the new image.
						const newPrevious = curPrevious.slice(curPrevious.length - numKeep);
						console.log("added at max");
						addedAtMax = true;
						return [...newPrevious, newData];
					} else {
						console.log("added, array size increased");
						addedNewOne = true;
						return [...previous, newData];
					}
				} else {
					console.log("no change needed");
					return [...previous];
				}
			});

			// console.log('index =',imageIndex, ' - num images =', images.length);
			// if (addedNewOne && imageIndex === images.length - 1) {
			// 	setImageIndex(images.length);
			// } else if (addedAtMax && imageIndex > 0 && imageIndex !== images.length - 1) {
			// 	setImageIndex((previous) => previous - 1);
			// }
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

	useEffect(() => {
		updateImage(props.name, images, setImages, imageIndex, setImageIndex);
		setInterval(() => {
			updateImage(props.name, images, setImages, imageIndex, setImageIndex);
		}, 10000);
	}, []);

	useEffect(() => {
		console.log('index =',imageIndex, ' - num images =', images.length);
		if (imageIndex == images.length - 2) {
			setImageIndex(images.length - 1);
		} else {
			if (images.length === settings.maxImages && imageIndex > 0) {
				setImageIndex(previous => previous - 1);
			}
		}
	}, [images]);

	return (
		<Marker position={props.position} icon={cameraIcon}>
			<Popup minWidth={750}>
				<div className="flex flex-col gap-3">
					<img
						src={
							imageIndex >= 0
								? `${images[imageIndex]}`
								: `https://ns-webcams.its.sfu.ca/public/images/${props.name}.jpg`
						}
					/>
					<div className="flex justify-center items-center gap-10">
						<Button
							color={imageIndex <= 0 ? "default" : "primary"}
							disabled={imageIndex <= 0}
							onClick={() => {
								setImageIndex((previous) => previous - 1);
							}}
						>
							Previous
						</Button>
						<p className="text-xl">
							{imageIndex + 1}/{images.length}
						</p>
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
