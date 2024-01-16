import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const ModalFood = () => {
  const { id } = useLocalSearchParams();
  console.log(id);

  return (
    <View>
      <Text>ModalFood</Text>
    </View>
  );
};

export default ModalFood;
