import React from "react";
import { TextInput } from "react-native-paper";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

const InputField: React.FC<Props> = ({ label, value, onChangeText, secureTextEntry }) => (
  <TextInput
    label={label}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    mode="outlined"
    style={{ marginBottom: 12 }}
  />
);

export default InputField;
