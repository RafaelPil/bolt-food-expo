import { View, Text, Image } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const MarketCard = ({ restaurantData }) => {
  // console.log(restaurantData.name);

  const ratingStyle = {
    color: restaurantData.rating < 4.5 ? 'black' : '#FF8C00',
  };

  return (
    <View className={styles.cardContainer}>
      <View>
        <Image
          source={{
            uri: `${restaurantData.profileImage}`,
          }} // Replace with your actual image source
          className="w-full h-[180px] rounded-md"
          resizeMode="cover"
        />
        <View className={styles.overlay}>
          <Text className={styles.overlayText}>{restaurantData.delivery} min</Text>
        </View>
      </View>

      <View className="flex flex-row items-center justify-between">
        <Text className="text-base font-bold mt-2">{restaurantData.name}</Text>
        <View className="flex flex-row items-center">
          <FontAwesome name="star" size={17} color={ratingStyle.color} />
          <Text className="ml-1 font-bold text-base">{restaurantData.rating}</Text>
        </View>
      </View>
      <Text className="text-sm font-">{restaurantData.price} €</Text>
    </View>
  );
};

const styles = {
  cardContainer: 'mt-4',
  cardImage: 'w-full h-200 rounded-lg',
  overlay: 'absolute bg-white rounded-sm bottom-2 right-2',
  overlayText: 'text-sm font-semibold py-1 px-2',
  //   cartBottomTextContainer:
};

export default MarketCard;
