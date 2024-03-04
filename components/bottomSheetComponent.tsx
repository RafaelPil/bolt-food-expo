import React, { useMemo, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { AntDesign } from '@expo/vector-icons';

const trackData = [
  {
    id: '0',
    text: 'has delayed your order by 15 min',
  },
  {
    id: '1',
    text: 'Courier has been assigned',
  },
  {
    id: '2',
    text: 'Preparing your order',
  },
  {
    id: '3',
    text: 'Courier is on its way',
  },
  {
    id: '4',
    text: 'Courier is delivering your order',
  },
];

const BottomSheetComponent = () => {
  const snapPoints = useMemo(() => ['20%', '100%'], []);
  const [progress, setProgress] = useState(0); // Progress of the bar
  const stepInterval = 3 * 60 * 1000; // 3 minutes in milliseconds

  // Fixed time for delivery
  const fixedDeliveryTime = useMemo(() => {
    const baseTime = new Date(); // Current time
    return baseTime;
  }, []);

  // Calculate fixed times for each step
  const stepTimes = useMemo(() => {
    const times = [];
    let time = new Date(fixedDeliveryTime);
    for (let i = 0; i < trackData.length; i++) {
      times.push(new Date(time));
      time.setMilliseconds(time.getMilliseconds() + stepInterval);
    }
    return times;
  }, [fixedDeliveryTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 4) {
          return prevProgress + 1; // Update progress every step
        } else {
          clearInterval(interval);
          return 4;
        }
      });
    }, stepInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <BottomSheet index={0} snapPoints={snapPoints}>
        <View className="flex flex-1 px-6 mt-2">
          {/* 1 row Time */}
          <View className="flex flex-row justify-between items-center">
            <Text className="text-5xl text-black">
              {new Date(fixedDeliveryTime.getTime() + 15 * 60000).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </Text>
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
              {trackData.map((track, index) => (
                <Text
                  key={track.id}
                  className={`mr-4 text-base text-gray-500 ${
                    index <= progress ? 'text-gray-500' : 'hidden'
                  }`}>
                  {index <= progress
                    ? stepTimes[index].toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                      })
                    : null}
                </Text>
              ))}
            </View>

            {/* Progress Line */}
            <View className="flex flex-col border-[1px] border-[#34BB78] ">
              {trackData.map((track, index) => (
                <View
                  key={track.id}
                  className={`w-6 h-6 absolute bg-[#34BB78] rounded-full right-[-12px] ${
                    index <= progress ? 'top-[-3px]' : 'top-[265px]'
                  } items-center`}>
                  {index <= progress && (
                    <AntDesign name="check" size={16} color="white" style={{ marginTop: 4 }} />
                  )}
                </View>
              ))}
            </View>

            {/* Progress Text */}
            <View className="flex flex-col">
              {trackData.map((track, index) => (
                <Text key={track.id} className="ml-6 text-base text-gray-500">
                  {track.text}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

export default BottomSheetComponent;
