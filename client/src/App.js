import React from 'react';
import Map from './Components/Map/Map';
import styles from './App.module.css';
import "leaflet/dist/leaflet.css";
import {useEffect} from 'react';
import InfoCard from './Components/Card/InfoCard';


function App() {

    const [locations, setLocations] = React.useState([]);
    const [coordinates, setCoordinates] = React.useState([]);

    const updateLocations = async () => {
        try {
            const response = await fetch(`http://localhost:3008/location`)
            const locations = await response.json();
            setLocations(locations);
            const locationCoordinates = locations.map(location => [location.latitude, location.longitude]);
            setCoordinates(locationCoordinates);
        } catch (error) {
            alert('Something went wrong! The location may not be updated');
        }
    }

    useEffect(() => {
        updateLocations();

        const intervalId = setInterval(() => {
            updateLocations();
        }, 20000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={styles.Container}>
            <Map locations={locations} coordinates={coordinates}/>
            <div className={styles.InfoCardContainer}>
                <InfoCard locations={locations}/>
                <button onClick={updateLocations}>Refresh</button>
            </div>
        </div>
    );
}

export default App;
