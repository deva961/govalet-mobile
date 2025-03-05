import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";

export type InputFieldProps = {
  label: string;
  icon?: React.ReactNode; // Icon as a React component
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
};

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  inputStyle,
  iconStyle,
  containerStyle,
  value,
  onChangeText,
  placeholder,
  autoCapitalize,
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg mb-3 font-JakartaSemiBold ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary/80 ${containerStyle}`}
          >
            {icon && (
              <View className={`w-6 h-6 ml-4 ${iconStyle}`}>{icon}</View>
            )}

            <TextInput
              secureTextEntry={secureTextEntry}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              autoCapitalize={autoCapitalize}
              clearButtonMode="while-editing"
              className={`rounded-full w-full p-4 font-JakartaSemiBold text-[15px] text-left ${inputStyle}`}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
