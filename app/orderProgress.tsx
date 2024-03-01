import { View, Text } from 'react-native';
import React, { useMemo } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

const OrderProgress = () => {
  const snapPoints = useMemo(() => ['25%', '80%'], []);

  return (
    <View className="flex flex-1 p-4">
      <BottomSheet index={1} snapPoints={snapPoints}>
        <View>
          <Text>Heey</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default OrderProgress;
