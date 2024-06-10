import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { VoiceScreen } from "../Component/VoiceScreen";
import { SettingScreen } from "../Component/SettingScreen";
import { FontAwesome } from "@expo/vector-icons";
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
            <FontAwesome name="book" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Cài đặt"
        component={SettingScreen}
        options={{
          tabBarLabel: "Cài đặt",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cog" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
