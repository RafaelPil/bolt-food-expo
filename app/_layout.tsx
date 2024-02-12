import { Stack, useNavigation } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppProvider } from 'context/appContext';

export default function RootLayout() {
  const navigation = useNavigation();
  return (
    <AppProvider>
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
            headerShown: false,
           
          }}
        />
      </Stack>
    </AppProvider>
  );
}
