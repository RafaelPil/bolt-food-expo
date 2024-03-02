import { View, Text } from 'react-native';
import React, { useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { useAppContext } from 'context/appContext';
import BottomSheetComponent from 'components/bottomSheetComponent';

const OrderTracking = () => {
  const snapPoints = useMemo(() => ['20%', '100%'], []);
  const { coordinates } = useAppContext();

  // Destructuring latitude and longitude from the coordinates object
  const { latitude, longitude } = coordinates || {}; // If coordinates is null or undefined, provide an empty object

  return (
    <View className="flex flex-1">
      {/* header */}

      {/* Map View */}
      <MapView
        className="w-full h-full rounded-lg"
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}>
        {/* Person */}
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}>
          <View className="w-8 h-8 rounded-full bg-black flex justify-center items-center">
            <Ionicons name="person" size={18} color="white" />
          </View>
        </Marker>
        {/* Store */}
        <Marker
          coordinate={{
            latitude: 54.7244728,
            longitude: 25.2754447,
          }}>
          <View className="w-8 h-8 rounded-full bg-black flex justify-center items-center">
            <FontAwesome5 name="store" size={14} color="white" />
          </View>
        </Marker>
        {/* Driver */}
        <Marker
          coordinate={{
            latitude: 54.7255593,
            longitude: 25.2775182,
          }}>
          <View className="w-8 h-8 rounded-full bg-purple-500 flex justify-center items-center">
            <AntDesign name="car" size={18} color="white" />
          </View>
        </Marker>
      </MapView>

      {/* Bottom Sheet */}
      <BottomSheetComponent />
    </View>
  );
};

export default OrderTracking;
