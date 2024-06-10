import { Input } from "react-native-magnus";

export default InputText = ({ value, onChangeText }) => {
  return (
    <Input
      flex={1}
      mt={4}
      p="sm"
      rounded="md"
      borderWidth={1}
      borderColor="gray300"
      multiline={true}
      alignSelf="flex-start"
      value={value}
      onChangeText={onChangeText}
    />
  );
};
