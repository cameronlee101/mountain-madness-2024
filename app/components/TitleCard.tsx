"use client";

import { useState } from "react";
import styles from "./titleCard.module.css";

const TitleCard: React.FC = () => {
	const [animationClass, setAnimationClass] = useState("");

	return (
		<div
			className={`absolute m-auto left-0 right-0 bottom-4 z-10 w-fit p-2 bg-slate-700 bg-opacity-75 rounded-2xl cursor-pointer ${animationClass}`}
			onClick={() => {
				setAnimationClass(styles.fadeAway);
			}}
		>
			<h1 className="text-3xl font-semibold text-white">
				Viewing SFU From a New Perspective
			</h1>
			<p className="mt-2 text-white">Click on a pin to see a camera view of SFU!</p>
			<p className="text-white">(Click this message to close it)</p>
		</div>
	);
};

export default TitleCard;
