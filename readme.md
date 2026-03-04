# ExpoReadSMS-TestApp

Example application for [@maniac-tech/react-native-expo-read-sms](https://github.com/maniac-tech/react-native-expo-read-sms).

Use this app to verify the library works correctly on your target Expo SDK version.

## SDK Compatibility

| Expo SDK | React Native | Branch |
|----------|-------------|--------|
| 51       | 0.74        | [sdk-51](../../tree/sdk-51) |
| 52       | 0.76        | [sdk-52](../../tree/sdk-52) |
| 53       | 0.79        | [sdk-53](../../tree/sdk-53) |
| 54       | 0.81        | [sdk-54](../../tree/sdk-54) |

## Getting Started

1. Switch to the branch for your Expo SDK version
2. Install dependencies:
```bash
   npm install
```
3. Prebuild the Android project:
```bash
   npx expo prebuild --clean --platform android
```
4. Connect an Android device or start an emulator, then run:
```bash
   npm run android
```

## Requirements

- Android device or emulator
- Android Studio (for Android SDK and Java)
- `JAVA_HOME` and `ANDROID_HOME` environment variables set

## Related

- [Library Repository](https://github.com/maniac-tech/react-native-expo-read-sms)
- [Documentation](https://maniac-tech.com/expo-read-sms/)