import { onBoarding } from "@/constants/welcome";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const isLastSlide = activeIndex === onBoarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white relative">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-in");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaMedium">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-8 h-1 mx-1 bg-slate-300 rounded-full"></View>}
        activeDot={
          <View className="w-8 h-1 mx-1 bg-primary rounded-full"></View>
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onBoarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center">
            <Image
              source={item.image}
              resizeMode="contain"
              className="w-full h-[450px]"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-black text-3xl font-JakartaSemiBold capitalize text-center ">
                {item.title}
              </Text>
            </View>
            <Text className="text-lg text-center mx-10 mt-3 font-Jakarta tracking-wide text-slate-600">
              {item.desc}
            </Text>
          </View>
        ))}
      </Swiper>

      {/* Continue button positioned at the bottom */}
      <View className="absolute bottom-14 w-full p-5">
        <TouchableOpacity
          className="bg-primary shadow-md py-3.5 rounded-full mx-5"
          onPress={() => {
            isLastSlide
              ? router.replace("/(auth)/sign-in")
              : swiperRef.current?.scrollBy(1);
          }}
        >
          <Text className="text-white text-center font-JakartaBold">
            {isLastSlide ? "Get Started" : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
