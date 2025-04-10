import { Stack, useRouter } from "expo-router";

const Layout = () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="vehicles/[id]"
        options={{
          headerTitle: `Vehicle`,
          headerTitleAlign: "center",
          headerTintColor: "#FA7F35",
        }}
      />

      <Stack.Screen name="release-form" />
      <Stack.Screen
        name="camera-screen"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="submission" />
      <Stack.Screen
        name="signature"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
