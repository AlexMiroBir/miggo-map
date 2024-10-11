import React, {useEffect} from 'react';
import {MapContainer, Marker, Popup, TileLayer, Polyline, useMap} from 'react-leaflet'
import styles from './Map.module.css'
import L from "leaflet";


const ZOOM = 1

const Map = ({locations, coordinates = [43.274, -115.983]}) => {

    const stopIcon = new L.Icon({
        iconUrl: 'https://www.pngall.com/wp-content/uploads/2016/07/Arrow-Free-Download-PNG.png',
        iconSize: [10, 10],
        iconAnchor: [0, 5],
        popupAnchor: [0, 0],
    });

    const spaceShipIcon = new L.Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/1945/1945842.png',
        iconSize: [50, 50],
        iconAnchor: [20, 20],
        popupAnchor: [0, 0],
    });


    return (
        <div className={styles.MapContainer}>
            <MapContainer center={coordinates.at(-1)} zoom={ZOOM} scrollWheelZoom={true}
                          className={styles.MapContainer}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {coordinates.map((position, index) =>
                    <Marker key={index} position={position} icon={index===coordinates.length-1 ? spaceShipIcon : stopIcon}/>
                )}
                <Polyline positions={coordinates} color="red"/>
                <MapUpdater coordinates={coordinates}/>
            </MapContainer>
        </div>
    );
};

const MapUpdater = ({coordinates}) => {
    const map = useMap();

    useEffect(() => {
        if (coordinates.length > 0) {
            map.setView(coordinates.at(-1), ZOOM);
        }
    }, [coordinates, map]);

    return null;
};

export default Map;
