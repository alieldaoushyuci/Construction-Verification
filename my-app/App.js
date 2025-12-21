import React, { useState, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import Footer from './components/Footer';
import AccountInfo from './components/AccountInfo';
import InsuranceSignIn from './components/InsuranceSignIn';
import DocumentUpload from './components/DocumentUpload/DocumentUpload';
import Settings from './components/Settings';

export default function App() {
  const [route, setRoute] = useState('/');

  const currentPath = useMemo(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return route || '/';
  }, [route]);

  function renderContent() {
    switch (currentPath) {
      case '/AccountInfo':
        return <AccountInfo />;
      case '/InsuranceSignIn':
        return <InsuranceSignIn />;
      case '/DocumentUpload':
        return (
          <View style={styles.center}>
            <DocumentUpload baseWidth={500} />
          </View>
        );
      case '/Settings':
        return <Settings />;
      default:
        return (
          <View style={styles.content}>
            <Text style={styles.title}>Home Page</Text>
            <Text style={styles.subtitle}>Welcome — use the footer links to navigate.</Text>
          </View>
        );
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>

      <Footer onNavigate={(path) => {
        if (Platform.OS === 'web' && typeof window !== 'undefined') {
          window.history.pushState({}, '', path);
          setRoute((r) => r);
          return;
        }
        setRoute(path);
      }} />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { flex: 1, overflow: 'auto' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#444' },
});
