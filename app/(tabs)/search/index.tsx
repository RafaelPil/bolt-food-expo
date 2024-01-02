import { View, Text } from 'react-native';
import React from 'react';

const SearchScreen = () => {
  return (
    <View className={styles.container}>
      <Text className={styles.title}>Seach</Text>
    </View>
  );
};

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};

export default SearchScreen;
