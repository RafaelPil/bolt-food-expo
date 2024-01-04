import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import ParallaxScrollView from '../components/ParallaxScrollView.js';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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
        contentBackgroundColor="white"
        renderStickyHeader={() => (
          <View className={styles.headerContainer}>
            <Text className={styles.headerText}>{post.name}</Text>
          </View>
        )}
        scrollEvent={handleScroll}>
        <View className={styles.container}>
          <Text>Details</Text>
        </View>
      </ParallaxScrollView>
    </>
  );
};

const styles = {
  container: 'bg-white rounded-full',
  roundButton: 'w-10 h-10 bg-transparent rounded-full justify-center items-center',
  rightContainer: 'flex flex-row justify-center items-center gap-2',
  headerContainer: 'justify-end ml-28 h-16',
  headerText: 'text-xl font-bold',
};

export default RestaurantDetails;
