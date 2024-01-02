import { View, Text, Image } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const MarketCard = () => {
  return (
    <View className={styles.cardContainer}>
      <View>
        <Image
          source={{
            uri: 'https://x7d4c5z5.stackpathcdn.com/wp-content/uploads/tc/2021/03/og-img.jpg',
          }} // Replace with your actual image source
          className="w-full h-[180px] rounded-md"
          resizeMode="cover"
        />
        <View className={styles.overlay}>
          <Text className={styles.overlayText}>30-40 min</Text>
        </View>
      </View>

      <View className="flex flex-row items-center justify-between">
        <Text className="text-base font-bold mt-2">Best Pizzas</Text>
        <View className="flex flex-row items-center">
          <FontAwesome name="star" size={17} color="#FF8C00" />
          <Text className="ml-1 font-bold text-base">4.7</Text>
        </View>
      </View>
      <Text className="text-sm font-">1,20 €</Text>
    </View>
  );
};

const styles = {
  cardContainer: 'mt-4',
  cardImage: 'w-full h-200 rounded-lg',
  cardTitle: 'mt-4 text-lg font-bold',
  overlay: 'absolute bg-white rounded-sm bottom-2 right-2',
  overlayText: 'text-sm font-semibold py-1 px-2',
  //   cartBottomTextContainer:
};

export default MarketCard;
