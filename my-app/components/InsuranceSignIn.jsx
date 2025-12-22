import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function InsuranceSignIn() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Insurance Sign In</Text>
            <Text style={styles.subtitle}>Skeleton insurance sign-in page.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
    title: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
    subtitle: { fontSize: 14, color: '#666' },
});
