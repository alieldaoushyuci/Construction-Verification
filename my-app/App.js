import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Footer from "./components/Footer";
import LoginScreen from "./components/LoginScreen";
import AccountInfo from "./components/AccountInfo";
import InsuranceSignIn from "./components/InsuranceSignIn";
import DocumentUpload from "./components/DocumentUpload/DocumentUpload";
import Settings from "./components/Settings";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import { supabase } from "./services/supabase";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState("/");

  // Check for existing session on mount and listen for auth changes
  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  function renderContent() {
    switch (route) {
      case "/AccountInfo":
        return <AccountInfo />;
      case "/InsuranceSignIn":
        return <InsuranceSignIn />;
      case "/DocumentUpload":
        return <DocumentUpload />;
      case "/Settings":
        return <Settings />;
      default:
        return (
          <HomeScreen
            onNavigate={(path) => {
              setRoute(path);
            }}
          />
        );
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <StatusBar style="light" />
        </View>
      </SafeAreaProvider>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />
          <StatusBar style="light" />
        </View>
      </SafeAreaProvider>
    );
  }

  // Show main app with footer if authenticated
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        {renderContent()}

        <Footer
          onNavigate={(path) => {
            setRoute(path);
          }}
        />

        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  safe: { flex: 1, backgroundColor: "#000" },
});
