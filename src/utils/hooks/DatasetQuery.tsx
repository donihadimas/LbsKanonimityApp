/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import {useQuery} from 'react-query';

const username = 'donihadimas';
const SKACCESSTOKEN =
  'sk.eyJ1IjoiZG9uaWhhZGltYXMiLCJhIjoiY2xvNzFiMnRoMDFnYzJsanVudHljNTEydiJ9.4fDg-AKHZDiXxrL4mKe3Sw';
const getAllDataset = async () => {
  return axios
    .get(`https://api.mapbox.com/datasets/v1/${username}`, {
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
    enabled: !!username && !!SKACCESSTOKEN,
  });
  return {data, refetch};
};

const getAllFeatureByDatasetId = async (datasetId: string) => {
  return axios
    .get(
      `https://api.mapbox.com/datasets/v1/${username}/${datasetId}/features`,
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
      enabled: !!username && !!SKACCESSTOKEN,
    },
  );
  return {data, refetch};
};
