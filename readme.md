# ExpoReadSMS-TestApp — SDK 51 Branch

Verification branch for `@maniac-tech/react-native-expo-read-sms` on **Expo SDK 51**.

| Property | Value |
|----------|-------|
| Expo SDK | ~51.0.0 |
| React Native | 0.74.5 |
| Library version | ^9.1.0 |
| New Architecture | Optional (off by default for existing projects) |
| Android targetSdk | 34 |

## Setup

```bash
git checkout sdk-51
npm install
npx expo prebuild --platform android --clean
npx expo run:android
```

> **Note:** This library requires a **development build** — it cannot run in Expo Go because it uses a custom native Android module.

## Verification Checklist

Test each method and mark as pass/fail before updating the support matrix.

- [ ] App builds without errors (`npx expo prebuild` succeeds)
- [ ] App launches on device/emulator
- [ ] `checkIfHasSMSPermission()` — returns correct `{ hasReadSmsPermission, hasReceiveSmsPermission }` object
- [ ] `requestReadSMSPermission()` — system permission dialog appears; returns `true` when granted
- [ ] `startReadSMS(callback)` — starts without error; `status === "success"` in callback
- [ ] Incoming SMS received — callback fires with correct `[phoneNumber, messageBody]` format
- [ ] `stopReadSMS()` — stops listener; no further callbacks fired after stopping
- [ ] No `NativeEventEmitter` warnings in console

## Result

<!-- Fill in after testing -->
**Status:** ⬜ Pending  
**Tested by:**  
**Test date:**  
**Device/Emulator:**  
**Notes:**  
