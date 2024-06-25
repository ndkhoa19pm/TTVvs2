import React from "react";
import {
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from "react-native";
import {
  Button,
  Div,
  Icon,
  Input,
  Modal,
  ScrollDiv,
  Text,
} from "react-native-magnus";
import { APIKEY, clearCache, getCache, setCache } from "../../../cache";

export const ListLanguageDialog = ({ visible, onClose }) => {
  const windowWidth = Dimensions.get("window").width;
  const DATA_LANGUAGES = [
    { name: "Afrikaans", value: "af", checked: false },
    { name: "Arabic", value: "ar", checked: false },
    { name: "Azerbaijani", value: "az", checked: false },
    { name: "Belarusian", value: "be", checked: false },
    { name: "Bulgarian", value: "bg", checked: false },
    { name: "Bengali", value: "bn", checked: false },
    { name: "Bosnian", value: "bs", checked: false },
    { name: "Catalan", value: "ca", checked: false },
    { name: "Czech", value: "cs", checked: false },
    { name: "Welsh", value: "cy", checked: false },
    { name: "Danish", value: "da", checked: false },
    { name: "German", value: "de", checked: false },
    { name: "Greek", value: "el", checked: false },
    { name: "English", value: "en", checked: false },
    { name: "Spanish", value: "es", checked: false },
    { name: "Estonian", value: "et", checked: false },
    { name: "Basque", value: "eu", checked: false },
    { name: "Persian", value: "fa", checked: false },
    { name: "Finnish", value: "fi", checked: false },
    { name: "Filipino", value: "fil", checked: false },
    { name: "French", value: "fr", checked: false },
    { name: "Irish", value: "ga", checked: false },
    { name: "Galician", value: "gl", checked: false },
    { name: "Gujarati", value: "gu", checked: false },
    { name: "Hebrew", value: "he", checked: false },
    { name: "Hindi", value: "hi", checked: false },
    { name: "Croatian", value: "hr", checked: false },
    { name: "Hungarian", value: "hu", checked: false },
    { name: "Armenian", value: "hy", checked: false },
    { name: "Indonesian", value: "id", checked: false },
    { name: "Icelandic", value: "is", checked: false },
    { name: "Italian", value: "it", checked: false },
    { name: "Japanese", value: "ja", checked: false },
    { name: "Georgian", value: "ka", checked: false },
    { name: "Kazakh", value: "kk", checked: false },
    { name: "Khmer", value: "km", checked: false },
    { name: "Kannada", value: "kn", checked: false },
    { name: "Korean", value: "ko", checked: false },
    { name: "Lithuanian", value: "lt", checked: false },
    { name: "Latvian", value: "lv", checked: false },
    { name: "Macedonian", value: "mk", checked: false },
    { name: "Malayalam", value: "ml", checked: false },
    { name: "Mongolian", value: "mn", checked: false },
    { name: "Marathi", value: "mr", checked: false },
    { name: "Malay", value: "ms", checked: false },
    { name: "Burmese", value: "my", checked: false },
    { name: "Nepali", value: "ne", checked: false },
    { name: "Dutch", value: "nl", checked: false },
    { name: "Norwegian", value: "no", checked: false },
    { name: "Punjabi", value: "pa", checked: false },
    { name: "Polish", value: "pl", checked: false },
    { name: "Portuguese", value: "pt", checked: false },
    { name: "Romanian", value: "ro", checked: false },
    { name: "Russian", value: "ru", checked: false },
    { name: "Sinhala", value: "si", checked: false },
    { name: "Slovak", value: "sk", checked: false },
    { name: "Slovenian", value: "sl", checked: false },
    { name: "Albanian", value: "sq", checked: false },
    { name: "Serbian", value: "sr", checked: false },
    { name: "Swedish", value: "sv", checked: false },
    { name: "Vietnamese", value: "vi", checked: false },
    { name: "Swahili", value: "sw", checked: false },
    { name: "Tamil", value: "ta", checked: false },
    { name: "Telugu", value: "te", checked: false },
    { name: "Thai", value: "th", checked: false },
    { name: "Turkish", value: "tr", checked: false },
    { name: "Ukrainian", value: "uk", checked: false },
    { name: "Urdu", value: "ur", checked: false },
    { name: "Uzbek", value: "uz", checked: false },
    { name: "Chinese", value: "zh", checked: false },
  ];
  const [termLanguages, setTermLanguages] = React.useState("");
  const [languageSubtags, setLanguageSubtags] = React.useState(DATA_LANGUAGES);

  async function onCheckLanguages(data) {
    const updatedLanguages = languageSubtags.map((language) =>
      language.value === data.value
        ? { ...language, checked: true }
        : { ...language, checked: false }
    );
    setLanguageSubtags(updatedLanguages);

    await setCache(APIKEY.LANGUAGES, data);
    ToastAndroid.showWithGravity(
      "Thay đổi ngôn ngữ thành công",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }
  async function onSearchLanguages() {
    const filteredLanguages = DATA_LANGUAGES.filter((language) =>
      language.name.toLowerCase().includes(termLanguages?.toLowerCase())
    );
    if (filteredLanguages?.length > 0) {
      setLanguageSubtags(filteredLanguages);
    } else {
      setLanguageSubtags(DATA_LANGUAGES);
    }
  }
  React.useEffect(() => {
    if (visible) {
      async function fetchLanguages() {
        let response = await getCache(APIKEY.LANGUAGES);
        if (response != null) {
          const updatedLanguages = languageSubtags.map((language) =>
            language.value === response?.value
              ? { ...language, checked: true }
              : { ...language, checked: false }
          );
          setLanguageSubtags(updatedLanguages);
        } else {
          const updatedLanguages = languageSubtags.map((language) =>
            language.value === "vi"
              ? { ...language, checked: true }
              : { ...language, checked: false }
          );
          setLanguageSubtags(updatedLanguages);
        }
      }
      fetchLanguages();
    }
  }, [visible]);

  return (
    <KeyboardAvoidingView
      contentContainerStyle={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
    >
      <Modal isVisible={visible} h={"90%"}>
        <Div flex={1}>
          <Div style={{ display: "flex", justifyContent: "space-between" }} row>
            <Div>
              <Input
                w={windowWidth * 0.7}
                mt={12}
                ml={12}
                onChangeText={(value) => setTermLanguages(value)}
                onBlur={onSearchLanguages}
              />
            </Div>
            <Div>
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
          </Div>
          <Div top={12}>
            <ScrollDiv mb={100}>
              {languageSubtags.map((language) => {
                return (
                  <TouchableOpacity
                    key={language.value}
                    onPress={() => onCheckLanguages(language)}
                  >
                    <Div m={12} justifyContent="space-between" row>
                      <Text>{language.name}</Text>
                      {language.checked && (
                        <Icon
                          fontFamily="Ionicons"
                          name="checkmark-outline"
                          mr={12}
                        />
                      )}
                    </Div>
                  </TouchableOpacity>
                );
              })}
            </ScrollDiv>
          </Div>
        </Div>
      </Modal>
    </KeyboardAvoidingView>
  );
};
