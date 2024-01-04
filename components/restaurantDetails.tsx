import { View, Text } from 'react-native';
import React from 'react';

const RestaurantDetails = ({ post }) => {
  console.log(post.id);
  return (
    <View>
      <Text>Restaurant Details</Text>
    </View>
  );
};

export default RestaurantDetails;
