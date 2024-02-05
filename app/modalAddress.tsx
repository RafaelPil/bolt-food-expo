import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Link, useNavigation } from 'expo-router';

const modalAddress = () => {
  return (
    <View className={styles.container}>
      <View className={styles.inputContainer}>
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
              backgroundColor: '#e5e7eb',
              alignSelf: 'center',
            },
          }}
          renderLeftButton={() => (
            <AntDesign
              name="search1"
              size={22}
              color="black"
              style={{ alignSelf: 'center', marginLeft: 15, marginRight: 10 }}
            />
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
      </View>
    </View>
  );
};

const styles = {
  container: 'flex-1',
  inputContainer: 'flex flex-row items-center mt-24 rounded-xl bg-gray-200 mx-6',
};

export default modalAddress;
