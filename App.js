import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  Button,
  DataTable,
  Title,
  Provider as PaperProvider,
  Divider,
} from "react-native-paper";

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
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Permission Status</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>READ_SMS:</DataTable.Cell>
        <DataTable.Cell>
          {READ_SMS_PERMISSION_STATUS + "" || "null"}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>RECEIVE_SMS:</DataTable.Cell>
        <DataTable.Cell>
          {RECEIVE_SMS_PERMISSION_STATUS + "" || "null"}
        </DataTable.Cell>
      </DataTable.Row>

      {(!READ_SMS_PERMISSION_STATUS || !RECEIVE_SMS_PERMISSION_STATUS) && (
        <Button onPress={requestReadSMSPermission} mode="contained">
          Request Permission
        </Button>
      )}
    </DataTable>
  );
};

export default function App() {
  const {
    appState,
    buttonClickHandler,
    checkPermissions,
    errorCallbackStatus,
    hasReceiveSMSPermission,
    hasReadSMSPermission,
    requestReadSMSPermission,
    smsPermissionState,
    successCallbackStatus,
    smsMessageBody,
    smsMessageNumber,
    smsError,
  } = useApp();

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Title>ExpoReadSMS - Test Application (Expo)</Title>

        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>App State:</DataTable.Cell>
            <DataTable.Cell>{appState}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <Divider />
        <PermissionStatus
          READ_SMS_PERMISSION_STATUS={hasReadSMSPermission}
          RECEIVE_SMS_PERMISSION_STATUS={hasReceiveSMSPermission}
          requestReadSMSPermission={requestReadSMSPermission}
        />
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>smsPermissionState:</Text>
            </DataTable.Cell>
            <DataTable.Cell>{smsPermissionState + "" || "null"}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>smsMessageNumber:</Text>
            </DataTable.Cell>
            <DataTable.Cell>{smsMessageNumber + "" || "null"}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>smsMessageBody:</Text>
            </DataTable.Cell>
            <DataTable.Cell>{smsMessageBody + "" || "null"}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>smsError:</Text>
            </DataTable.Cell>
            <DataTable.Cell>{smsError + "" || "null"}</DataTable.Cell>
          </DataTable.Row>

          <Button onPress={checkPermissions} title="start" mode="contained">
            Recheck permission state
          </Button>
          <Button onPress={buttonClickHandler} title="start" mode="contained">
            Start
          </Button>
        </DataTable>
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
