import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import React, { useLayoutEffect, useContext, useState } from 'react';
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useAppContext } from 'context/appContext';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import PricingComponent from 'components/pricingComponent';
import MapView, { Marker } from 'react-native-maps';
import DeliveryOptions from 'components/deliveryOptions';
import MapViewComponent from 'components/mapViewComponent';
import Checkbox from 'expo-checkbox';
import { SwipeButton } from '@arelstone/react-native-swipe-button';
import { router } from 'expo-router';
import SwipeButtonComponent from 'components/swipeButtonComponent';

const sauceData = [
  {
    id: '1',
    imageUri:
      'https://images.bolt.eu/store/2023/2023-01-18/ceb12673-e2cb-4f24-a65d-ba900aeac3b1.jpeg',
    title: 'Garlic sauce',
    price: 0.5,
  },
  {
    id: '2',
    imageUri:
      'https://images.bolt.eu/store/2023/2023-01-18/60b40de0-f5a3-41d7-ad5c-91208b9f0ff4.jpeg',
    title: 'Barbeque sauce',
    price: 0.5,
  },
  {
    id: '3',
    imageUri:
      'https://images.bolt.eu/store/2023/2023-01-18/241c707d-d9cc-4b95-8941-47b9743b5f44.jpeg',
    title: 'Pitta sauce',
    price: 0.5,
  },
];

const renderItem = ({ item }) => (
  <View className="mb-4">
    <View>
      <Image
        source={{ uri: item.imageUri }}
        className="w-32 h-32 mr-2 rounded-lg"
        resizeMode="contain"
      />
      <AntDesign
        name="pluscircle"
        size={34}
        color="white"
        style={{ position: 'absolute', right: 14, bottom: 6 }}
      />
    </View>

    <View>
      <Text className="text-sm text-gray-700">{item.price} €</Text>
      <Text className="text-sm text-gray-700">{item.title}</Text>
    </View>
  </View>
);

const BasketScreen = () => {
  const {
    restaurantById,
    count,
    setCount,
    totalPrice,
    setTotalPrice,
    foundMeals,
    streetName,
    coordinates,
  } = useAppContext();

  const [isChecked, setChecked] = useState(false);
  const [swiping, setSwiping] = useState(false);
  const navigation = useNavigation();

  // Destructuring latitude and longitude from the coordinates object
  const { latitude, longitude } = coordinates || {}; // If coordinates is null or undefined, provide an empty object

  console.log('coordinates: ', coordinates);
  console.log('latitude:', latitude);
  console.log('longitude:', longitude);

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

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const onCompleteProgress = () => {
    router.push('/orderProgress');
  };

  return (
    <ScrollView className="flex flex-1 bg-[#ecedef]">
      <View className="flex rounded-b-2xl bg-white px-4 py-6">
        {/* item */}
        <View className="flex flex-row justify-between items-center ">
          <View className="flex flex-row">
            <Image
              source={{ uri: foundMeals.img }}
              className="w-14 h-14 mr-2"
              resizeMode="contain"
            />
            <View>
              <Text className="text-lg text-gray-800">{foundMeals.name}</Text>
              <Text className="text-base font-bold">{foundMeals.price} €</Text>
            </View>
          </View>

          <View className="flex flex-row justify-around border border-gray-200 h-10 w-24 items-center rounded-full">
            {count > 1 ? (
              <TouchableOpacity onPress={decrementCount}>
                <Text className="text-2xl text-black">—</Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text className="text-2xl text-gray-500">—</Text>
              </View>
            )}
            <Text className="text-lg">{count}</Text>
            <TouchableOpacity onPress={incrementCount}>
              <Text className="text-2xl text-black">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Separator */}
        <View className="border-[0.5px] border-slate-200 my-4" />

        {/* Add More */}
        <View className="flex flex-row items-center">
          <AntDesign name="pluscircle" size={24} color="#34BB78" />
          <Text className="text-[#34BB78] text-base font-semibold ml-4">Add more</Text>
        </View>

        {/* Separator */}
        <View className="border-[0.5px] border-slate-200 my-4" />

        {/* Leave Comment */}
        <View>
          <TextInput
            multiline={true}
            placeholder={'Need cutlery ? Napkins ? Other ? \nLeave a comment...'}
          />
        </View>

        {/* Separator */}
        <View className="border-[0.5px] border-slate-200 my-4" />

        {/* People also added */}
        <View>
          <Text className="text-lg font-bold mb-4">People also added</Text>
          <FlatList
            data={sauceData}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>

      {/* Delivery Or Pickup */}
      <DeliveryOptions restaurantById={restaurantById} />

      {/* Pricing */}
      <View className="flex rounded-2xl bg-white px-4 py-6 mt-2">
        <PricingComponent totalPrice={totalPrice} />
      </View>

      {/* Map View */}
      <View className="flex rounded-2xl bg-white px-4 py-6 mt-2 flex-1">
        <MapViewComponent streetName={streetName} latitude={latitude} longitude={longitude} />
      </View>

      {/* Place order */}
      <View className="flex rounded-t-2xl bg-white py-6 mt-2 flex-1">
        {/* Total */}
        <View className="flex flex-row items-center justify-between mb-2 px-4">
          <View className="flex flex-row items-center">
            <Text className="text-lg mr-1 font-bold">Total</Text>
          </View>
          <Text className="text-lg font-bold">{totalPrice} €</Text>
        </View>

        {/* Cash row */}
        <View className="flex flex-row items-center justify-between mb-2 px-4">
          <View className="flex flex-row items-center">
            <FontAwesome5 name="money-bill-wave-alt" size={24} color="#34BB78" />
            <View className="flex flex-col ml-2">
              <Text className="text-base">Cash</Text>
              <Text className="text-base text-[#34BB78]">Change</Text>
            </View>
          </View>
          <Text className="text-base">{totalPrice} €</Text>
        </View>

        {/* Cash warning */}
        <View className="flex flex-row items-center mb-2 px-4 mt-2">
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#34BB78' : undefined}
          />
          <Text className="ml-2 text-base">
            <Text>Cash order</Text>
            <FontAwesome5 name="exclamation-triangle" size={18} color="#fcb001" />
            I accept that courier may not have change
            <FontAwesome5 name="exclamation-triangle" size={18} color="#fcb001" />
          </Text>
        </View>

        {/* Separator */}
        <View className="border-[0.5px] border-slate-200 my-4" />

        <SwipeButtonComponent />
      </View>
    </ScrollView>
  );
};

export default BasketScreen;
