/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
const ChartNotifyInsideGeofencing = () => {
  const perfMonitor = useSelector((state: any) => state.perfMonitor);
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
    if (perfMonitor?.rTimeNotifyInsideGeofencing?.length > 0) {
      updateChartData(perfMonitor?.rTimeNotifyInsideGeofencing);
    }
  }, [perfMonitor?.rTimeNotifyInsideGeofencing]);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{flex: 1, paddingHorizontal: 16, paddingBottom: 16}}>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width + chartData?.labels?.length * 5} // from react-native
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
  );
};

export default ChartNotifyInsideGeofencing;
