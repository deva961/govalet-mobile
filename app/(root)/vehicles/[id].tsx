import Popup from "@/components/popup";
import { API_URL } from "@/context/AuthContext";
import { formatCanadianPhone } from "@/utils/phone-formatter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  ActivityIndicator,
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

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex flex-row items-center justify-between mb-5">
    <Text className="font-JakartaBold">{label}:</Text>
    <Text className="text-black/70 font-Jakarta">{value || "—"}</Text>
  </View>
);

const AttachmentRow = ({ label, url }: { label: string; url: string }) => (
  <View className="flex-row items-center justify-between mb-3">
    <Text className="text-black/70">{label}</Text>
    <TouchableOpacity
      onPress={() => Linking.openURL(url)}
      className="border-b border-orange-500"
    >
      <Text className="text-orange-500 font-JakartaBold uppercase text-sm">
        Download
      </Text>
    </TouchableOpacity>
  </View>
);

const SectionCard = ({ children }: { children: React.ReactNode }) => (
  <View className="p-5 bg-white rounded-lg mb-3">{children}</View>
);

const SkeletonCard = () => (
  <View className="p-5 bg-white rounded-lg mb-3">
    <View className="h-5 bg-gray-200 rounded mb-4" />
    <View className="h-5 bg-gray-200 rounded mb-4" />
    <View className="h-5 bg-gray-200 rounded mb-4" />
  </View>
);

const VehicleDetail = ({ type }: { type: string }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [vehicleData, setVehicleData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { id } = useLocalSearchParams();
  const router = useRouter();

  const fetchData = useCallback(
    async (isRefresh = false) => {
      isRefresh ? setRefreshing(true) : setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/vehicles/${id}`);
        setVehicleData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch vehicle data:", err);
      } finally {
        isRefresh ? setRefreshing(false) : setLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const onRefresh = () => fetchData(true);

  const isPickup = vehicleData?.serviceType === "PICKUP";
  const contactCompany = isPickup
    ? vehicleData?.pickupCompany
    : vehicleData?.dropoffCompany;

  const renderContactSection = useMemo(
    () => (
      <SectionCard>
        <Text className="font-JakartaBold text-primary text-center text-lg">
          {isPickup ? "Pick Up" : "Drop Off"}
        </Text>
        <Text className="mb-2 mt-4 font-JakartaBold">Name:</Text>
        <Text className="text-base text-black/70 font-Jakarta mb-5">
          {contactCompany?.name || "—"}
        </Text>
        <Text className="mb-2 font-JakartaBold">Phone:</Text>
        <Text className="text-base text-black/70 font-Jakarta mb-5">
          {contactCompany?.phone && formatCanadianPhone(contactCompany.phone)}
        </Text>
        <Text className="mb-2 font-JakartaBold">Address:</Text>
        <Text className="text-base text-black/70 font-Jakarta mb-5">
          {contactCompany?.address || "—"}
        </Text>
        {isPickup && (
          <>
            <Text className="mb-2 font-JakartaBold">Signature:</Text>
            <Pressable
              onPress={() => setModalOpen(true)}
              className="w-16 h-16 items-center justify-center bg-gray-100 rounded-lg"
            >
              <FontAwesome6 name="pen-to-square" size={20} color="black" />
            </Pressable>
          </>
        )}
      </SectionCard>
    ),
    [contactCompany, isPickup]
  );

  return (
    <>
      <SafeAreaView className="bg-primary">
        <View
          className={`flex-row items-center justify-between px-4 ${
            Platform.OS === "android" ? "pb-5" : ""
          }`}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white font-JakartaBold text-lg text-center flex-1 ml-4">
            {vehicleData?.year} {vehicleData?.make} {vehicleData?.model}
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </SafeAreaView>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <View className="m-3">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <SectionCard>
                <InfoRow label="VIN" value={vehicleData?.vin} />
                <InfoRow label="Make" value={vehicleData?.make} />
                <InfoRow label="Model" value={vehicleData?.model} />
                <InfoRow label="Year" value={vehicleData?.year} />
              </SectionCard>

              {renderContactSection}

              <SectionCard>
                <Text className="font-JakartaBold mb-3">Attachments:</Text>
                <AttachmentRow
                  label="Release Form"
                  url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                />
              </SectionCard>

              <SectionCard>
                <Text className="mb-2.5 font-JakartaBold">Pictures:</Text>
                <Pressable
                  onPress={() => router.push("/camera-screen")}
                  className="w-20 h-20 items-center justify-center bg-gray-100 rounded-lg"
                >
                  <Ionicons name="camera-outline" size={40} color="black" />
                </Pressable>
              </SectionCard>

              <View className="flex-row justify-between mt-4">
                <TouchableOpacity
                  onPress={() =>
                    contactCompany?.phone &&
                    Linking.openURL(`tel:${contactCompany.phone}`)
                  }
                  className="border bg-white border-orange-500 rounded-lg w-[48%] flex-row items-center justify-center py-3"
                >
                  <MaterialIcons name="phone" size={20} color={"#FA7F35"} />
                  <Text className="text-orange-500 ml-2 font-JakartaBold text-sm uppercase">
                    Call Customer
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {}}
                  className="bg-orange-500 rounded-lg w-[48%] flex-row items-center justify-center py-3"
                >
                  <FontAwesome name="hourglass-start" size={16} color="white" />
                  <Text className="text-white ml-2 font-JakartaBold text-sm uppercase">
                    {isPickup ? "Pick Up" : "Drop Off"}
                  </Text>
                </TouchableOpacity>
              </View>

              <Popup modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </>
          )}
        </View>
      </ScrollView>

      <StatusBar style="light" />
    </>
  );
};

export default VehicleDetail;
