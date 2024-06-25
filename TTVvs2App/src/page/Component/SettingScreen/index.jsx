import * as React from "react";
import { Button, Div, Icon, Modal, Text, Toggle } from "react-native-magnus";
import { DivBody } from "../Div";
import { storeData } from "../../../storage/asysStorage";
import {
  Alert,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { ListLanguageDialog } from "./listLanguageDialog";
import { clearCache } from "../../../cache";

export const SettingScreen = () => {
  const windowHeight = Dimensions.get("window").height;

  const [on, toggle] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  async function onHandleLanguage() {
    await storeData();
  }

  const createTwoButtonAlert = () =>
    Alert.alert("Xoá dữ liệu", "Bạn có chắc chắn xoá dữ liệu cache không?", [
      {
        text: "Huỷ",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          await clearCache();
          ToastAndroid.showWithGravity(
            "Xoá dữ liệu cache thành công!",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        },
      },
    ]);
  return (
    <DivBody>
      <Div mt={12} mr={12} ml={12} mb={6}>
        <Text fontWeight="700" fontSize={18}>
          Hệ thống
        </Text>
      </Div>
      <Div m={12}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Div row mb={12}>
            <Icon
              fontFamily="Ionicons"
              name="megaphone-outline"
              fontSize={24}
              color="#6200ee"
            />
            <Div ml={12}>
              <Text>Cài đặt dữ liệu giọng nói tts</Text>
              <Text opacity={0.5}>Để sử dụng ngoại tuyến</Text>
            </Div>
          </Div>
        </TouchableOpacity>
        {/* <Div row justifyContent="space-between" mb={12}>
          <Div row>
            <Icon
              fontFamily="Ionicons"
              name="person-outline"
              fontSize={24}
              color="#6200ee"
            />
            <Div ml={12}>
              <Text>Sử dụng giọng nói nam nếu có</Text>
              <Text opacity={0.5}>Mặc định là giọng nữ</Text>
            </Div>
          </Div>
          <Toggle
            on={on}
            onPress={() => toggle(!on)}
            bg="gray200"
            circleBg="#6200ee"
            activeBg="#6200ee"
            h={30}
            w={60}
          />
        </Div> */}
        <TouchableOpacity onPress={createTwoButtonAlert}>
          <Div row justifyContent="space-between">
            <Div row>
              <Icon
                fontFamily="Ionicons"
                name="trash-bin-outline"
                fontSize={24}
                color="#6200ee"
              />
              <Div ml={12}>
                <Text>Xoá dữ liệu</Text>
                <Text opacity={0.5}>Nhấn vào để xoá Cache</Text>
              </Div>
            </Div>
          </Div>
        </TouchableOpacity>
      </Div>
      {visible && (
        <ListLanguageDialog
          visible={visible}
          onClose={() => setVisible(false)}
        />
      )}
    </DivBody>
  );
};
