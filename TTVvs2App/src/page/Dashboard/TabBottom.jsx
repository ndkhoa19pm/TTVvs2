import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { VoiceScreen } from "../Component/VoiceScreen";
import { SettingScreen } from "../Component/SettingScreen";
import { Icon } from "react-native-magnus";
export default function TabBottom() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Đọc"
      activeColor="#6200ee"
      inactiveColor="#858585"
      barStyle={{ backgroundColor: "#ffffff" }}
    >
      <Tab.Screen
        name="Đọc"
        component={VoiceScreen}
        options={{
          tabBarLabel: "Đọc",
          tabBarIcon: ({ color }) => (
            <Icon
              fontFamily="Ionicons"
              name="volume-high"
              color={color}
              fontSize={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cài đặt"
        component={SettingScreen}
        options={{
          tabBarLabel: "Cài đặt",
          tabBarIcon: ({ color }) => (
            <Icon
              fontFamily="Ionicons"
              name="flower"
              color={color}
              fontSize={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
