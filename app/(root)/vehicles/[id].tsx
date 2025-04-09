import { formatCanadianPhone } from "@/utils/phone-formatter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Linking, Text, TouchableOpacity, View } from "react-native";

const VehicleDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const phone: string = "2263456432";
  return (
    <View className="m-3">
      <View className="mb-3 p-5 bg-white rounded-lg">
        <View className="flex flex-row items-center justify-between mb-5">
          <Text className="font-JakartaBold">Name:</Text>
          <Text className=" text-black/70 font-Jakarta uppercase">
            WTH Car Rental ULC
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text className="font-JakartaBold">Phone:</Text>
          <Text className=" text-black/70 font-Jakarta uppercase">
            {formatCanadianPhone("2263456432")}
          </Text>
        </View>
      </View>

      <View className="mb-3 p-5 bg-white rounded-lg">
        <View className="flex flex-row items-center justify-between mb-5">
          <Text className=" font-JakartaBold">VIN:</Text>
          <Text className="text-black/70 font-Jakarta">AJ283241</Text>
        </View>
        <View className="flex flex-row items-center justify-between mb-5">
          <Text className=" font-JakartaBold">Make:</Text>
          <Text className="text-black/70 font-Jakarta">Mitsubishi</Text>
        </View>

        <View className="flex flex-row items-center justify-between mb-5">
          <Text className=" font-JakartaBold">Model:</Text>
          <Text className="text-black/70 font-Jakarta">Lancer EVO</Text>
        </View>

        <View className="flex flex-row items-center justify-between">
          <Text className=" font-JakartaBold">Year:</Text>
          <Text className="text-black/70 font-Jakarta">2015</Text>
        </View>
      </View>

      <View className="mb-3 p-5 bg-white rounded-lg">
        <View className="">
          <Text className="mb-2.5 font-JakartaBold">Pickup Address:</Text>
          <Text className="text-base text-black/70 font-Jakarta">
            196 Woodbine Ave, Kitchener, ON, N2R 1Y5
          </Text>
        </View>
      </View>

      <View className=" p-5 bg-white rounded-lg">
        <Text className="font-JakartaBold">Attachments:</Text>
        <View className="flex items-center my-3 justify-between flex-row">
          <Text className="text-black/70">Release Form:</Text>
          <TouchableOpacity
            onPress={() => {
              const url = `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`;
              Linking.openURL(url);
            }}
            className="border-b border-orange-500 rounded-full flex items-center justify-center flex-row text-center"
          >
            <Text className="text-center text-orange-500 ml-1.5 font-JakartaBold text-sm uppercase">
              Download
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex flex-row justify-between mt-3">
        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${phone}`)}
          className="border bg-white border-orange-500 rounded-lg w-[48%] flex items-center justify-center flex-row py-3 text-center"
        >
          <MaterialIcons name="phone" size={20} color={"#FA7F35"} />
          <Text className="text-center text-orange-500 ml-1.5 font-JakartaBold text-sm uppercase">
            Call Customer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-orange-500 rounded-lg w-[48%] flex items-center justify-center flex-row py-3"
          onPress={() => {}}
        >
          <FontAwesome name="hourglass-start" size={16} color="white" />
          <Text className="text-white text-center ml-1.5 font-JakartaBold uppercase text-sm">
            Force Start
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VehicleDetail;
