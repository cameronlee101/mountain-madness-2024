import L from 'leaflet';

interface CameraProps {
	name: string;
	description: string;
	position: L.LatLngExpression;
}

export default CameraProps;
