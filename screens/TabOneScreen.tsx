import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Map } from '../components/Map'
import { markers } from '../constants/Markers'

export default function TabOneScreen() {
  return (
    <Map markers={markers}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
