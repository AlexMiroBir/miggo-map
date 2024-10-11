import React from 'react';
import Map from './Components/Map/Map';
import styles from './App.module.css';
import "leaflet/dist/leaflet.css";
import {useEffect} from 'react';
import axios from 'axios';
import Card from './Components/Card/Card';


function App() {

    const [locations, setLocations] = React.useState([]);
    const [coordinates, setCoordinates] = React.useState([]);

    const updateLocations = async () => {
        try {
            const response = await axios.get(`http://localhost:3008/location`)
            setLocations(response.data);
            const locationCoordinates = response.data.map(location => [location.latitude, location.longitude]);
            setCoordinates(locationCoordinates);
        } catch (error) {
            alert('Something went wrong! Please try again later');
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
            <div>
                <Card locations={locations}/>
                <button onClick={updateLocations}>Refresh</button>
            </div>
        </div>
    );
}

export default App;
