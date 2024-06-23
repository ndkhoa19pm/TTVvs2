import { Dimensions } from "react-native";
import { Button, Div, Icon, Modal } from "react-native-magnus";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

export const ContentDialog = ({ visible, onClose }) => {
  const windowHeight = Dimensions.get("window").height;
  const source = {
    html: `
  <p style='text-align:left; margin: 4px'>
    Hello World!
  </p>`,
  };
  return (
    <Modal isVisible={visible} h={windowHeight * 0.9}>
      <Div>
        <Div>
          <Button
            bg="gray400"
            h={35}
            w={35}
            position="absolute"
            top={10}
            right={15}
            rounded="circle"
            onPress={() => {
              onClose(false);
            }}
          >
            <Icon color="black900" name="close" />
          </Button>
        </Div>
        <Div>{/* <RenderHtml source={source} /> */}</Div>
      </Div>
    </Modal>
  );
};
