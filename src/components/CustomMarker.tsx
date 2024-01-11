/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text} from 'react-native';
import React from 'react';
import {Callout, PointAnnotation} from '@rnmapbox/maps';
import {StyleSheet} from 'react-native';

const CustomMarker = ({feature}: any) => {
  const setMarkerColor = (frequency: any) => {
    const circleSize = 30; // Ukuran lingkaran
    if (frequency >= 10) {
      return {
        backgroundColor: '#FF7575',
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      };
    } else if (frequency >= 5) {
      return {
        backgroundColor: '#FFD700',
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      };
    } else if (frequency >= 1) {
      return {
        backgroundColor: '#ADD8E6',
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      };
    } else {
      return {
        backgroundColor: '#90EE90',
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      };
    }
  };
  const frequencyAccident = feature?.properties?.frequency_accident || 0;
  return (
    <PointAnnotation
      id={feature?.id}
      key={feature?.id}
      coordinate={feature?.geometry?.coordinates}
      title="Marker">
      <View style={frequencyAccident && setMarkerColor(frequencyAccident)}>
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          {feature?.properties?.frequency_accident}
        </Text>
      </View>
      <Callout title="Properties" style={styles.calloutContainer}>
        <View>
          <Text style={{color: '#000'}}>
            Penyebab Kecelakaan : {feature?.properties?.accident_cause}
          </Text>
          <Text style={{color: '#000'}}>
            Frekuensi Kecelakaan : {feature?.properties?.frequency_accident}
          </Text>
        </View>
      </Callout>
    </PointAnnotation>
  );
};

export default CustomMarker;
const styles = StyleSheet.create({
  calloutContainer: {
    width: 250,
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    marginBottom: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
