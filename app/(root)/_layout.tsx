import { Stack } from "expo-router";

const Layout = () => {
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
          headerTitle: "Vehicle Detail",
          headerTintColor: "#FA7F35",
          headerBackTitle: "Back",
        }}
      />

      <Stack.Screen
        name="release-form"
        // options={{
        //   headerShown: false,
        // }}
      />
    </Stack>
  );
};

export default Layout;
