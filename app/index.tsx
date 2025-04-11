import InputField from "@/components/input-field";
import { useAuth } from "@/context/AuthContext";
import Feather from "@expo/vector-icons/Feather";
import { Redirect } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const { session, login } = useAuth();

  if (session) {
    return <Redirect href={"/(root)/(tabs)/home"} />;
  }

  const screenHeight = Dimensions.get("window").height;
  const imageHeight = screenHeight * 0.3;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert(
        "Missing Information",
        "Please fill out both email and password."
      );
      return;
    }

    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error(error);
      Alert.alert("Login Error", "Something went wrong.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <Image
          source={require("@/assets/images/welcome_4.png")}
          resizeMode="contain"
          style={{ width: "100%", height: imageHeight }}
        />

        <View className="px-5">
          <Text className="text-4xl font-JakartaExtraBold text-primary mb-2">
            Welcome
          </Text>
          <Text className="text-4xl font-JakartaExtraBold mb-5">back!</Text>
          <Text className="text-slate-400 font-JakartaMedium text-lg">
            Sign in to access updates on your shipments.
          </Text>

          <View className="my-10">
            <InputField
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              autoCapitalize="none"
              onChangeText={(value) =>
                setFormData({ ...formData, email: value })
              }
              icon={<Feather name="mail" size={20} color="gray" />}
            />

            <InputField
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(value) =>
                setFormData({ ...formData, password: value })
              }
              secureTextEntry
              icon={<Feather name="lock" size={20} color="gray" />}
            />
          </View>

          <TouchableOpacity
            className="bg-primary shadow-md py-3.5 rounded-full"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center font-JakartaBold">
              Login
            </Text>
          </TouchableOpacity>

          <View className="my-5">
            <Text className="text-center text-lg text-slate-500 font-JakartaMedium">
              Don't have an account?
            </Text>
            <Text className="text-center text-lg font-JakartaMedium underline text-primary/60">
              Reach out to your head.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
