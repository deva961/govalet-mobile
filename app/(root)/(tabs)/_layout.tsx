import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: () => <Text className="text-sm">Home</Text>,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="availability"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
