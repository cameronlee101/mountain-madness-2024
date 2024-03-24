"use client";

import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";
import { fetchWeatherApi } from "openmeteo";
import { useQuery } from "@tanstack/react-query";

export function WeatherModal() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { isLoading, error, data } = useQuery({
		queryKey: ["Weather"],
		queryFn: async () => {
			const params = {
				latitude: 49.27,
				longitude: -122.91,
				hourly: "temperature_2m",
			};
			const url = "https://api.open-meteo.com/v1/forecast";
			const responses = await fetchWeatherApi(url, params);
			const response = responses[0];

			// Attributes for timezone and location
			const utcOffsetSeconds = response.utcOffsetSeconds();
			const timezone = response.timezone();
			const timezoneAbbreviation = response.timezoneAbbreviation();
			const latitude = response.latitude();
			const longitude = response.longitude();

			const hourly = response.hourly()!;

			// Note: The order of weather variables in the URL query and the indices below need to match!
			// const weatherData = {

			//   hourly: {
			//     time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
			//       (t: number) => new Date((t + utcOffsetSeconds) * 1000)
			//     ),
			//     temperature2m: hourly.variables(0)!.valuesArray()!,
			//   },

			// };
		},
	});

	return (
		<>
			<Button
				color="primary"
				className="absolute top-3 right-3 z-10"
				onPress={onOpen}
			>
				SFU's Weather Today
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Modal Title
							</ModalHeader>
							<ModalBody>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Nullam pulvinar risus non risus hendrerit venenatis.
									Pellentesque sit amet hendrerit risus, sed porttitor quam.
								</p>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
