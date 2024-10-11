import React from 'react';
import styles from './Card.module.css';

const Card = ({locations}) => {
    const location = locations.at(-1) ?? {};
    return (
        <div className={styles.Container}>
            <div>Latitude: {location.latitude}</div>
            <div>Longitude: {location.longitude}</div>
            <div>Height: {location.height} km</div>
            <div>Velocity: {location.velocity} km/h</div>
            <div>Period: {location.period} min</div>
            <div>Updated: {location.timestamp?.toLocaleString()}</div>
        </div>
    );
};

export default Card;
