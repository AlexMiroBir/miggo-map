import React from 'react';
import styles from './Card.module.css';

const Card = ({locations}) => {
    const location = locations.at(-1) ?? {};
    return (
        <div className={styles.Container}>
            <div>Latitude: <b>{location.latitude}</b></div>
            <div>Longitude: <b>{location.longitude}</b></div>
            <div>Height:<b> {location.height} km</b></div>
            <div>Velocity: <b>{location.velocity} km/h</b></div>
            <div>Period: <b>{location.period} min</b></div>
            <div>Updated: <b>{new Date(location.timestamp)?.toLocaleString('he-IL')}</b></div>
        </div>
    );
};

export default Card;
