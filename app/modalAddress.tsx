import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Link, useNavigation } from 'expo-router';

const ModalAddress = () => {
  const navigation = useNavigation();
  const [headerVisible, setHeaderVisible] = useState(false);
  const [containerMargin] = useState(new Animated.Value(40));

  const toggleHeaderVisibility = () => {
    setHeaderVisible(!headerVisible);
    if (!headerVisible) {
      // Move container up when header is shown
      Animated.timing(containerMargin, {
        toValue: -100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      // Move container down when header is hidden
      Animated.timing(containerMargin, {
        toValue: 40,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {
    if (!headerVisible) {
      // Reset container margin when header is hidden
      Animated.timing(containerMargin, {
        toValue: 40,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [headerVisible]);

  useLayoutEffect(() => {
    handleAddressPress();
  }, [navigation, headerVisible]);

  const handleAddressPress = () => {
    navigation.setOptions({
      headerShown: headerVisible,
      animationEnabled: true,
      headerTitle: () => (
        <GooglePlacesAutocomplete
          placeholder="Enter a new address"
          fetchDetails
          query={{
            key: 'AIzaSyA6pKMvzww3IayKI1ngzZOFnZ-Sk6TrQhM',
            language: 'en',
            type: 'address',
          }}
          styles={{
            textInput: {
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
          renderLeftButton={() => (
            <AntDesign
              name="search1"
              size={20}
              color="black"
              style={{ alignSelf: 'center', marginLeft: 15, marginRight: 10 }}
            />
          )}
          renderRightButton={() => (
            <TouchableOpacity onPress={toggleHeaderVisibility} style={{ alignSelf: 'center' }}>
              <Text style={{ marginRight: 50, color: '#5A5A5A' }}>Cancel</Text>
            </TouchableOpacity>
          )}
          enablePoweredByContainer={false}
          renderRow={(item) => (
            <Link href={{ pathname: '(tabs)/home', params: { address: item.description } }} asChild>
              <TouchableOpacity className="flex flex-row items-center">
                <Feather name="map-pin" size={18} color="black" />
                <Text className="ml-3">{item.description}</Text>
              </TouchableOpacity>
            </Link>
          )}
        />
      ),
      headerLeft: null,
    });
  };

  return (
    <Animated.View style={[styles.container, { marginTop: containerMargin }]}>
      <Link href="/(tabs)/home" asChild>
        <TouchableOpacity style={styles.closeButton}>
          <View style={styles.closeButtonContent}>
            <Ionicons name="close-outline" size={30} color={'#161616'} />
            <Text style={styles.title}>Delivery address</Text>
          </View>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity style={styles.inputContainer} onPress={toggleHeaderVisibility}>
        <AntDesign
          name="search1"
          size={22}
          color="black"
          style={{ alignSelf: 'center', marginLeft: 15 }}
        />
        <View style={styles.input}>
          <Text style={styles.inputText}>Enter a new address</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  closeButton: {
    marginTop: 12,
  },
  closeButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',

    paddingHorizontal: 6,
    paddingVertical: 14,
  },
  input: {
    flex: 1,
    paddingLeft: 8,
  },
  inputText: {
    color: 'gray',
  },
});

export default ModalAddress;
