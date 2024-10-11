import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, TileLayer, Polyline, useMap, useMapEvents} from 'react-leaflet'
import styles from './Map.module.css'
import L from "leaflet";

const ZOOM = 0

const ZoomListener = ({setZoom}) => {
    const map = useMapEvents({
        zoomend: () => {
            setZoom(map.getZoom());
        }
    });
    return null;
};

const MapUpdater = ({coordinates, zoom}) => {
    const map = useMap();

    useEffect(() => {
        if (coordinates.length > 0) {
            map.setView(coordinates.at(-1), zoom);
        }
    }, [coordinates, map]);

    return null;
};


const Map = ({coordinates}) => {

    const [zoom, setZoom] = useState(() => {
        const savedZoom = localStorage.getItem('mapZoom');
        return savedZoom ? JSON.parse(savedZoom) : ZOOM;
    });

    useEffect(() => {
        localStorage.setItem('mapZoom', JSON.stringify(zoom));
    }, [zoom]);

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
                    <Marker key={index} position={position}
                            icon={index === coordinates.length - 1 ? spaceShipIcon : stopIcon}/>
                )}
                <Polyline positions={coordinates} color="red"/>
                <MapUpdater coordinates={coordinates} zoom={zoom}/>
                <ZoomListener setZoom={setZoom}/>
            </MapContainer>
        </div>
    );
};


export default Map;
