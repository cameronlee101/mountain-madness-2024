import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MapProps from '@typings/MapProps';
import mapData from '@assets/mapData.json'

const Map: React.FC<MapProps> = (props: MapProps) => {
    // Default to mobile.
    let zoom = mapData.zoom.initial.smallScreen;
    let minZoom = mapData.zoom.min.smallScreen;
    if (window.innerWidth >= 3100) {
        // Large monitor.
        zoom = mapData.zoom.initial.largeScreen;
        minZoom = mapData.zoom.min.largeScreen;
    } else if (window.innerWidth >= 800) {
        // Laptop.
        zoom = mapData.zoom.initial.baseScreen;
        minZoom = mapData.zoom.min.baseScreen;
    }

	return (
		<MapContainer
			className={props.className}
			center={[mapData.center.lat, mapData.center.lng]}
			zoom={zoom}
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
			minZoom={minZoom}
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
