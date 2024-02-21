import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SectionList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import ParallaxScrollView from '../components/ParallaxScrollView.js';
import { Link, useGlobalSearchParams, useNavigation } from 'expo-router';
import { Ionicons, FontAwesome5, AntDesign, FontAwesome } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useAppContext } from 'context/appContext';

const RestaurantDetails = ({ post }) => {
  const { id } = useGlobalSearchParams();
  //console.log(post.id);
  const navigation = useNavigation();
  const [headerIconsColor, setHeaderIconsColor] = useState('white');
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const { foundMeals, count, totalPrice } = useAppContext();
  console.log(count);
  console.log(totalPrice);
  console.log(foundMeals);

  const opacity = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;

    // Find the active category based on scroll position
    data.forEach((category, index) => {
      const sectionTop = index * 260; // Assuming SECTION_HEIGHT is the height of each section
      const sectionBottom = (index + 1) * 260;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        setActiveCategoryIndex(index);
      }
    });

    // Update the active category index and header icons color
    setActiveButtonIndex(activeCategoryIndex);

    if (scrollPosition > 80) {
      setHeaderIconsColor('black');
      opacity.value = withTiming(1);
    } else {
      setHeaderIconsColor('white');
      opacity.value = withTiming(0);
    }
  };

  const selectCategory = (index: Number) => {
    setActiveButtonIndex(index);
  };

  const ratingStyle = {
    color: post.rating < 4.5 ? 'black' : '#FF8C00',
  };

  const data = post.food.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

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

  const renderItem: ListRenderItem<any> = ({ item, index }) => {
    return (
      <Link href={{ pathname: '/modalFood', params: { id: id, itemId: item.id } }} asChild>
        <TouchableOpacity
          className={`${styles.itemContainer} ${
            count >= 1 && foundMeals?.id === item.id ? styles.greenBorder : ''
          }`}>
          <View className="flex flex-1 justify-center my-6 mr-8 ml-6">
            <View className="flex flex-row items-center">
              {count >= 1 && foundMeals?.id === item.id && (
                <View className="bg-[#34BB78] items-center w-6 h-7 rounded-md mr-2">
                  <Text className="text-lg text-white font-semibold">{count}</Text>
                </View>
              )}
              <Text className="text-base font-semibold">{item.name}</Text>
            </View>
            <Text className="text-sm text-[#6e6d72]">{item.info}</Text>
            <Text className="">{item.price} €</Text>
          </View>
          <Image source={{ uri: item.img }} className={styles.foodImage} resizeMode="contain" />
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <>
      <ParallaxScrollView
        styles={{ flex: 1 }}
        backgroundColor="white"
        parallaxHeaderHeight={200}
        renderBackground={() => (
          <Image
            className="w-full h-full"
            style={{ backgroundColor: 'white' }}
            source={{ uri: post.profileImage }}
            resizeMode="cover"
          />
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
                <Text className={styles.rating}>{post.rating}</Text>
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
            <View className={styles.separator} />
            <Text className={styles.deliveryAbout}>{post.about}</Text>
          </View>
        </View>

        <View className={styles.itemsContainer}>
          <View>
            <SectionList
              sections={data}
              scrollEnabled={false}
              keyExtractor={(item, index) => `${item.id + index}`}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <View className="border-[0.5px] border-slate-300" />}
              // SectionSeparatorComponent={() => <View className="border-[0.5px] border-slate-300" />}
              renderSectionHeader={({ section: { title, index } }) => (
                <Text className="text-2xl font-bold text-[#2e303d] my-2 ml-6">{title}</Text>
              )}
            />
          </View>
        </View>
      </ParallaxScrollView>

      <Animated.View style={[cStyles.stickySegments, animatedStyles]}>
        <View className="justify-center pt-2 bg-white">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, alignItems: 'center', gap: 10 }}>
            {post.food.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={
                  activeButtonIndex === index ? styles.stickyButtonActive : styles.stickyButton
                }
                onPress={() => selectCategory(index)}>
                <Text
                  className={
                    activeButtonIndex === index
                      ? styles.stickyButtonTextActive
                      : styles.stickyButtonText
                  }>
                  {item.category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>
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
  deliveryTexts: 'text-sm ml-1 text-[#2e303d]',
  delyveryTextMoreInfo: 'text-sm font-bold',
  rating: 'ml-1 font-bold text-base',
  separator: 'h-[0.5px] bg-slate-300 my-4',
  deliveryAbout: 'text-sm ml-1 text-[#2e303d]',
  itemsContainer: 'flex bg-white mt-2 rounded-t-2xl',
  itemContainer: 'flex flex-row justify-betweenitems-center',
  greenBorder: 'border-l-8 border-[#34BB78]',
  food: '',
  foodText: 'text-[#6e6d72]',
  foodPrice: '',
  foodImage: 'w-28 h-24 rounded-sm',
  stickyContainer: 'absolute h-12 left-0 right-0 top-20 bg-white overflow-hidden',
  stickyShadow: '',
  stickyButtonActive: 'px-2 py-1',
  stickyButton: 'px-2 py-1',
  stickyButtonTextActive: 'font-bold text-base',
  stickyButtonText: 'text-base',
};

const cStyles = StyleSheet.create({
  stickySegments: {
    position: 'absolute',
    height: 50,
    left: 0,
    right: 0,
    top: 80,
    backgroundColor: '#fff',
    overflow: 'hidden',
    paddingBottom: 4,
  },
});

export default RestaurantDetails;
