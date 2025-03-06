import { View, Text, FlatList, TouchableOpacity } from "react-native";

const DATA: ItemProps[] = [
  {
    id: "1",
    companyName: "WTH Car rental ulc",
    vin: "AJ283241",
    type: "PICKUP",
    address: "24 Jackson Ave, Kitchener, ON N2H 2N8",
  },
  {
    id: "2",
    companyName: "east gta compound",
    vin: "KA632881",
    type: "PICKUP",
    address: "196 Woodbine Ave, Kitchener, ON, N2R 1Y5",
  },
  {
    id: "3",
    companyName: "WTH Car rental ulc",
    vin: "AJ283241",
    type: "DROP-OFF",
    address: "24 Jackson Ave, Kitchener, ON N2H 2N8",
  },
];

type ItemProps = {
  id: string;
  companyName: string;
  vin: string;
  address: string;
  type: "PICKUP" | "DROP-OFF";
};

const Item = ({
  companyName,
  vin,
  type,
  address,
  index,
}: ItemProps & { index: number }) => (
  <View className="border border-gray-300 bg-white rounded-lg p-5 mb-2.5 shadow-md">
    <View className="flex flex-row items-center mb-1">
      <Text className="mr-2 font-medium text-gray-600">#{index + 1}</Text>
      <Text className="uppercase font-semibold text-orange-500">
        {companyName}
      </Text>
    </View>
    <View className="flex flex-row items-center mb-3">
      <Text className="font-Jakarta">Vin:</Text>
      <Text className="font-JakartaSemiBold uppercase">{vin}</Text>
    </View>
    <View className="bg-gray-100 p-4 rounded-lg mb-4">
      {/* <View className="mb-3">
        <Text className="text-gray-600 mb-1 font-JakartaMedium text-sm">
          Pickup
        </Text>
        <Text className="text-sm font-JakartaSemiBold text-gray-700">
          196 Woodbine Ave, Kitchener, ON, N2R 1Y5
        </Text>
      </View> */}

      <View>
        <Text className="text-gray-600 mb-1 font-JakartaMedium text-sm capitalize">
          {type}
        </Text>
        <Text className="text-gray-700 font-JakartaSemiBold">{address}</Text>
      </View>
    </View>
    <View className="flex flex-row justify-between mt-3">
      <TouchableOpacity
        className="border border-orange-500 rounded-lg w-[48%]  py-3 text-center"
        onPress={() => {}}
      >
        <Text className="text-center text-orange-500 font-JakartaBold">
          Copy VIN
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-orange-500 rounded-lg w-[48%] py-3 text-center"
        onPress={() => {}}
      >
        <Text className="text-white text-center font-JakartaBold">
          Navigate
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Home = () => {
  return (
    <View className="bg-white flex-1 p-4">
      <FlatList
        data={DATA}
        renderItem={({ item, index }) => (
          <Item
            id={item.id}
            index={index}
            companyName={item.companyName}
            vin={item.vin}
            type={item.type}
            address={item.address}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Home;
