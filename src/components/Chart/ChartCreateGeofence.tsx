/* eslint-disable @typescript-eslint/no-unused-vars */
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Text} from 'react-native-paper';

const ChartCreateGeofence = () => {
  const perfMonitor = useSelector((state: any) => state.perfMonitor);
  const [meanResTime, setMeanResTime] = useState(0);
  const [chartData, setChartData] = useState<any>({
    labels: ['1'],
    datasets: [
      {
        data: [0.0],
      },
    ],
  });

  const updateChartData = (newData: any) => {
    setChartData({
      labels: Array.from({length: newData.length}, (_, index) =>
        index.toString(),
      ),
      datasets: [
        {
          data: newData.map((value: any) => parseFloat(value)),
        },
      ],
    });
  };

  useEffect(() => {
    if (perfMonitor?.rTimeCreateGeofence?.length > 0) {
      updateChartData(perfMonitor?.rTimeCreateGeofence);
      const total = perfMonitor?.rTimeCreateGeofence.reduce(
        (acc: any, value: any) => acc + parseFloat(value),
        0,
      );
      setMeanResTime(total / perfMonitor?.rTimeCreateGeofence.length);
    }
  }, [perfMonitor?.rTimeCreateGeofence]);
  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{flex: 1, paddingHorizontal: 16, paddingBottom: 16}}>
          <LineChart
            data={chartData}
            width={
              Dimensions.get('window').width + chartData?.labels?.length * 5
            } // from react-native
            height={220}
            yAxisSuffix=" ms"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#2b7a91',
              backgroundGradientFrom: '#2b7a91',
              backgroundGradientTo: '#2b7a91',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 10,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
      <Text variant="titleSmall">
        Average Response Time Create Geofence: {meanResTime?.toFixed(3)} ms
      </Text>
    </>
  );
};

export default ChartCreateGeofence;
