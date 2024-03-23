import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MapProps from '@typings/MapProps';
import mapData from '@assets/mapData.json'

const Map: React.FC = (props: MapProps) => {
	return (
		<MapContainer
			className={props.className}
			center={[mapData.center.lat, mapData.center.lng]}
			zoom={mapData.zoom.initial}
			zoomControl={true}
			scrollWheelZoom={true}
			maxBounds={[
				[
					mapData.maxBounds.southwest.lat,
					mapData.maxBounds.southwest.lng,
				],
				[
					mapData.maxBounds.northeast.lat,
					mapData.maxBounds.northeast.lng,
				],
			]}
			minZoom={mapData.zoom.min}
		>
			{props.children}
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
				url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
			/>
		</MapContainer>
	);
};

export default Map;
