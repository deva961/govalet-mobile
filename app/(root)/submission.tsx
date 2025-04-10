import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  StyleSheet,
  Button,
} from "react-native";

const MAX_IMAGES = 10;

const Submission = () => {
  const cameraRef = useRef<CameraView | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [images, setImages] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const takePhoto = async () => {
    if (cameraRef.current && images.length < MAX_IMAGES) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo?.uri) {
        setImages([...images, photo.uri]);
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need camera permission</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <CameraView
        ref={cameraRef}
        facing={facing}
        ratio="4:3"
        style={{ flex: 1 }}
      >
        <View style={styles.controls}>
          <TouchableOpacity onPress={toggleCameraFacing} style={styles.flipBtn}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>

          {images.length < MAX_IMAGES && (
            <TouchableOpacity onPress={takePhoto} style={styles.captureBtn} />
          )}
        </View>
      </CameraView>

      {/* Gallery */}
      {images.length > 0 && (
        <View className="absolute bottom-0 left-0 right-0 bg-black p-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {images.map((img, idx) => (
              <TouchableOpacity key={idx} onPress={() => setPreviewImage(img)}>
                <Image
                  source={{ uri: img }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 8,
                    marginRight: 8,
                    borderWidth: 2,
                    borderColor: "orange",
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text className="text-white text-center mt-2">
            {images.length}/{MAX_IMAGES} Captured
          </Text>
        </View>
      )}

      {/* Fullscreen Image Preview */}
      <Modal visible={!!previewImage} transparent>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={() => setPreviewImage(null)}
            style={styles.closeBtn}
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: previewImage ?? "" }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />

          {/* Delete and Retake Buttons */}
          <View style={styles.previewActions}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: "red" }]}
              onPress={() => {
                setImages(images.filter((img) => img !== previewImage)); // Remove from images array
                setPreviewImage(null); // Close the preview modal
              }}
            >
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: "orange" }]}
              onPress={() => {
                setImages(images.filter((img) => img !== previewImage)); // Remove the image
                setPreviewImage(null); // Close the preview modal
              }}
            >
              <Text style={styles.actionText}>Retake</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "flex-end",
    backgroundColor: "transparent",
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 4,
    alignSelf: "center",
  },
  flipBtn: {
    backgroundColor: "#00000070",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  modalView: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  closeText: {
    fontSize: 32,
    color: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  previewActions: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 30,
  },
  actionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Submission;
