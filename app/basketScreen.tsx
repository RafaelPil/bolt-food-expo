import { View, Text, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from 'context/appContext';
import { useNavigation } from '@react-navigation/native';

const BasketScreen = () => {
  const { restaurantById, count, setCount, totalPrice, setTotalPrice } = useAppContext();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (restaurantById && restaurantById.name) {
      navigation.setOptions({
        headerTitle: restaurantById.name,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={handleTrashPress}>
            <Ionicons name="trash-outline" size={24} color="black" />
          </TouchableOpacity>
        ),
      });
    }
  }, [restaurantById]);

  const handleTrashPress = () => {
    setCount(0);
    setTotalPrice(0);
    navigation.goBack();
  };

  return (
    <View className="flex flex-1 bg-[#ecedef]">
      <View className="flex rounded-b-2xl bg-white">
        <Text>BasketScreen</Text>
      </View>
    </View>
  );
};

export default BasketScreen;
