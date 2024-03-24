"use client";

import React from "react";
import { useState, useEffect } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";

interface Schedule {
	Pattern: string;
	Destination: string;
	ExpectedLeaveTime: string;
	ExpectedCountdown: number;
}

interface Route {
	RouteNo: string;
	RouteName: string;
	Schedules: Schedule[];
}

export function BusStopModal() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [transportCenterBusData, setTransportCenterResponseData] = useState<
		string[]
	>([]);
	const [transportExchangeBusData, setTransportExchangeResponseData] = useState<
		string[]
	>([]);

	const transportCentreBusStopNumber = "52806";
	const transportExchangeBusStopNumbers = ["51861", "53096", "52807"];

	const parseResponseDataToRouteArray = (responseData: any): Route[] => {
		const routes: Route[] = [];

		responseData.forEach((routeData: any) => {
			const route: Route = {
				RouteNo: routeData.RouteNo,
				RouteName: routeData.RouteName,
				Schedules: routeData.Schedules,
			};
			routes.push(route);
		});

		return routes;
	};

	const fetchBusDataForStop = async (
		busStopNumber: string
	): Promise<string[]> => {
		try {
			const headers = {
				Accept: "application/json",
			};

			console.log("Pinging Translink API...");
			const response = await fetch(
				`https://api.translink.ca/rttiapi/v1/stops/${busStopNumber}/estimates?apikey=${process.env.NEXT_PUBLIC_TRANSLINK_API_KEY}&count=3&timeframe=120`,
				{
					headers: headers,
				}
			);
			const jsonData = await response.json();

			const routes: Route[] = parseResponseDataToRouteArray(jsonData);

			const formattedData: string[] = routes.map((route: Route) => {
				const { RouteNo, RouteName, Schedules } = route;
				const leaveTimes: string[] = Schedules.map(
					(schedule: Schedule) => schedule.ExpectedLeaveTime.split(" ")[0]
				);
				return `${RouteNo} - ${RouteName} - Expected Leave Times: ${leaveTimes.join(", ")}`;
			});

			return formattedData;
		} catch (error) {
			console.error("Error fetching Translink data:", error);
			return [];
		}
	};

	const FetchBusData = async () => {
		const transportCenterBusData = await fetchBusDataForStop(
			transportCentreBusStopNumber
		);
		const transportExchangeBusData = await Promise.all(
			transportExchangeBusStopNumbers.map((busStopNumber) =>
				fetchBusDataForStop(busStopNumber)
			)
		);
		setTransportCenterResponseData(transportCenterBusData);
		setTransportExchangeResponseData(transportExchangeBusData.flat());
	};

	useEffect(() => {
		if (isOpen) {
			FetchBusData();
		}
	}, [isOpen]);

	return (
		<>
			<Button
				color="secondary"
				className="absolute top-16 right-3 z-10"
				onClick={onOpen}
			>
				Next Buses Leaving From SFU
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalBody>
								{transportCenterBusData.length > 0 && (
									<>
										<ModalHeader className="flex flex-col gap-1">
											SFU Transportation Centre Bus Departures
										</ModalHeader>
										{transportCenterBusData.map((data, index) => (
											<p key={index}>{data}</p>
										))}
									</>
								)}
								{transportExchangeBusData.length > 0 && (
									<>
										<ModalHeader className="flex flex-col gap-1">
											SFU Transportation Exchange Bus Departures
										</ModalHeader>
										{transportExchangeBusData.map((data, index) => (
											<p key={index}>{data}</p>
										))}
									</>
								)}
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
