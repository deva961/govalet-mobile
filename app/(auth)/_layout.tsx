import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="sign-in"
    >
      {/* <Stack.Screen name="welcome" /> */}
      <Stack.Screen name="sign-in" />
    </Stack>
  );
};

export default AuthLayout;
