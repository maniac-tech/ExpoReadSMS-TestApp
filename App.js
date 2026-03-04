import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  startReadSMS,
  stopReadSMS,
  checkIfHasSMSPermission,
  requestReadSMSPermission,
} from "@maniac-tech/react-native-expo-read-sms";

export default function App() {
  const [logs, setLogs] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);

  const addLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [{ message, type, timestamp }, ...prev]);
  };

  // ─── Test: checkIfHasSMSPermission ──────────────────────────────────────────
  const handleCheckPermission = async () => {
    addLog("Checking SMS permissions...");
    try {
      const result = await checkIfHasSMSPermission();
      setPermissionStatus(result);
      addLog(
        `READ_SMS: ${result.hasReadSmsPermission}, RECEIVE_SMS: ${result.hasReceiveSmsPermission}`,
        result.hasReadSmsPermission && result.hasReceiveSmsPermission
          ? "success"
          : "warning"
      );
    } catch (e) {
      addLog(`Error checking permission: ${e.message}`, "error");
    }
  };

  // ─── Test: requestReadSMSPermission ─────────────────────────────────────────
  const handleRequestPermission = async () => {
    addLog("Requesting SMS permissions...");
    try {
      const granted = await requestReadSMSPermission();
      addLog(
        granted ? "Permissions granted ✓" : "Permissions denied ✗",
        granted ? "success" : "error"
      );
      // Refresh permission status after request
      await handleCheckPermission();
    } catch (e) {
      addLog(`Error requesting permission: ${e.message}`, "error");
    }
  };

  // ─── Test: startReadSMS ──────────────────────────────────────────────────────
  const handleStartListening = async () => {
    addLog("Starting SMS listener...");
    try {
      await startReadSMS((status, sms, error) => {
        if (status === "success") {
          addLog(`SMS received: ${sms}`, "success");
          setIsListening(true);
        } else {
          addLog(`SMS listener error: ${error}`, "error");
          setIsListening(false);
        }
      });
      setIsListening(true);
      addLog("SMS listener started — send an SMS to test ✓", "success");
    } catch (e) {
      addLog(`Failed to start listener: ${e.message}`, "error");
    }
  };

  // ─── Test: stopReadSMS ───────────────────────────────────────────────────────
  const handleStopListening = () => {
    addLog("Stopping SMS listener...");
    try {
      stopReadSMS();
      setIsListening(false);
      addLog("SMS listener stopped ✓", "success");
    } catch (e) {
      addLog(`Failed to stop listener: ${e.message}`, "error");
    }
  };

  const clearLogs = () => setLogs([]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={styles.title}>ExpoReadSMS TestApp</Text>
        <Text style={styles.subtitle}>SDK 51 · RN 0.74 · Library v9.1.0</Text>
        <View style={[styles.badge, isListening ? styles.badgeActive : styles.badgeInactive]}>
          <Text style={styles.badgeText}>
            {isListening ? "● Listening" : "○ Not Listening"}
          </Text>
        </View>
      </View>

      <View style={styles.buttonGrid}>
        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleCheckPermission}>
          <Text style={styles.buttonText}>Check Permission</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleRequestPermission}>
          <Text style={styles.buttonText}>Request Permission</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary, isListening && styles.buttonDisabled]}
          onPress={handleStartListening}
          disabled={isListening}
        >
          <Text style={styles.buttonText}>Start Listening</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonDanger, !isListening && styles.buttonDisabled]}
          onPress={handleStopListening}
          disabled={!isListening}
        >
          <Text style={styles.buttonText}>Stop Listening</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logsHeader}>
        <Text style={styles.logsTitle}>Logs</Text>
        <TouchableOpacity onPress={clearLogs}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.logsContainer}>
        {logs.length === 0 && (
          <Text style={styles.emptyLogs}>Tap a button above to begin testing.</Text>
        )}
        {logs.map((log, index) => (
          <View key={index} style={[styles.logEntry, styles[`log_${log.type}`]]}>
            <Text style={styles.logTime}>{log.timestamp}</Text>
            <Text style={styles.logMessage}>{log.message}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { padding: 20, backgroundColor: "#fff", alignItems: "center", borderBottomWidth: 1, borderBottomColor: "#e0e0e0" },
  title: { fontSize: 20, fontWeight: "bold", color: "#1a1a1a" },
  subtitle: { fontSize: 13, color: "#666", marginTop: 4 },
  badge: { marginTop: 10, paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20 },
  badgeActive: { backgroundColor: "#d4edda" },
  badgeInactive: { backgroundColor: "#f8d7da" },
  badgeText: { fontSize: 13, fontWeight: "600" },
  buttonGrid: { flexDirection: "row", flexWrap: "wrap", padding: 12, gap: 8 },
  button: { flex: 1, minWidth: "45%", padding: 14, borderRadius: 10, alignItems: "center" },
  buttonPrimary: { backgroundColor: "#007AFF" },
  buttonSecondary: { backgroundColor: "#5856D6" },
  buttonDanger: { backgroundColor: "#FF3B30" },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  logsHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 8, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#e0e0e0" },
  logsTitle: { fontSize: 15, fontWeight: "600" },
  clearText: { fontSize: 14, color: "#007AFF" },
  logsContainer: { flex: 1, padding: 12 },
  emptyLogs: { color: "#999", textAlign: "center", marginTop: 40, fontSize: 14 },
  logEntry: { padding: 10, marginBottom: 8, borderRadius: 8, borderLeftWidth: 4 },
  log_info: { backgroundColor: "#e8f4f8", borderLeftColor: "#007AFF" },
  log_success: { backgroundColor: "#d4edda", borderLeftColor: "#28a745" },
  log_warning: { backgroundColor: "#fff3cd", borderLeftColor: "#ffc107" },
  log_error: { backgroundColor: "#f8d7da", borderLeftColor: "#dc3545" },
  logTime: { fontSize: 11, color: "#888", marginBottom: 2 },
  logMessage: { fontSize: 13, color: "#1a1a1a" },
});
