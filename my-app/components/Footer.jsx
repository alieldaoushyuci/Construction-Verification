import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Footer({ onNavigate, currentRoute } = {}) {
  const links = [
    { label: "Account", path: "/AccountInfo" },
    { label: "Insurance", path: "/InsuranceSignIn" },
    { label: "Home", path: "/" },
    { label: "Upload", path: "/DocumentUpload" },
    { label: "Settings", path: "/Settings" },
  ];

  function handlePress(path) {
    if (onNavigate && typeof onNavigate === "function") {
      onNavigate(path);
    }
  }

  function isActive(path) {
    // Handle home route specially since it's '/'
    if (path === "/") {
      return currentRoute === "/" || !currentRoute;
    }
    return currentRoute === path;
  }

  return (
    <View style={styles.container}>
      {links.map((l) => {
        const active = isActive(l.path);
        return (
          <TouchableOpacity
            key={l.path}
            onPress={() => handlePress(l.path)}
            style={[styles.button, active && styles.buttonActive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>
              {l.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#333",
    backgroundColor: "#000",
  },
  button: { padding: 8, borderRadius: 8 },
  buttonActive: { backgroundColor: "#007aff20" }, // Subtle blue background
  text: { color: "#007aff", fontSize: 14 },
  textActive: { color: "#fff", fontWeight: "600" }, // White text and bold for active
});
