import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import React, { useLayoutEffect, useContext, useState } from 'react';
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppContext } from 'context/appContext';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

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
  const { restaurantById, count, setCount, totalPrice, setTotalPrice, foundMeals } =
    useAppContext();
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('delivery');

  console.log(foundMeals);

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

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
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
      <View className="flex rounded-2xl bg-white px-4 py-6 mt-2">
        <Text className="text-lg font-bold mb-4">Delivery or pickup?</Text>
        {/* 1 row */}
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center">
            <Ionicons name="bicycle" size={30} color="black" />
            <View className="ml-2">
              <Text className="text-small">Delivery</Text>
              <Text className="text-small text-gray-600">{restaurantById.delivery} min</Text>
            </View>
          </View>

          <View className="flex flex-row items-center">
            <Text className="text-base mr-2">0.00 €</Text>
            <TouchableOpacity
              style={{
                width: selectedOption === 'delivery' ? 20 : 20,
                height: selectedOption === 'delivery' ? 20 : 20,
                borderWidth: selectedOption === 'delivery' ? 6 : 2,
                borderRadius: 999,
                alignItems: 'center',
                backgroundColor: selectedOption === 'delivery' ? '#ffffff' : 'transparent',
                borderColor: selectedOption === 'delivery' ? '#34BB78' : '#d1d1d1', // Border color for unselected option
              }}
              onPress={() => handleOptionSelect('delivery')}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: selectedOption === 'delivery' ? 'white' : '#ffffff',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Separator */}
        <View className="border-[0.5px] border-slate-200 my-4" />

        {/* 2nd row */}
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center">
            <FontAwesome5 name="walking" size={26} color="black" style={{ paddingHorizontal: 8 }} />
            <View className="ml-2">
              <Text className="text-small">Pickup</Text>
              <Text className="text-small text-gray-600">{restaurantById.delivery} min</Text>
            </View>
          </View>

          <View className="flex flex-row items-center">
            <Text className="text-base mr-2">0.00 €</Text>
            <TouchableOpacity
              style={{
                width: selectedOption === 'pickup' ? 20 : 20,
                height: selectedOption === 'pickup' ? 20 : 20,
                borderWidth: selectedOption === 'pickup' ? 6 : 2,
                borderRadius: 999,
                alignItems: 'center',
                backgroundColor: selectedOption === 'pickup' ? '#ffffff' : 'transparent',
                borderColor: selectedOption === 'pickup' ? '#34BB78' : '#d1d1d1', // Border color for unselected option
              }}
              onPress={() => handleOptionSelect('pickup')}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: selectedOption === 'pickup' ? 'white' : '#ffffff',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Separator */}
        <View className="border-[0.5px] border-slate-200 my-4" />

        {/* 3nd row */}
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center">
            <MaterialCommunityIcons
              name="calendar-clock-outline"
              size={24}
              color="black"
              style={{ paddingHorizontal: 4 }}
            />
            <View className="ml-2">
              <Text className="text-small">Schedule</Text>
              <Text className="text-small text-gray-600">Select time</Text>
            </View>
          </View>

          <View className="flex flex-row items-center">
            <Text className="text-base mr-2">0.00 €</Text>
            <TouchableOpacity
              style={{
                width: selectedOption === 'schedule' ? 20 : 20,
                height: selectedOption === 'schedule' ? 20 : 20,
                borderWidth: selectedOption === 'schedule' ? 6 : 2,
                borderRadius: 999,
                alignItems: 'center',
                backgroundColor: selectedOption === 'schedule' ? '#ffffff' : 'transparent',
                borderColor: selectedOption === 'schedule' ? '#34BB78' : '#d1d1d1', // Border color for unselected option
              }}
              onPress={() => handleOptionSelect('schedule')}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: selectedOption === 'schedule' ? 'white' : '#ffffff',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BasketScreen;