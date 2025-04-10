import React from "react";
import {
  Alert,
  GestureResponderEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type PopupProps = {
  modalOpen: boolean;
  setModalOpen: (visible: boolean) => void;
  title?: string;
  message?: string;
  onClose?: (event?: GestureResponderEvent) => void;
};

const Popup = ({
  modalOpen,
  setModalOpen,
  title = "Notice",
  message = "Hello World!",
  onClose,
}: PopupProps) => {
  const handleClose = (event?: GestureResponderEvent) => {
    setModalOpen(false);
    onClose?.(event);
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalOpen}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        handleClose();
      }}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.modalContainer} onPress={() => {}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <Pressable style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    minWidth: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Popup;
