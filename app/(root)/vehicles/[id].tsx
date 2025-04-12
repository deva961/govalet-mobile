import Popup from "@/components/popup";
import { API_URL } from "@/context/AuthContext";
import { formatCanadianPhone } from "@/utils/phone-formatter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Linking,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VehicleDetail = ({ type = "DROPOFF" }: { type: string }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true); // for first-time load
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [showSignature, setShowSignature] = useState<boolean>(false);

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [vehicleData, setVehicleData] = useState<any | null>(null);

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await axios.get(`${API_URL}/vehicles/${id}`);
      setVehicleData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const onRefresh = () => {
    fetchData(true); // pass true to trigger spinner
  };

  const phone = "2263456432";

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg font-JakartaBold">Loading...</Text>
      </SafeAreaView>
    );
  }

  const Header = () => (
    <SafeAreaView className="bg-primary">
      <View
        className={`${
          Platform.OS === "android" && "pb-5"
        } flex-row items-center justify-between px-4 `}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white font-JakartaBold text-lg">
          {`${vehicleData?.year} ${vehicleData?.make} ${vehicleData?.model}`}
        </Text>
        <View style={{ width: 24 }} />
      </View>
    </SafeAreaView>
  );

  return (
    <>
      {/* Header */}
      <Header />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
        }}
      >
        <View className="m-3">
          {/* Vehicle Info */}
          <View className="mb-3 p-5 bg-white rounded-lg">
            {[
              ["VIN", vehicleData?.vin ?? "—"],
              ["Make", vehicleData?.make ?? "—"],
              ["Model", vehicleData?.model ?? "—"],
              ["Year", vehicleData?.year ?? "—"],
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

          {/* Pickup Address */}
          <View className="mb-3 p-5 bg-white rounded-lg">
            <Text className="font-JakartaBold text-primary text-center text-lg">
              Pick Up
            </Text>
            <Text className="mb-2 font-JakartaBold">Name:</Text>
            <Text className="text-base text-black/70 font-Jakarta mb-5">
              {vehicleData?.pickupCompany?.name}
            </Text>

            <Text className="mb-2 font-JakartaBold">Phone:</Text>
            <Text className="text-base text-black/70 font-Jakarta mb-5">
              {vehicleData &&
                vehicleData.pickupCompany.phone &&
                formatCanadianPhone(vehicleData.pickupCompany.phone)}
            </Text>

            <Text className="mb-2 font-JakartaBold">Pickup Address:</Text>
            <Text className="text-base text-black/70 font-Jakarta">
              {vehicleData?.pickupCompany?.address}
            </Text>
          </View>

          {/* DropOff Address */}
          <View className="mb-3 p-5 bg-white rounded-lg">
            <Text className="font-JakartaBold text-center text-lg text-primary">
              Drop Off
            </Text>
            <Text className="mb-2 font-JakartaBold">Name:</Text>
            <Text className="text-base text-black/70 font-Jakarta mb-5">
              {vehicleData?.dropoffCompany?.name}
            </Text>

            <Text className="mb-2 font-JakartaBold">Phone:</Text>
            <Text className="text-base text-black/70 font-Jakarta mb-5">
              {vehicleData &&
                vehicleData.dropoffCompany.phone &&
                formatCanadianPhone(vehicleData.dropoffCompany.phone)}
            </Text>

            <Text className="mb-2 font-JakartaBold">Address:</Text>
            <Text className="text-base text-black/70 font-Jakarta">
              {vehicleData?.dropoffCompany?.address}
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
          <View className="flex-row justify-between">
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
      <StatusBar style="light" />
    </>
  );
};

export default VehicleDetail;
