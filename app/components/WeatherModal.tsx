"use client";

import React, { useEffect } from "react";
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
				timezone: "America/Los_Angeles",
				forecast_days: 3,
			};
			const url = "https://api.open-meteo.com/v1/forecast";
			const responses = await fetchWeatherApi(url, params);

			// Helper function to form time ranges
			const range = (start: number, stop: number, step: number) =>
				Array.from(
					{ length: (stop - start) / step },
					(_, i) => start + i * step
				);

			// Process first location. Add a for-loop for multiple locations or weather models
			const response = responses[0];

			// Attributes for timezone and location
			const utcOffsetSeconds = response.utcOffsetSeconds();

			const hourly = response.hourly()!;

			// Note: The order of weather variables in the URL query and the indices below need to match!
			const weatherData = {
				hourly: {
					time: range(
						Number(hourly.time()),
						Number(hourly.timeEnd()),
						hourly.interval()
					).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
					temperature2m: Array.from(hourly.variables(0)!.valuesArray()!),
				},
			};

			return weatherData;
		},
	});

	return (
		<>
			<Button
				color="primary"
				className="absolute top-3 right-3 z-10"
				onPress={onOpen}
			>
				SFU&apos;s Weather Today
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				className="max-h-[90vh]"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								SFU's Weather Over The Next 24 Hours
							</ModalHeader>
							<ModalBody className="overflow-auto">
								<div>
									{Array.from({ length: 24 }, (_, index) => index).map(
										(index) => (
											<p key={index}>
												{data?.hourly.time[index].toISOString()}:00:{" "}
												{data?.hourly.temperature2m[index].toFixed(1)} &deg;C
											</p>
										)
									)}
								</div>
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
