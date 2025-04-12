import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { API_URL, useAuth } from "@/context/AuthContext";
import axios from "axios";
import {
  Alert,
  FlatList,
  Platform,
  RefreshControl,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ItemProps = {
  id: string;
  vehicleName: string;
  vin: string;
  pickupAddress: string;
  dropOffAddress: string;
  type: "PICKUP" | "DROP-OFF";
  status: "PICKUP" | "DROP-OFF" | "TRANSIT" | "COMPLETED";
};

const Item = ({
  vehicleName,
  vin,
  type,
  pickupAddress,
  dropOffAddress,
  index,
  status,
  id,
}: ItemProps & { index: number }) => {
  const copyToClipboard = async (vin: string) => {
    try {
      await Clipboard.setStringAsync(vin);
    } catch (error) {
      Alert.alert("Clipboard Error", "Something went wrong.");
    }
  };

  const router = useRouter();

  const handleCompanyNamePress = (id: string) => {
    router.push(`/vehicles/${id}`);
  };

  const openDirections = async (destinationAddress: string) => {
    const encodedAddress = encodeURIComponent(destinationAddress);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

    try {
      const supported = await Linking.canOpenURL(mapsUrl);
      if (supported) {
        await Linking.openURL(mapsUrl);
      } else {
        Alert.alert("Error", "Maps app not supported.");
      }
    } catch (error) {
      console.error("Error opening maps:", error);
      Alert.alert(
        "Error",
        "Something went wrong while trying to open the map."
      );
    }
  };

  return (
    <View className="border border-gray-300 bg-white rounded-lg p-5 mb-2.5">
      <View className="flex flex-row items-center justify-between mb-3 w-full">
        <TouchableWithoutFeedback onPress={() => handleCompanyNamePress(id)}>
          <View className="flex flex-row items-center justify-between">
            <Text className="mr-2 font-medium text-gray-600">#{index + 1}</Text>
            <Text
              numberOfLines={2}
              className="uppercase font-semibold text-orange-500 text-wrap"
            >
              {vehicleName}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View className="flex flex-row items-center justify-between mb-3">
        <View className="flex flex-row items-center ">
          <Text className="font-Jakarta mr-1">VIN:</Text>

          <TouchableOpacity onLongPress={() => copyToClipboard(vin)}>
            <Text className="font-JakartaSemiBold uppercase">{vin}</Text>
          </TouchableOpacity>
        </View>

        <View>
          {status && (
            <Text
              className={`${
                status === "PICKUP" &&
                "bg-orange-200/30 text-orange-700 border-orange-200/20"
              } ${
                status === "DROP-OFF" &&
                "bg-purple-200/30 text-purple-700 border-purple-200/20"
              } ${
                status === "TRANSIT" &&
                "bg-blue-200/30 text-blue-700 border-blue-200/20"
              } 
            ${
              status === "COMPLETED" &&
              "bg-green-200/30 text-green-700 border-green-200/20"
            } rounded-full px-2.5 py-0.5 text-xs font-JakartaSemiBold capitalize text-center`}
            >
              {status}
            </Text>
          )}
        </View>
      </View>
      <View className="bg-gray-100 p-4 rounded-lg mb-2">
        <View className="mb-5">
          <Text className="text-gray-600 mb-1 font-JakartaMedium text-sm capitalize">
            Pickup
          </Text>
          <Text className="text-gray-700 font-JakartaSemiBold">
            {pickupAddress}
          </Text>
        </View>

        <View>
          <Text className="text-gray-600 mb-1 font-JakartaMedium text-sm capitalize">
            Drop Off
          </Text>
          <Text className="text-gray-700 font-JakartaSemiBold">
            {dropOffAddress}
          </Text>
        </View>
      </View>
      <View className="flex flex-row justify-between mt-2">
        <TouchableOpacity
          onPress={() => {
            const url = `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`;
            Linking.openURL(url);
          }}
          className="border border-orange-500 rounded-lg w-[48%] flex items-center justify-center flex-row py-3 text-center"
        >
          <Ionicons name="document-outline" size={20} color={"#FA7F35"} />
          <Text className="text-center text-orange-500 ml-1.5 font-JakartaBold text-sm uppercase">
            Release Form
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-orange-500 rounded-lg w-[48%] flex items-center justify-center flex-row py-3"
          onPress={() => openDirections("24 Jackson Ave, Kitchener")}
        >
          <MaterialIcons name="directions" size={24} color="white" />
          <Text className="text-white text-center ml-1.5 font-JakartaBold uppercase text-sm">
            Directions
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [vehiclesData, setVehiclesData] = useState<any[]>([]); // State to store fetched data

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/vehicles`);
      setVehiclesData(res.data.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Something went wrong!");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    fetchData();
  };

  const { user } = useAuth();

  return (
    <SafeAreaView className="bg-white p-4">
      <View className="flex items-center justify-between w-full flex-row">
        <View>
          <View className="flex items-center flex-row">
            <Text className="text-sm font-JakartaMedium text-gray-600 mr-0.5">
              Welcome
            </Text>
            <MaterialIcons name="waving-hand" size={20} color="#f9d263" />
          </View>
          <Text className="font-JakartaBold text-primary">{user?.name}</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Fontisto name="bell" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <Text className="font-JakartaExtraBold text-lg mt-5">Routes</Text>
      <FlatList
        className="mt-2.5"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: Platform.OS === "ios" ? 40 : 80,
        }}
        data={vehiclesData}
        renderItem={({ item, index }) => (
          <Item
            id={item.id}
            index={index}
            vehicleName={`${item.year} ${item.make} ${item.model}`}
            vin={item.vin}
            type={item.serviceType}
            pickupAddress={item.pickupCompany?.address}
            dropOffAddress={item.dropoffCompany?.address}
            status={item.serviceType}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Home;
