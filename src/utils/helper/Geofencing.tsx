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
