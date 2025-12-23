import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../services/supabase";

export default function AccountInfo() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Only fetch if we haven't fetched yet
    if (!hasFetched.current) {
      fetchProfile();
      hasFetched.current = true;
    }
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);

      // Get the current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Error getting user:", userError);
        setIsLoading(false);
        return;
      }

      // Fetch profile data
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, email")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else if (data) {
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setEmail(data.email || user.email || "");
      }
    } catch (error) {
      console.error("Error in fetchProfile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Account Information</Text>

        <Text style={styles.subtitle}>
          First Name: {firstName || "Not set"}
        </Text>
        <Text style={styles.subtitle}>Last Name: {lastName || "Not set"}</Text>
        <Text style={styles.subtitle}>Email: {email || "Not set"}</Text>

        <Text style={styles.subtitle}>Contractor Name: ABC DEF</Text>
        <Text style={styles.subtitle}>DBA: ABC DEF</Text>
        <Text style={styles.subtitle}>
          Contractor License: Verified/Unverified
        </Text>
        <Text style={styles.subtitle}>
          Forklift Certificate: Verified/Unverified
        </Text>
        <Text style={styles.subtitle}>
          Scissor Lift Certificate: Verified/Unverified
        </Text>
        <Text style={styles.subtitle}>
          OSHA Certificate: Verified/Unverified
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
    fontWeight: "500",
  },
});
