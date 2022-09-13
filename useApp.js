import { useEffect, useState } from "react";
import { PermissionsAndroid } from "react-native";

import {
  requestReadSMSPermission,
  startReadSMS,
} from "@maniac-tech/react-native-expo-read-sms";

const useApp = () => {
  const [appState, setAppState] = useState(null);
  const [hasReceiveSMSPermission, setHasReceiveSMSPermission] = useState(null);
  const [hasReadSMSPermission, setHasReadSMSPermission] = useState(null);
  const [smsPermissionState, setSmsPermissionState] = useState(null);
  const [successCallbackStatus, setSuccessCallbackStatus] = useState(null);
  const [errorCallbackStatus, setErrorCallbackStatus] = useState(null);
  const [smsValue, setSmsValue] = useState(null);
  const [smsError, setSMSError] = useState(null);

  const buttonClickHandler = () => {
    startReadSMS(callbackFn1, callbackFn2);
  };

  const callbackFn1 = (status, sms, error) => {
    setSmsPermissionState("Success Callback!");

    if (status === "Start Read SMS successfully") {
      setSuccessCallbackStatus("Start Read SMS successfully");
      setSmsValue(sms);
    } else if (status === "success") {
      setSuccessCallbackStatus("just success");
      setSmsValue(sms);
    } else {
      setSuccessCallbackStatus("Error in success callback");
      setSMSError(error);
    }
  };

  const callbackFn2 = (status, sms, error) => {
    setSmsPermissionState("Error Callback!");
    setErrorCallbackStatus("Start Read SMS failed");
  };

  const checkPermissions = async () => {
    const customHasReceiveSMSPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
    );
    const customHasReadSMSPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_SMS
    );

    setHasReceiveSMSPermission(customHasReceiveSMSPermission);
    setHasReadSMSPermission(customHasReadSMSPermission);
    setAppState("Permission check complete");
  };

  useEffect(() => {
    console.log("requestReadSMSPermission:", requestReadSMSPermission);
    setAppState("init");
    checkPermissions();
  }, []);

  useEffect(() => {
    if (hasReceiveSMSPermission && hasReadSMSPermission) {
    }
  }, [hasReceiveSMSPermission, hasReadSMSPermission]);

  return {
    appState,
    buttonClickHandler,
    checkPermissions,
    errorCallbackStatus,
    hasReceiveSMSPermission,
    hasReadSMSPermission,
    requestReadSMSPermission,
    smsPermissionState,
    successCallbackStatus,
    smsValue,
    smsError,
  };
};

export default useApp;
