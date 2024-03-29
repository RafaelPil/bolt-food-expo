import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { dummyRestaurantsData } from 'assets/data/restaurantsData';
import RestaurantDetails from 'app/restaurantDetails';

const restaurantDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  //   console.log(id);
  const post = dummyRestaurantsData.find((r) => r.id === id);

  if (!post) {
    return <Text>Not Found</Text>;
  }

  return <RestaurantDetails post={post} />;
};

export default restaurantDetailsScreen;
