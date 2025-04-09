import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";

export default function PDFViewer() {
  const [pdfUri, setPdfUri] = useState<string | null>(null);

  useEffect(() => {
    const downloadPDF = async () => {
      const uri =
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
      const localUri = FileSystem.documentDirectory + "dummy.pdf";
      await FileSystem.downloadAsync(uri, localUri);
      setPdfUri(localUri);
    };

    downloadPDF();
  }, []);

  if (!pdfUri) {
    return <ActivityIndicator />;
  }

  return <WebView source={{ uri: pdfUri }} style={{ flex: 1 }} />;
}
