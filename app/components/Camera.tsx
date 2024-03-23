import React from "react";
import Image from "next/image";
import CameraProps from "@typings/CameraProps";

const Camera: React.FC<CameraProps> = (props: CameraProps) => {
	return (
		<Image
			src={`https://ns-webcams.its.sfu.ca/public/images/${props.name}`}
			alt={`${props.description}`}
			width={500}
			height={500}
		/>
	);
};

export default Camera;
