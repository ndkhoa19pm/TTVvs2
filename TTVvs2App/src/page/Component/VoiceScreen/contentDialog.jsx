import React from "react";
import { useWindowDimensions, Dimensions } from "react-native";
import { Button, Div, Icon, Modal } from "react-native-magnus";
import Html from "react-native-html-component";
export const ContentDialog = ({ visible, onClose, source }) => {
  const windowHeight = Dimensions.get("window").height;

  return (
    <Modal isVisible={visible} h={windowHeight * 0.9}>
      <Div>
        <Div style={{ display: "flex", justifyContent: "flex-end" }} row>
          <Button
            bg="gray400"
            h={35}
            w={35}
            right={12}
            top={12}
            rounded="circle"
            onPress={() => onClose(false)}
          >
            <Icon color="black900" name="close" />
          </Button>
        </Div>
        <Div top={12}>
          <Html html={source} />
        </Div>
      </Div>
    </Modal>
  );
};
