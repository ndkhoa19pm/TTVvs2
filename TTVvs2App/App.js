import * as React from "react";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { NavigationContainer } from "@react-navigation/native";
import TabBottom from "./src/page/Dashboard/TabBottom";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-magnus";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PepoTheme } from "./src/PepoTheme";
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ThemeProvider theme={PepoTheme}>
          <StatusBar translucent backgroundColor="transparent" />
          <TabBottom />
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
AppRegistry.registerComponent(appName, () => Main);
