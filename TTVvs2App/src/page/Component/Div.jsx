import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export const DivBody = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[style.container, { paddingTop: insets.top }]}>
      {children}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
  },
});
