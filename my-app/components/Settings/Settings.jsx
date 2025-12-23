import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../services/supabase";
import styles from "./Settings.styles";

export default function Settings() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleChangeEmail = async () => {
    const trimmedCurrentEmail = currentEmail.trim();
    const trimmedNewEmail = newEmail.trim();
    const trimmedConfirmEmail = confirmEmail.trim();

    // Validation
    if (
      !trimmedCurrentEmail ||
      !trimmedNewEmail ||
      !trimmedConfirmEmail
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (trimmedNewEmail !== trimmedConfirmEmail) {
      Alert.alert("Error", "New emails do not match.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedNewEmail)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (trimmedCurrentEmail === trimmedNewEmail) {
      Alert.alert(
        "Error",
        "New email must be different from current email."
      );
      return;
    }

    try {
      setIsLoadingEmail(true);

      // Get the current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user || !user.email) {
        Alert.alert("Error", "Unable to retrieve user information.");
        return;
      }

      // Verify current email matches
      if (user.email.toLowerCase() !== trimmedCurrentEmail.toLowerCase()) {
        Alert.alert("Error", "Current email does not match your account email.");
        return;
      }

      // Update email
      const { error: updateError } = await supabase.auth.updateUser({
        email: trimmedNewEmail,
      });

      if (updateError) {
        Alert.alert(
          "Error",
          updateError.message || "Failed to update email. Please try again."
        );
      } else {
        Alert.alert("Success", "Email updated successfully! Please check your new email for verification.");
        // Clear form
        setCurrentEmail("");
        setNewEmail("");
        setConfirmEmail("");
      }
    } catch (error) {
      console.error("Change email error:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const handleChangePassword = async () => {
    const trimmedCurrentPassword = currentPassword.trim();
    const trimmedNewPassword = newPassword.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    // Validation
    if (
      !trimmedCurrentPassword ||
      !trimmedNewPassword ||
      !trimmedConfirmPassword
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (trimmedNewPassword !== trimmedConfirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }

    if (trimmedNewPassword.length < 6) {
      Alert.alert("Error", "New password must be at least 6 characters long.");
      return;
    }

    if (trimmedCurrentPassword === trimmedNewPassword) {
      Alert.alert(
        "Error",
        "New password must be different from current password."
      );
      return;
    }

    try {
      setIsLoading(true);

      // First, verify the current password by attempting to sign in
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || !user.email) {
        Alert.alert("Error", "Unable to retrieve user information.");
        return;
      }

      // Verify current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: trimmedCurrentPassword,
      });

      if (signInError) {
        Alert.alert("Error", "Current password is incorrect.");
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: trimmedNewPassword,
      });

      if (updateError) {
        Alert.alert(
          "Error",
          updateError.message || "Failed to update password. Please try again."
        );
      } else {
        Alert.alert("Success", "Password updated successfully!");
        // Clear form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Change password error:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Settings</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Change Email</Text>
            <Text style={styles.subtitle}>Requires 2 factor authentication (2FA)</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Current Email</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter current email"
                  placeholderTextColor="#888"
                  value={currentEmail}
                  onChangeText={setCurrentEmail}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  editable={!isLoadingEmail}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>New Email</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter new email"
                  placeholderTextColor="#888"
                  value={newEmail}
                  onChangeText={setNewEmail}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  editable={!isLoadingEmail}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm New Email</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm new email"
                  placeholderTextColor="#888"
                  value={confirmEmail}
                  onChangeText={setConfirmEmail}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  editable={!isLoadingEmail}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, isLoadingEmail && styles.buttonDisabled]}
              onPress={handleChangeEmail}
              activeOpacity={0.8}
              disabled={isLoadingEmail}
            >
              <Text style={styles.buttonText}>
                {isLoadingEmail ? "Updating..." : "Update Email"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Change Password</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Current Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter current password"
                  placeholderTextColor="#888"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry={!showCurrentPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  disabled={isLoading}
                >
                  <Ionicons
                    name={showCurrentPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>New Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter new password"
                  placeholderTextColor="#888"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showNewPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  disabled={isLoading}
                >
                  <Ionicons
                    name={showNewPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm New Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm new password"
                  placeholderTextColor="#888"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleChangePassword}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Updating..." : "Update Password"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
