import { SafeAreaView, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import FontAwesome5 from your package
import MarketCard from 'components/marketCard';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  return (
    <ScrollView className={styles.container}>
      <View className={styles.header}>
        <View className={styles.addressContainer}>
          <MaterialCommunityIcons name="map-marker-outline" size={28} color="black" />
          <Text className={styles.addressText}>Your Address Here</Text>
        </View>
      </View>
      <Text className={styles.cardTitle}>Bolt Market</Text>
      <MarketCard />
    </ScrollView>
  );
}

const styles = {
  container: 'flex-1 p-4 mt-6 bg-white',
  header: 'flex-row justify-between',
  title: 'text-xl font-bold',
  addressContainer: 'flex-row items-center',
  addressText: 'ml-2',
  cardContainer: 'mt-4',
  cardImage: 'w-full h-200 rounded-lg',
  cardTitle: 'mt-4 text-lg font-bold',
};
