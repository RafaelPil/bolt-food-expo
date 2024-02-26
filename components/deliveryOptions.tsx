import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const DeliveryOptions = ({ restaurantById }) => {
  const [selectedOption, setSelectedOption] = useState('delivery');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
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
    </>
  );
};

export default DeliveryOptions;
