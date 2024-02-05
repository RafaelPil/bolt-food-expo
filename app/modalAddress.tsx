import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const modalAddress = () => {
  const [enteredAddress, setEnteredAddress] = useState('');

  return (
    <View className={styles.container}>
      <View className={styles.inputContainer}>
        {/* <AntDesign name="search1" size={22} color="black" style={{ marginRight: 16 }} /> */}

        <GooglePlacesAutocomplete
          placeholder="Enter a new address"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyA6pKMvzww3IayKI1ngzZOFnZ-Sk6TrQhM',
            language: 'en',
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
            <View className="flex flex-row items-center">
              <Feather name="map-pin" size={18} color="black" />
              <Text className="ml-3">{item.description}</Text>
            </View>
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
