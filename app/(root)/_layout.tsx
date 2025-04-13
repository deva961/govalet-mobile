import { useAuth } from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

const AppLayout = () => {
  const { session, user } = useAuth();

  // Optional: Handle loading state if added to AuthContext
  if (session === null && user === null) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#FA7F35" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/" />;
  }

  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="vehicles/[id]"
        options={{
          headerShown: false,
          // headerTitle: `Vehicle`,
          // headerTitleAlign: "center",
          // headerTintColor: "#FA7F35",
        }}
      />
      <Stack.Screen name="release-form" />
      <Stack.Screen name="camera-screen" options={{ headerShown: false }} />
      <Stack.Screen name="submission" />
    </Stack>
  );
};

export default AppLayout;
