import React, { useEffect, useState } from 'react'
import MapView from 'react-native-map-clustering'
import { Marker } from 'react-native-maps'
import { Dimensions, StyleSheet, View } from 'react-native'
import * as Location from 'expo-location'

import { MapMarker } from '../models'

type Props = {
    markers: MapMarker[]
}

export const Map: React.FC<Props> = ({ markers }) => {
    const [location, setLocation] = useState<any>(null)
    const [errorMsg, setErrorMsg] = useState<string>()
    const [initialRegion, setInitialRegion] = useState<any>()

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
            }

            let location = await Location.getCurrentPositionAsync({})
            setLocation(location)
        })()
    })

    useEffect(() => {
        if (!location) {
            return
        }

        setInitialRegion({
            latitude: location.coords?.latitude,
            longitude: location.coords?.longitude
        })
    }, [location])

    return (
        <View style={styles.container}>
            {initialRegion && <MapView
                initialRegion={{
                    ...initialRegion,
                    latitudeDelta: 8.5,
                    longitudeDelta: 8.5
                }} style={styles.mapStyle}>
                {markers.map(({ latlng, title, description }) =>
                    <Marker
                        coordinate={latlng}
                        title={title}
                        description={description}
                    />)
                }
            </MapView>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
})
