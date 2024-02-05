import { Stack, useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  const navigation = useNavigation();
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]"
        options={{ headerTitle: 'Restaurant Details', headerShown: true }}
      />
      <Stack.Screen
        name="modalFood"
        options={{
          presentation: 'modal',
          headerTitle: '',
          headerTransparent: true,
          headerRight: () => (
            <TouchableOpacity
              style={{ backgroundColor: '#fff', borderRadius: 20, padding: 2 }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Ionicons name="close-outline" size={30} color={'#5A5A5A'} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="modalAddress"
        options={{
          presentation: 'modal',
          title: 'Delivery address',
          headerTransparent: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('(tabs)');
              }}>
              <Ionicons name="close-outline" size={28} color={'#5A5A5A'} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
