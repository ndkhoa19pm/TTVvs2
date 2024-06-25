import * as React from "react";
import {
  Button,
  Div,
  Fab,
  Icon,
  Modal,
  Overlay,
  Text,
} from "react-native-magnus";
import { DivBody } from "../Div";
import * as Speech from "expo-speech";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ToastAndroid,
} from "react-native";
import InputText from "../InputText";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Share } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import {
  OnChangeFileToText,
  OnConvertTextToFileSound,
} from "../../../api/DashBoardService";
import { APIKEY, getCache } from "../../../cache";
export const VoiceScreen = ({ navigation }) => {
  const [language, setLanguages] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isRun, setIsRun] = React.useState(false);
  const [overlayVisible, setOverlayVisible] = React.useState(false);
  const [segments, setSegments] = React.useState([]);
  const [currentSegmentIndex, setCurrentSegmentIndex] = React.useState(0);

  const speak = async () => {
    let numbers = 0;
    try {
      if (content.length == 0) {
        return;
      }
      setOverlayVisible(true);
      setIsRun(true);
      const newSegments = content
        .split(".")
        .map((segment) => segment.trim())
        .filter((segment) => segment !== "");
      const formattedArray = newSegments?.map((segment, index) => ({
        content: segment,
        number: index + 1,
      }));
      setSegments(formattedArray);
      // đọc
      // Create an array of promises for each segment
      const speakPromises = formattedArray.map((context) => {
        return new Promise((resolve, reject) => {
          Speech.speak(context.content, {
            language: language,
            onStart: () => {
              setOverlayVisible(false);
              numbers = context.number;
              setCurrentSegmentIndex(context.number);
            },
            onStopped: () => {
              resolve();
            },
            onError: () => {
              setOverlayVisible(false);
              reject();
              setIsRun(false);
            },
            onDone: () => {
              resolve();
            },
          });
        });
      });
      // Wait for all promises to resolve
      await Promise.all(speakPromises);
    } catch (error) {
      ToastAndroid.showWithGravity(
        "Đã gặp lỗi, Vui lòng phát lại đoạn văn bản này!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      setIsRun(false);
    } finally {
      if (numbers == segments.length) {
        setIsRun(false);
        setOverlayVisible(false);
      }
    }
  };
  const stopSpeak = () => {
    Speech.stop();
    setCurrentSegmentIndex(0);
    setIsRun(false);
  };

  const speakSegment = (index) => {
    if (index < 0 || index >= segments.length) {
      setIsRun(false);
      return;
    }
    Speech.speak(segments[index].content, {
      onStart: () => {
        setIsRun(true);
        setCurrentSegmentIndex(index);
      },
      onDone: () => {
        const nextIndex = index + 1;
        if (nextIndex < segments.length) {
          speakSegment(nextIndex);
        } else {
          setIsRun(false);
        }
      },
      onError: () => {
        setOverlayVisible(false);
        setIsRun(false);
      },
    });
  };
  const handleStepForward = async () => {
    if (currentSegmentIndex < segments?.length - 1) {
      Speech.stop();
      speakSegment(currentSegmentIndex + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentSegmentIndex > 0) {
      Speech.stop();
      speakSegment(currentSegmentIndex - 1);
    }
  };

  const onReadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "text/plain"],
      });
      if (result.canceled === false) {
        let fileType = "application/pdf"; // Loại tệp mặc định
        if (
          result.assets[0].mimeType === "text/plain" ||
          result.assets[0].uri.endsWith(".txt")
        ) {
          fileType = "text/plain";
        }

        const formData = new FormData();
        formData.append("file", {
          uri: result.assets[0].uri,
          type: fileType, // Đặt loại tệp tương ứng
          name: "file." + (fileType === "application/pdf" ? "pdf" : "txt"),
        });
        // Gửi dữ liệu tệp lên server
        let response = await OnChangeFileToText(formData);
        if (response.success) {
          ToastAndroid.showWithGravity(
            response.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          setContent(response.data);
        } else {
          ToastAndroid.showWithGravity(
            response.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
        // Bạn có thể sử dụng result.uri để làm gì đó với tệp đã chọn.
      } else {
        console.log("Người dùng đã hủy việc chọn tệp.");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  // hàm dùng để chia sẻ
  const onShareContent = async () => {
    try {
      await Share.share({
        message: content,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  // hàm dùng để lưu file
  const onSaveFile = async () => {
    try {
      if (content?.length === 0) {
        ToastAndroid.showWithGravity(
          "Vui lòng nhập văn bản",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        return;
      }
      let response = await OnConvertTextToFileSound({
        description: content,
        outPutPath: "outPut.wav",
      });
      if (response.success) {
        const fileUri = FileSystem.documentDirectory + "outPut.wav";
        const { uri: localUri } = await FileSystem.downloadAsync(
          response.data,
          fileUri
        );
        await Sharing.shareAsync(localUri);
      } else {
        ToastAndroid.showWithGravity(
          response.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const createTwoButtonAlert = () =>
    Alert.alert("Xoá văn bản", "Bạn có chắc chắn xoá văn bản", [
      {
        text: "Huỷ",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: () => {
          stopSpeak();
          setContent("");
        },
      },
    ]);
  const fetchLanguages = async () => {
    try {
      let response = await getCache(APIKEY.LANGUAGES);
      if (response != null) {
        setLanguages(response.value);
      } else {
        setLanguages("vi");
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchLanguages);
    return unsubscribe;
  }, [navigation]);
  return (
    <DivBody>
      {/* Phần header */}
      <Div
        p="sm"
        rounded="md"
        borderWidth={1}
        borderColor="gray300"
        row
        justifyContent="space-around"
      >
        <Button
          bg="primary"
          h={40}
          w={40}
          rounded="circle"
          onPress={handleStepBackward}
        >
          <Icon fontFamily="Ionicons" name="play-skip-back" color="white" />
        </Button>
        <Button
          bg={isRun ? "#6200ee" : "white"}
          h={40}
          w={40}
          rounded="circle"
          borderWidth={1}
          borderColor="#6200ee"
          onPress={() => (isRun ? stopSpeak() : speak())}
        >
          <Icon
            fontFamily="Ionicons"
            name={isRun ? "pause" : "play"}
            color={isRun ? "white" : "#6200ee"}
          />
        </Button>
        <Button
          bg="#6200ee"
          h={40}
          w={40}
          rounded="circle"
          onPress={handleStepForward}
        >
          <Icon fontFamily="Ionicons" name="play-skip-forward" color="white" />
        </Button>
      </Div>
      {/* Thẻ nhập dữ liệu */}
      <InputText
        value={content}
        onChangeText={(e) => {
          setContent(e);
        }}
      />
      {/* thẻ fap */}

      <Fab bg="#6200ee" h={50} w={50} fontSize={14}>
        <Button
          p="none"
          bg="transparent"
          justifyContent="flex-end"
          onPress={onReadFile}
        >
          <Div rounded="sm" bg="white" p="sm">
            <Text fontSize="md">Tập tin</Text>
          </Div>
          <Icon
            fontFamily="Ionicons"
            name="document-text-outline"
            color="blue600"
            h={50}
            w={50}
            rounded="circle"
            ml="md"
            bg="white"
          />
        </Button>
        <Button
          p="none"
          bg="transparent"
          justifyContent="flex-end"
          onPress={onShareContent}
        >
          <Div rounded="sm" bg="white" p="sm">
            <Text fontSize="md">Chia sẻ</Text>
          </Div>
          <Icon
            fontFamily="Ionicons"
            name="share-social-outline"
            color="blue600"
            h={50}
            w={50}
            rounded="circle"
            ml="md"
            bg="white"
          />
        </Button>
        <Button
          p="none"
          bg="transparent"
          justifyContent="flex-end"
          ml={20}
          onPress={onSaveFile}
        >
          <Div rounded="sm" bg="white" p="sm">
            <Text fontSize="md">Lưu</Text>
          </Div>
          <Icon
            fontFamily="Ionicons"
            name="cloud-download-outline"
            color="blue600"
            h={50}
            w={50}
            rounded="circle"
            ml="md"
            bg="white"
          />
        </Button>
        <Button
          p="none"
          bg="transparent"
          justifyContent="flex-end"
          ml={20}
          onPress={createTwoButtonAlert}
        >
          <Div rounded="sm" bg="white" p="sm">
            <Text fontSize="md">Xoá</Text>
          </Div>
          <Icon
            fontFamily="Ionicons"
            name="trash-outline"
            color="blue600"
            h={50}
            w={50}
            rounded="circle"
            ml="md"
            bg="white"
          />
        </Button>
      </Fab>
      {/* phần overlay */}
      <Overlay visible={overlayVisible} p="xl">
        <ActivityIndicator />
        <Text mt="md" textAlign="center">
          Đang tải...
        </Text>
      </Overlay>
    </DivBody>
  );
};
