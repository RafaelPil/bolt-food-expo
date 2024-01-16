import { View, Text, Image } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { dummyRestaurantsData } from 'assets/data/restaurantsData';

const ModalFood = () => {
  const { id, itemId } = useLocalSearchParams();
  const restaurantById = dummyRestaurantsData?.find((r) => r?.id === id);
  const meals = restaurantById?.food.flatMap((c) => c.meals);
  const foundMeals = meals?.find((m) => m.id === +itemId);
  console.log(foundMeals);

  return (
    <View className={styles.container}>
      <Image source={{ uri: foundMeals?.img }} resizeMode="contain" className="w-full h-72" />
      <Text>{foundMeals?.name}</Text>
    </View>
  );
};

const styles = {
  container: 'flex flex-1 bg-white',
};

export default ModalFood;
