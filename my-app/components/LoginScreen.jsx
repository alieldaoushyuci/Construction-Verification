import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../services/supabase";

export default function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      setIsLoading(true);
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPassword = password.trim();

      // Use Supabase Auth to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (error) {
        console.log("✗ Invalid email or password");
        Alert.alert("Error", error.message || "Invalid email or password.");
      } else {
        console.log("✓ Login successful");

        let firstNameForWelcome = "";

        // Update last_accessed timestamp in profile and fetch first name
        if (data.user) {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .update({ last_accessed: new Date().toISOString() })
            .eq("id", data.user.id)
            .select("first_name")
            .single();

          if (profileError) {
            console.error(
              "Failed to update last_accessed or fetch profile:",
              profileError
            );
            // Don't fail login if this update fails
          } else if (profileData && profileData.first_name) {
            firstNameForWelcome = profileData.first_name;
          }
        }

        const nameOrEmail = firstNameForWelcome || data.user.email;
        Alert.alert("Success", `Welcome, ${nameOrEmail}!`);
        // Call the callback to notify parent component of successful login
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedConfirmPassword ||
      !trimmedFirstName ||
      !trimmedLastName
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (trimmedPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long.");
      return;
    }

    try {
      setIsLoading(true);

      // Use Supabase Auth to sign up
      // Password is automatically hashed by Supabase
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (error) {
        console.error("Sign up error:", error);
        Alert.alert(
          "Error",
          error.message || "Failed to create account. Please try again."
        );
      } else {
        console.log("✓ New user created successfully");

        // Update profile with first_name and last_name
        // The trigger already created the profile with id and email
        if (data.user) {
          const { error: profileError } = await supabase
            .from("profiles")
            .update({
              first_name: trimmedFirstName,
              last_name: trimmedLastName,
            })
            .eq("id", data.user.id);

          if (profileError) {
            console.error("Profile update error:", profileError);
            Alert.alert(
              "Warning",
              "Account created but failed to save name. You can update it later in settings."
            );
          }
        }

        // Check if email confirmation is required
        if (data.user && !data.session) {
          Alert.alert(
            "Success",
            "Account created! Please check your email to verify your account."
          );
        } else {
          Alert.alert(
            "Success",
            "Account created successfully! You can now sign in."
          );
          // If session exists, user is automatically logged in
          if (data.session && onLoginSuccess) {
            onLoginSuccess();
          }
        }

        // Switch to sign in mode
        setIsSignUp(false);
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setLastName("");
      }
    } catch (error) {
      console.error("Sign up error:", error);
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
          <Text style={styles.title}>{isSignUp ? "Sign Up" : "Sign In"}</Text>

          {isSignUp && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your first name"
                  placeholderTextColor="#888"
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your last name"
                  placeholderTextColor="#888"
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>
            </>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#888"
                />
              </TouchableOpacity>
            </View>
          </View>

          {isSignUp && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordInputContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm your password"
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
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={isSignUp ? handleSignUp : handleLogin}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => {
              setIsSignUp(!isSignUp);
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              setFirstName("");
              setLastName("");
              setShowPassword(false);
              setShowConfirmPassword(false);
            }}
            disabled={isLoading}
          >
            <Text style={styles.switchButtonText}>
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 16,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    color: "#fff",
    fontSize: 16,
  },
  eyeIcon: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    maxWidth: 400,
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  switchButton: {
    marginTop: 20,
    padding: 10,
  },
  switchButtonText: {
    color: "#007AFF",
    fontSize: 16,
    textAlign: "center",
  },
});
