import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  const { user } = useAuth();
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-7xl font-JakartaExtraBold text-primary">404!</Text>
      <Text className="text-2xl font-JakartaSemiBold ">Page Not Found</Text>
      <Link
        href={user ? "/home" : "/"}
        className="mt-10 font-JakartaBold uppercase bg-primary rounded-full px-10 py-2.5 text-white"
      >
        Go Home
      </Link>
    </SafeAreaView>
  );
}
