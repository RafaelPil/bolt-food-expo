import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { dummyRestaurantsData } from 'assets/data/restaurantsData';

const ModalFood = () => {
  const { id, itemId } = useLocalSearchParams();
  const restaurantById = dummyRestaurantsData?.find((r) => r?.id === id);
  const meals = restaurantById?.food.flatMap((c) => c.meals);
  const foundMeals = meals?.find((m) => m.id === +itemId);
  console.log(foundMeals);
  const navigation = useNavigation();

  const [note, setNote] = useState('');
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(foundMeals?.price);
  // items count
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
      setTotalPrice(totalPrice - foundMeals?.price);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
    setTotalPrice(totalPrice + foundMeals?.price);
  };

  return (
    <View className={styles.container}>
      <View className="bg-white rounded-b-2xl">
        <Image source={{ uri: foundMeals?.img }} resizeMode="contain" className="w-full h-72" />
        <View className="p-5">
          <Text className="text-2xl font-bold">{foundMeals?.name}</Text>
          <Text className="text-base font-[#6e6d72] my-2">{foundMeals?.price} €</Text>
          <Text className="text-base text-[#6f707c]">{foundMeals?.info}</Text>
        </View>
      </View>
      <View className="bg-white mt-2 rounded-t-2xl p-4">
        <TextInput placeholder="Add a note" value={note} onChangeText={setNote} />
      </View>

      <View className="flex flex-row bg-white mt-1 p-4 mb-auto justify-between">
        <View className="flex flex-row justify-evenly border h-12 w-28 items-center rounded-full">
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

        <TouchableOpacity
          className="bg-[#34BB78] w-56 rounded-full items-center justify-center"
          onPress={() => navigation.goBack()}>
          <Text className="text-white">Add €{totalPrice?.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: 'bg-gray-200 flex flex-1',
};

export default ModalFood;
