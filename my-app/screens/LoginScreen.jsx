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
import { supabase } from "../services/supabase";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    try {
      setIsLoading(true);
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();

      // Query Supabase for user with matching username and password
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", trimmedUsername)
        .eq("password", trimmedPassword)
        .single();

      if (error || !data) {
        console.log("✗ Invalid username or password");
        Alert.alert("Error", "Invalid username or password.");
      } else {
        console.log("✓ Login successful");
        Alert.alert("Success", `Welcome, ${data.username}!`);
        // TODO: Navigate to main app screen
        // You can store user data in state or context here
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!trimmedUsername || !trimmedPassword || !trimmedConfirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (trimmedPassword.length < 3) {
      Alert.alert("Error", "Password must be at least 3 characters long.");
      return;
    }

    try {
      setIsLoading(true);

      // Check if username already exists
      const { data: existingUser } = await supabase
        .from("users")
        .select("username")
        .eq("username", trimmedUsername)
        .single();

      if (existingUser) {
        Alert.alert(
          "Error",
          "Username already exists. Please choose a different username."
        );
        return;
      }

      // Insert new user into Supabase
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            username: trimmedUsername,
            password: trimmedPassword, // Note: In production, hash passwords!
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Sign up error:", error);
        Alert.alert("Error", "Failed to create account. Please try again.");
      } else {
        console.log("✓ New user created successfully");
        Alert.alert(
          "Success",
          "Account created successfully! You can now sign in."
        );
        // Switch to sign in mode
        setIsSignUp(false);
        setPassword("");
        setConfirmPassword("");
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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>

          {isSignUp && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                placeholderTextColor="#888"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
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
              setPassword("");
              setConfirmPassword("");
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
