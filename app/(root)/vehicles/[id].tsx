import Popup from "@/components/popup";
import { formatCanadianPhone } from "@/utils/phone-formatter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const VehicleDetail = ({ type = "DROPOFF" }: { type: string }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showSignature, setShowSignature] = useState(false);
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const phone = "2263456432";

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="m-3">
        {/* Header */}
        {/* <View className="flex-row items-center justify-between mb-5">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-JakartaSemiBold text-lg text-gray-900">
            Vehicle
          </Text>
          <View style={{ width: 24 }} />
        </View> */}

        {/* Customer Info */}
        <View className="mb-3 p-5 bg-white rounded-lg">
          <View className="flex flex-row items-center justify-between mb-5">
            <Text className="font-JakartaBold">Name:</Text>
            <Text className="text-black/70 font-Jakarta uppercase">
              WTH Car Rental ULC
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="font-JakartaBold">Phone:</Text>
            <Text className="text-black/70 font-Jakarta uppercase">
              {formatCanadianPhone(phone)}
            </Text>
          </View>
        </View>

        {/* Vehicle Info */}
        <View className="mb-3 p-5 bg-white rounded-lg">
          {[
            ["VIN", "AJ283241"],
            ["Make", "Mitsubishi"],
            ["Model", "Lancer EVO"],
            ["Year", "2015"],
          ].map(([label, value]) => (
            <View
              key={label}
              className="flex flex-row items-center justify-between mb-5"
            >
              <Text className="font-JakartaBold">{label}:</Text>
              <Text className="text-black/70 font-Jakarta">{value}</Text>
            </View>
          ))}
        </View>

        {/* Address */}
        <View className="mb-3 p-5 bg-white rounded-lg">
          <Text className="mb-2.5 font-JakartaBold">Pickup Address:</Text>
          <Text className="text-base text-black/70 font-Jakarta">
            196 Woodbine Ave, Kitchener, ON, N2R 1Y5
          </Text>
        </View>

        {/* Attachments */}
        <View className="p-5 bg-white rounded-lg mb-3">
          <Text className="font-JakartaBold mb-3">Attachments:</Text>
          <View className="flex-row items-center justify-between">
            <Text className="text-black/70">Release Form:</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`
                )
              }
              className="border-b border-orange-500"
            >
              <Text className="text-orange-500 font-JakartaBold uppercase text-sm">
                Download
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pictures */}
        <View className="mb-3 p-5 bg-white rounded-lg">
          <Text className="mb-2.5 font-JakartaBold">Pictures:</Text>

          <Pressable onPress={() => router.push("/camera-screen")}>
            <Ionicons name="camera-outline" size={40} color="black" />
          </Pressable>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between mt-3">
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${phone}`)}
            className="border bg-white border-orange-500 rounded-lg w-[48%] flex-row items-center justify-center py-3"
          >
            <MaterialIcons name="phone" size={20} color={"#FA7F35"} />
            <Text className="text-orange-500 ml-2 font-JakartaBold text-sm uppercase">
              Call Customer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-orange-500 rounded-lg w-[48%] flex-row items-center justify-center py-3"
            onPress={() => router.push("/signature")}
          >
            <FontAwesome name="hourglass-start" size={16} color="white" />
            <Text className="text-white ml-2 font-JakartaBold text-sm uppercase">
              {type === "PICKUP" ? "Pick Up" : "Drop Off"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Modal */}
        <Popup modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </View>
    </ScrollView>
  );
};

export default VehicleDetail;
