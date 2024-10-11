/**
 * This Component is an approach to solve an anti meridian problem
 */

import { createPathComponent } from '@react-leaflet/core';
import { Polyline as LeafletWrappedPolyline } from 'leaflet.antimeridian/src/vector/Wrapped.Polyline.js';

export const WrappedPolyline = createPathComponent(function createWrappedPolyline({ positions, ...options }, ctx) {
    const instance = new LeafletWrappedPolyline(positions, options);
    return {
        instance,
        context: { ...ctx, overlayContainer: instance },
    };
}, function updateWrappedPolyline(layer, props, prevProps) {
    if (props.positions !== prevProps.positions) {
        layer.setLatLngs(props.positions);
    }
});
