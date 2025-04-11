import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { signOut, user } = useAuth();

  const handleLogout = () => {
    signOut();
  };
  return (
    <View className="m-5">
      <View className="mb-3 p-5 bg-white rounded-lg">
        <View className="flex flex-row items-center justify-between mb-5">
          <Text className="font-JakartaBold">Name:</Text>
          <Text className="text-black/70 font-Jakarta">{user?.name}</Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          <Text className="font-JakartaBold">Email:</Text>
          <Text className="text-black/70 font-Jakarta">{user?.email}</Text>
        </View>
      </View>
      <Pressable
        className="bg-primary rounded-lg px-5 py-2.5"
        onPress={handleLogout}
      >
        <Text className="text-center text-white font-JakartaSemiBold">
          Logout
        </Text>
      </Pressable>
    </View>
  );
};

export default Profile;
