import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import useApp from "./useApp";

const PermissionStatus = ({
  READ_SMS_PERMISSION_STATUS,
  RECEIVE_SMS_PERMISSION_STATUS,
  requestReadSMSPermission,
}) => {
  console.log(
    "READ_SMS_PERMISSION_STATUS, RECEIVE_SMS_PERMISSION_STATUS:",
    READ_SMS_PERMISSION_STATUS,
    RECEIVE_SMS_PERMISSION_STATUS
  );
  return (
    <>
      <Text>READ_SMS:{READ_SMS_PERMISSION_STATUS + "" || "null"}</Text>
      <Text>RECEIVE_SMS:{RECEIVE_SMS_PERMISSION_STATUS + "" || "null"}</Text>
      {(!READ_SMS_PERMISSION_STATUS || !RECEIVE_SMS_PERMISSION_STATUS) && (
        <Button onPress={requestReadSMSPermission} title="Request Permission" />
      )}
    </>
  );
};

export default function App() {
  const {
    appState,
    buttonClickHandler,
    errorCallbackStatus,
    hasReceiveSMSPermission,
    hasReadSMSPermission,
    requestReadSMSPermission,
    smsPermissionState,
    successCallbackStatus,
    smsValue,
    smsError,
  } = useApp();

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>ExpoReadSMS - Test Application (Expo)</Text>
        <Text>App State:{appState}</Text>
        <PermissionStatus
          READ_SMS_PERMISSION_STATUS={hasReadSMSPermission}
          RECEIVE_SMS_PERMISSION_STATUS={hasReceiveSMSPermission}
          requestReadSMSPermission={requestReadSMSPermission}
        />
        <Text>smsPermissionState:{smsPermissionState + "" || "null"}</Text>
        <Text>smsValue:{smsValue + "" || "null"}</Text>
        <Text>smsError:{smsError + "" || "null"}</Text>
        <Button onPress={buttonClickHandler} title="start" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
