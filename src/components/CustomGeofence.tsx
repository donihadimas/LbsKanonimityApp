import {FillLayer, ShapeSource} from '@rnmapbox/maps';
import React from 'react';
import {createCircularGeofence} from '../utils/helper/Geofencing';

const CustomGeofence = ({feature, visibility = false}: any) => {
  const setStyleByFrequency = (frequency: any) => {
    if (frequency >= 10) {
      return {
        fillColor: '#FF7575',
        fillOpacity: 0.5,
      };
    } else if (frequency >= 5) {
      return {
        fillColor: '#FFD700',
        fillOpacity: 0.5,
      };
    } else if (frequency >= 1) {
      return {
        fillColor: '#ADD8E6',
        fillOpacity: 0.5,
      };
    } else {
      return {
        fillColor: '#90EE90',
        fillOpacity: 0.5,
      };
    }
  };
  return (
    <ShapeSource
      id={`circularGeofenceSource-${feature?.id}`}
      shape={{
        id: `geofencing-${feature?.id}`,
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            createCircularGeofence({
              centerPoint: feature?.geometry?.coordinates,
              geofenceRadius: 0.0015,
              numberOfPoints: 20,
            }),
          ],
        },
        properties: {
          frequency_accident: feature?.properties?.frequency_accident,
          accident_cause: feature?.properties?.accident_cause,
        },
      }}>
      {visibility && (
        <FillLayer
          id={`circularGeofenceFill-${feature?.id}`}
          style={setStyleByFrequency(feature?.properties?.frequency_accident)}
        />
      )}
    </ShapeSource>
  );
};

export default CustomGeofence;
