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
	const weatherCodes: { [code: string]: string } = {
		"-1": "Error",
		"0": "Clear sky",
		"1": "Mainly clear",
		"2": "Partly cloudy",
		"3": "Overcast",
		"45": "Fog",
		"48": "Depositing rime fog",
		"51": "Drizzle: Light intensity",
		"53": "Drizzle: Moderate intensity",
		"55": "Drizzle: Dense intensity",
		"56": "Freezing Drizzle: Light intensity",
		"57": "Freezing Drizzle: Dense intensity",
		"61": "Rain: Slight intensity",
		"63": "Rain: Moderate intensity",
		"65": "Rain: Heavy intensity",
		"66": "Freezing Rain: Light intensity",
		"67": "Freezing Rain: Heavy intensity",
		"71": "Snowfall: Slight intensity",
		"73": "Snowfall: Moderate intensity",
		"75": "Snowfall: Heavy intensity",
		"77": "Snow grains",
		"80": "Rain showers: Slight intensity",
		"81": "Rain showers: Moderate intensity",
		"82": "Rain showers: Violent",
		"85": "Snow showers: Slight intensity",
		"86": "Snow showers: Heavy intensity",
		"95": "Thunderstorm: Slight or moderate",
		"96": "Thunderstorm: Slight hail",
		"99": "Thunderstorm: Heavy hail",
	};
	const curHour = new Date().getHours();

	function getWeatherDescription(code: string | undefined): string {
		if (code) {
			return weatherCodes[code];
		} else {
			return "Error";
		}
	}

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const { isLoading, error, data } = useQuery({
		queryKey: ["Weather"],
		queryFn: async () => {
			const params = {
				latitude: 49.27,
				longitude: -122.91,
				hourly: ["temperature_2m", "weather_code"],
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
					).map((t) => new Date(t * 1000)),
					temperature2m: Array.from(hourly.variables(0)!.valuesArray()!),
					weatherCode: Array.from(hourly.variables(1)!.valuesArray()!),
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
												{data?.hourly.time[index + curHour].getHours()}:00:{" "}
												{data?.hourly.temperature2m[index + curHour].toFixed(1)}{" "}
												&deg;C{" "}
												{getWeatherDescription(
													data?.hourly.weatherCode[index + curHour].toString()
												)}
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
