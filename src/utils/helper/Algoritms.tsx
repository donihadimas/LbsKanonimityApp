// ? Haversine Formula

export const calculateDistance = ({lat1, lon1, lat2, lon2}: any) => {
  const earthRadiusKm = 6371; // ? radius in kilometer
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadiusKm * c; // ? distance in kilometer

  return distance;
};

// ? convert degree to radian
export const degreesToRadians = (degrees: any) => {
  return degrees * (Math.PI / 180);
};

// ? function to know location in range
export const isWithinRange = ({locationA, locationB, range}: any) => {
  const distance = calculateDistance({
    lat1: locationA[1],
    lon1: locationA[0],
    lat2: locationB[1],
    lon2: locationB[0],
  });
  return distance <= range;
};
