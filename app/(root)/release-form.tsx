// app/release-form.tsx
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

export default function ReleaseForm() {
  const { url } = useLocalSearchParams();

  if (!url) return <ActivityIndicator />;

  return <WebView source={{ uri: url as string }} style={{ flex: 1 }} />;
}
