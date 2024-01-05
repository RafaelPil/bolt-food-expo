import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import ParallaxScrollView from '../components/ParallaxScrollView.js';
import { useNavigation } from 'expo-router';
import { Ionicons, FontAwesome5, AntDesign, FontAwesome } from '@expo/vector-icons';

const RestaurantDetails = ({ post }) => {
  const navigation = useNavigation();
  const [headerIconsColor, setHeaderIconsColor] = useState('white');

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;

    // Change header icons color based on scroll position
    if (scrollPosition > 80) {
      setHeaderIconsColor('black');
    } else {
      setHeaderIconsColor('white');
    }
  };

  const ratingStyle = {
    color: post.rating < 4.5 ? 'black' : '#FF8C00',
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: 'white',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} className={styles.roundButton}>
          <Ionicons name="arrow-back" size={24} color={headerIconsColor} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className={styles.rightContainer}>
          <TouchableOpacity className={styles.roundButton}>
            <Ionicons name="share-outline" size={24} color={headerIconsColor} />
          </TouchableOpacity>
          <TouchableOpacity className={styles.roundButton}>
            <Ionicons name="search-outline" size={24} color={headerIconsColor} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [headerIconsColor]);

  return (
    <>
      <ParallaxScrollView
        style={{ flex: 1 }}
        backgroundColor="white"
        parallaxHeaderHeight={200}
        renderBackground={() => (
          <Image className="w-full h-full" source={{ uri: post.profileImage }} resizeMode="cover" />
        )}
        stickyHeaderHeight={80}
        contentBackgroundColor="#ecedef"
        renderStickyHeader={() => (
          <View className={styles.headerContainer}>
            <Text className={styles.headerText}>{post.name}</Text>
          </View>
        )}
        scrollEvent={handleScroll}>
        <View className={styles.namesContainer}>
          <View className="m-6">
            <View className={styles.titleContaierRow}>
              <Text className={styles.restaurantName}>{post.name}</Text>
              <View className={styles.ratingContainerRow}>
                <FontAwesome name="star" size={17} color={ratingStyle.color} />
                <Text className="ml-1 font-bold text-base">{post.rating}</Text>
              </View>
            </View>

            <View className={styles.deliveryTextsContainer}>
              <Ionicons name="bicycle" size={18} color="black" />
              <Text className={styles.deliveryTexts}>Delivery</Text>
              <Text>・</Text>
              <FontAwesome5 name="walking" size={15} color="black" />
              <Text className={styles.deliveryTexts}>Pickup</Text>
              <Text>・</Text>

              <Text className={styles.delyveryTextMoreInfo}>More info</Text>
              <AntDesign
                name="right"
                size={14}
                color="black"
                className={styles.delyveryTextMoreInfo}
              />
            </View>
            <View className="h-[0.5px] bg-slate-300 my-4" />
            <Text className={styles.deliveryTexts}>{post.about}</Text>
          </View>
        </View>

        <View className=" flex bg-white mt-2 rounded-2xl">
          <View className="m-6"></View>
        </View>
      </ParallaxScrollView>
    </>
  );
};

const styles = {
  namesContainer: 'flex rounded-2xl -mt-12 bg-white',
  titleContaierRow: 'flex flex-row items-center justify-between',
  ratingContainerRow: 'flex flex-row items-center',
  roundButton: 'w-10 h-10 bg-transparent rounded-full justify-center items-center',
  rightContainer: 'flex flex-row justify-center items-center gap-2',
  headerContainer: 'justify-end ml-28 h-16',
  headerText: 'text-xl font-bold',
  restaurantName: 'text-2xl font-bold text-[#2e303d]',
  deliveryTextsContainer: 'flex flex-row items-center',
  deliveryTexts: 'text-sm ml-1 text-[#6e6d72]',
  delyveryTextMoreInfo: 'text-sm font-bold',
};

export default RestaurantDetails;
