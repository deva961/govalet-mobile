import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";

const activeColor = "#FA7F35";
const inactiveColor = "#475569";

const TabLabel = ({ focused, label }: { focused: boolean; label: string }) => (
  <Text
    style={{
      color: focused ? activeColor : inactiveColor,
      fontSize: 12,
      fontFamily: "JakartaMedium",
    }}
  >
    {label}
  </Text>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          paddingVertical: 10,
          paddingHorizontal: 14,
          height: 60,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused} label="Home" />
          ),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={24}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="availability"
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused} label="Schedule" />
          ),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="calendar"
              size={24}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused} label="Chats" />
          ),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="message-square"
              size={24}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused} label="History" />
          ),
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="history"
              size={24}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: ({ focused }) => (
            <TabLabel focused={focused} label="Profile" />
          ),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={24}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
