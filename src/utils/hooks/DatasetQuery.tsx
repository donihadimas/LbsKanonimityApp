/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import {useQuery} from 'react-query';
import {SKACCESSTOKEN, USERNAME} from '../helper/Constant';
const getAllDataset = async () => {
  return axios
    .get(`https://api.mapbox.com/datasets/v1/${USERNAME}`, {
      params: {
        access_token: SKACCESSTOKEN,
      },
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const useGetAllDataset = () => {
  const {data, refetch} = useQuery(['dataAllDataset'], () => getAllDataset(), {
    enabled: !!USERNAME && !!SKACCESSTOKEN,
  });
  return {data, refetch};
};

const getAllFeatureByDatasetId = async (datasetId: string) => {
  return axios
    .get(
      `https://api.mapbox.com/datasets/v1/${USERNAME}/${datasetId}/features`,
      {
        params: {
          access_token: SKACCESSTOKEN,
        },
      },
    )
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const useGetAllFeatureByDatasetId = (datasetId: string) => {
  const {data, refetch} = useQuery(
    ['dataAllFeatureByDatasetId'],
    () => getAllFeatureByDatasetId(datasetId),
    {
      enabled: !!USERNAME && !!SKACCESSTOKEN,
    },
  );
  return {data, refetch};
};
