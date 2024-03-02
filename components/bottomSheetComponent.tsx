import { View, Text } from 'react-native';
import React, { useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';

const BottomSheetComponent = () => {
  const snapPoints = useMemo(() => ['20%', '100%'], []);

  const now = new Date();
  const futureTime = new Date(now.getTime() + 15 * 60000); // Adding 15 minutes (15 * 60000 milliseconds)
  const formattedTime = futureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* Bottom Sheet */}
      <BottomSheet index={0} snapPoints={snapPoints}>
        <View className="flex flex-1 px-4 mt-2">
          {/* 1 row Time */}
          <View className="flex flex-row justify-between items-center">
            <Text className="text-5xl text-black">{formattedTime}</Text>
            <View className="flex items-end">
              <Text className="text-gray-500 text-base">Estimated time of</Text>
              <Text className="text-gray-500 text-base">delivery</Text>
            </View>
          </View>

          {/* Text */}
          <Text className="text-black font-bold text-lg mt-6 mb-4">Order progress</Text>

          {/* Progress bar */}
          <View className="flex flex-row h-72 justify-start">
            {/* Progress Time */}
            <View className="flex flex-col">
              <Text className="mr-4 text-base text-gray-500">15:25</Text>
              <Text className="mr-4 mt-11 text-base text-gray-500">15:25</Text>
              <Text className="mr-4 mt-11 text-base text-gray-500">15:25</Text>
              <Text className="mr-4 mt-10 text-base text-gray-500">15:25</Text>
              <Text className="mr-4 mt-10 text-base text-gray-500">15:25</Text>
            </View>

            {/* Progress Line */}
            <View className="flex flex-col border-[1px] border-[#34BB78] ">
              {/* 1st buble */}
              <View className="w-6 h-6 absolute bg-[#34BB78] rounded-full right-[-12px] top-[-3px] items-center">
                <AntDesign name="check" size={16} color="white" style={{ marginTop: 4 }} />
              </View>
              {/* 2nd buble */}
              <View className="w-6 h-6 absolute bg-[#34BB78] rounded-full right-[-12px] top-[67px] items-center">
                <AntDesign name="check" size={16} color="white" style={{ marginTop: 4 }} />
              </View>
              {/* 3nd buble */}
              <View className="w-6 h-6 absolute bg-[#34BB78] rounded-full right-[-12px] top-[135px] items-center">
                <AntDesign name="check" size={16} color="white" style={{ marginTop: 4 }} />
              </View>
              {/* 4nd buble */}
              <View className="w-6 h-6 absolute bg-[#34BB78] rounded-full right-[-12px] top-[200px] items-center">
                <AntDesign name="check" size={16} color="white" style={{ marginTop: 4 }} />
              </View>
              {/* 5nd buble */}
              <View className="w-6 h-6 absolute bg-[#34BB78] rounded-full right-[-12px] top-[265px] items-center">
                <AntDesign name="check" size={16} color="white" style={{ marginTop: 4 }} />
              </View>
            </View>

            {/* Progress Text */}
            <View className="flex flex-col">
              <Text className="ml-6 text-base text-gray-500">
                has deployd your order by 15 min.
              </Text>
              <Text className="ml-6 mt-11 text-base text-gray-500">
                has deployd your order by 15 min.
              </Text>
              <Text className="ml-6 mt-11 text-base text-gray-500">
                has deployd your order by 15 min.
              </Text>
              <Text className="ml-6 mt-10 text-base text-gray-500">
                has deployd your order by 15 min.
              </Text>
              <Text className="ml-6 mt-10 text-base text-gray-500">
                has deployd your order by 15 min.
              </Text>
            </View>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

export default BottomSheetComponent;
