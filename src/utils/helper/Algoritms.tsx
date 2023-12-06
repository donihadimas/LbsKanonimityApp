/* eslint-disable @typescript-eslint/no-unused-vars */
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

// ? generalization Data
export const generalizeValue = (value: any, typeValue: string) => {
  switch (typeValue) {
    case 'email':
      const splitValue = value?.split('@');
      return `${splitValue?.[0].slice(0, -5)}XXXXX@${splitValue?.[1]}`;
    case 'text':
      return value?.slice(0, -3) + 'XXX';
    case 'anonim':
      const anonimValue = 'Anonim';
      return anonimValue;
    default:
      return value;
  }
  // return value.slice(0, -3) + 'XXX';
};
// Fungsi untuk melakukan generalisasi pada data
export const generalizeData = (data: any) => {
  const generalizedData = data.map((item: any) => ({
    ...item,
    data_users: [
      ...item.data_users.map((user: any) => ({
        ...user,
        nama: generalizeValue(user?.nama, 'text'),
        nomor_handphone: generalizeValue(user?.nomor_handphone, 'text'),
        email: generalizeValue(user?.email, 'email'),
        alamat: {
          ...user.alamat,
          desa: generalizeValue(user?.alamat?.desa, 'text'),
          detail: generalizeValue(user?.alamat?.desa, 'text'),
        },
      })),
    ],
  }));
  return generalizedData;
};
// ? generalization Data

// ? Validation K Anonymity
export const validateKAnonymity = (data: any, KValue: any) => {
  const validatedData = data.map((item: any) => {
    if (item.data_users.length < KValue) {
      return {
        ...item,
        data_users: [
          ...item.data_users.map((user: any) => ({
            ...user,
            nama: 'Anonim',
            tanggal_lahir: user.tanggal_lahir.slice(0, -3),
          })),
        ],
      };
    }
    return {
      ...item,
    };
  });
  return validatedData;
};
// ? Validation K Anonymity
