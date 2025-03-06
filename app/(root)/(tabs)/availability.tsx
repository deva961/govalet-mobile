import React, { useState } from "react";
import { View, Text, Button, Modal, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"; // Expo's DateTimePicker
import { SafeAreaView } from "react-native-safe-area-context";

const activeColor = "#FA7F35";
const inactiveColor = "#475569";

interface BookingScreenProps {}

const BookingScreen: React.FC<BookingScreenProps> = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Type for selected date
  const [showTimePicker, setShowTimePicker] = useState<"start" | "end" | false>(
    false
  ); // Type for time picker state
  const [startTime, setStartTime] = useState<Date>(new Date()); // Type for start time
  const [endTime, setEndTime] = useState<Date>(new Date()); // Type for end time
  const [showModal, setShowModal] = useState<boolean>(false); // Type for modal visibility

  // Get the current date in the correct format for 'minDate' in the calendar
  const currentDate = new Date();
  // Set the time to 00:00:00 to ensure it's a full day without time constraints
  currentDate.setHours(0, 0, 0, 0);
  // Format the current date to 'yyyy-mm-dd'
  const formattedCurrentDate = currentDate.toISOString().split("T")[0]; // Format as 'yyyy-mm-dd'

  // Handle the date selection from the calendar
  const handleDateSelect = (date: { dateString: string }) => {
    setSelectedDate(date.dateString);
    setShowModal(true); // Show the modal to select time after picking the date
  };

  // Handle the booking submission
  const handleSubmitBooking = () => {
    if (!startTime || !endTime) {
      alert("Please select both start and end time!");
      return;
    }
    alert(
      `Booking confirmed for ${selectedDate} from ${startTime.toLocaleTimeString()} to ${endTime.toLocaleTimeString()}`
    );
    setShowModal(false); // Close the modal after booking
  };

  // Handle time selection
  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || new Date();
    if (showTimePicker === "start") {
      setStartTime(currentDate);
    } else {
      setEndTime(currentDate);
    }
    setShowTimePicker(false);
  };

  return (
    <View className="flex-1 m-5">
      {/* Calendar */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
        Select a Date to Book
      </Text>
      <Calendar
        style={{
          borderRadius: 20,
          overflow: "hidden", // To ensure the corners are rounded properly
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 1, // For Android shadow
        }}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: activeColor,
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#e5e7eb",
          dotColor: activeColor,
          selectedDotColor: "#ffffff",
          arrowColor: activeColor, // Customize arrows
          monthTextColor: activeColor, // Month name color
          textDayFontFamily: "Arial", // Customize font family
          textMonthFontFamily: "Arial", // Customize font family for month name
          textDayHeaderFontFamily: "Arial", // Customize font family for header
          textDayFontWeight: "bold", // Bold the day number
          textMonthFontWeight: "bold", // Bold the month name
          textDayFontSize: 14, // Day number font size
          textMonthFontSize: 18, // Month name font size
        }}
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate || ""]: { selected: true, selectedColor: activeColor },
        }}
        monthFormat={"MMMM yyyy"} // This ensures the month name is displayed fully
        minDate={formattedCurrentDate} // Disable previous dates
      />

      {/* Modal for Time Selection */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              Select Time Slot
            </Text>

            {/* Start Time Picker */}
            <Text>Start Time:</Text>
            <TouchableOpacity onPress={() => setShowTimePicker("start")}>
              <Text
                style={{
                  padding: 10,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              >
                {startTime.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>

            {/* End Time Picker */}
            <Text>End Time:</Text>
            <TouchableOpacity onPress={() => setShowTimePicker("end")}>
              <Text
                style={{
                  padding: 10,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              >
                {endTime.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>

            {/* Time picker modal */}
            {showTimePicker && (
              <DateTimePicker
                value={showTimePicker === "start" ? startTime : endTime}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}

            <Button title="Confirm Booking" onPress={handleSubmitBooking} />
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{ marginTop: 10 }}
            >
              <Text style={{ color: "blue" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BookingScreen;
