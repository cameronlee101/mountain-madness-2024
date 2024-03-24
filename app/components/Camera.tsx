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
			const theData = info.message;
			if (theData.length < 1000) {
				// Error getting the data.
				return;
			}
			// let addedNewOne = false;
			// let addedAtMax = false;
			setImages((previous) => {
				const newData = info.message;
				if (!previous.includes(newData)) {
					if (previous.length >= settings.maxImages) {
						const curPrevious = previous;
						const numKeep = settings.maxImages - 1; // Need to ensure a free spot for the new image.
						const newPrevious = curPrevious.slice(curPrevious.length - numKeep);
						return [...newPrevious, newData];
					} else {
						return [...previous, newData];
					}
				} else {
					return [...previous];
				}
			});
		});
	});
}

const Camera: React.FC<CameraProps> = (props: CameraProps) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const [images, setImages] = useState<string[]>([]);
	const [imagesPrevious, setImagesPrevious] = useState<string[]>([]);
	const [imageIndex, setImageIndex] = useState(-1);

	const cameraIcon = L.icon({
		iconUrl: `/cameras/${props.name}.png`,

		iconSize: [40, 40],
		iconAnchor: [20, 20],
		popupAnchor: [0, -15],
	});

	useEffect(() => {
		if (mounted) {
			updateImage(props.name, images, setImages, imageIndex, setImageIndex);
			const intervalId = setInterval(() => {
				updateImage(props.name, images, setImages, imageIndex, setImageIndex);
			}, 10000);

			// Clean up the interval when the component is unmounted
			return () => {
				clearInterval(intervalId);
			};
		}
	}, [mounted]);

	useEffect(() => {
		if (
			images.length !== settings.maxImages &&
			imageIndex === images.length - 2
		) {
			setImageIndex(images.length - 1);
		} else if (images.length === settings.maxImages) {
			if (
				imagesPrevious.length !== images.length &&
				imageIndex === images.length - 2
			) {
				// Just reached max.
				setImageIndex(images.length - 1);
			} else if (imageIndex > 0 && imageIndex !== images.length - 1) {
				// Already at max, AND can decrease index without going out of bounds.
				setImageIndex((previous) => previous - 1);
			}
		}
		setImagesPrevious(images);
	}, [images]);

	return (
		<Marker position={props.position} icon={cameraIcon}>
			<Popup minWidth={Math.min(750, window.innerWidth - 100)}>
				{imageIndex >= 0 ? (
					<div className="flex flex-col gap-3">
						<img src={images[imageIndex]} />{" "}
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
				) : (
					<div className="flex justify-center">
						<p className="text-xl">Camera Is Down</p>
					</div>
				)}
			</Popup>
		</Marker>
	);
};

export default Camera;
