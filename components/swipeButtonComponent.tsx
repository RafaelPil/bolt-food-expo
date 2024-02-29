import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { SwipeButton } from '@arelstone/react-native-swipe-button';

const SwipeButtonComponent = () => {

    const [swiping, setSwiping] = useState(false);

  const onCompleteProgress = () => {
    router.push('/orderProgress');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SwipeButton
        Icon={<AntDesign name="arrowright" size={24} color="#34BB78" />}
        onComplete={onCompleteProgress}
        title={'Place order \n Slide to confirm'}
        containerStyle={{ backgroundColor: '#34BB78' }}
        circleBackgroundColor="white"
        underlayStyle={{
          backgroundColor: swiping ? '#34BB78' : 'white',
          borderRadius: 999,
          marginLeft: 10,
        }}
        height={60}
        titleStyle={{ color: 'white', fontSize: 14 }}
        onSwipeStart={() => setSwiping(true)}
        onSwipeEnd={() => setSwiping(false)}
        completeThresholdPercentage={70} // Set the percentage at which onComplete should be invoked
        goBackToStart={true}
      />
    </View>
  );
};

export default SwipeButtonComponent;
