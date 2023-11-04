/* eslint-disable @typescript-eslint/no-unused-vars */
export const createCircularGeofence = ({
  centerPoint,
  geofenceRadius,
  numberOfPoints,
}: any) => {
  const coordinates: any[] = [];
  const cx = centerPoint[1]; //? longtitude
  const cy = centerPoint[0]; // ? latitude
  const radiansBetweenPoints = (2 * Math.PI) / numberOfPoints; // ? calculate radians between points

  for (let i = 0; i < numberOfPoints; i++) {
    const x = cx + geofenceRadius * Math.cos(i * radiansBetweenPoints);
    const y = cy + geofenceRadius * Math.sin(i * radiansBetweenPoints);
    coordinates.push([y, x]);
  }

  coordinates.push(coordinates[0]);
  return coordinates;
};

//  ? checking location user is inside geofence with Ray Casting
export const isInsideMultiGeofence = ({
  userLocation,
  multipleGeofenceCoordinates,
}: any) => {
  const x = userLocation[0]; // Longitude dari lokasi pengguna
  const y = userLocation[1]; // Latitude dari lokasi pengguna

  let isInsideAnyGeofence = false;
  let geofencesInfo: any[] = [];

  multipleGeofenceCoordinates.forEach((geofenceCoordinates: any) => {
    let inside = false;
    for (
      let i = 0, j = geofenceCoordinates.geofence.length - 1;
      i < geofenceCoordinates.geofence.length;
      j = i++
    ) {
      const xi = geofenceCoordinates?.geofence?.[i][0]; // Longitude titik i geofence
      const yi = geofenceCoordinates?.geofence?.[i][1]; // Latitude titik i geofence
      const xj = geofenceCoordinates?.geofence?.[j][0]; // Longitude titik j geofence
      const yj = geofenceCoordinates?.geofence?.[j][1]; // Latitude titik j geofence

      // const intersect =
      //   yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      const intersect =
        y > yi !== y > yj && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) {
        inside = !inside;
        geofencesInfo.push({
          id: geofenceCoordinates.id,
          properties: geofenceCoordinates.properties,
          insideGeofences: inside,
        });
      }
    }

    if (inside) {
      isInsideAnyGeofence = true;
    }
  });

  return geofencesInfo;
};

//  ? checking location user is inside geofence with Ray Casting
