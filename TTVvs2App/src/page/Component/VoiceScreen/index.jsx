import * as React from "react";
import { Button, Div, Icon, Input, Overlay, Text } from "react-native-magnus";
import { DivBody } from "../Div";
import * as Speech from "expo-speech";
import { ActivityIndicator, ToastAndroid } from "react-native";
import InputText from "../InputText";
export const VoiceScreen = () => {
  const [content, setContent] = React.useState("");
  const [isRun, setIsRun] = React.useState(false);
  const [overlayVisible, setOverlayVisible] = React.useState(false);
  const [segments, setSegments] = React.useState([]);
  const [currentSegmentIndex, setCurrentSegmentIndex] = React.useState(0);
  const updateSegments = (text) => {
    const newSegments = text
      .split(".")
      .map((segment) => segment.trim())
      .filter((segment) => segment !== "");
    setSegments(newSegments);
    setCurrentSegmentIndex(0);
  };
  console.log("isrun", isRun);
  const speak = async () => {
    try {
      if (!isRun) {
        setOverlayVisible(true);
      }
      setIsRun(true);
      const newSegments = content
        .split(".")
        .map((segment) => segment.trim())
        .filter((segment) => segment !== "");
      // Create an array of promises for each segment
      const speakPromises = newSegments.map((context) => {
        return new Promise((resolve, reject) => {
          Speech.speak(context, {
            onStart: () => {
              setOverlayVisible(false);
            },
            onStopped: () => {
              console.log("123");
              setCurrentSegmentIndex((prevIndex) => prevIndex + 1);
              resolve();
            },
            onError: () => {
              setOverlayVisible(false);
              reject();
            },
            onDone: () => {
              setCurrentSegmentIndex((prevIndex) => prevIndex + 1);
              resolve();
            },
          });
        });
      });
      // Wait for all promises to resolve
      await Promise.all(speakPromises);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsRun(false);
    }
  };
  const stopSpeak = () => {
    Speech.stop();
    setCurrentSegmentIndex(0);
  };
  const handleStepForward = async () => {
    // Speech.stop();
    if (currentSegmentIndex < segments.length - 1) {
    }
  };

  const handleStepBackward = () => {
    if (currentSegmentIndex > 0) {
      const newIndex = currentSegmentIndex - 1;
      setCurrentSegmentIndex(newIndex);
      speak(newIndex);
    }
  };
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
          <Icon name="stepbackward" color="white" />
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
            name={isRun ? "pause" : "caretright"}
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
          <Icon name="stepforward" color="white" />
        </Button>
      </Div>
      {/* Thẻ nhập dữ liệu */}
      <InputText
        value={content}
        onChangeText={(e) => {
          setContent(e);
          updateSegments(e);
        }}
      />
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
