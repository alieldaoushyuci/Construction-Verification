import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AccountInfo() {
    return (
        <View style={styles.container}>
            <h1>Account Information</h1>
            <p style={styles.subtitle}>Email: john_doe</p>
            <p style={styles.subtitle}>Contractor Name: ABC DEF</p>
            <p style={styles.subtitle}>DBA: ABC DEF</p>
            <p style={styles.subtitle}>Contractor License: Verified/Unverified</p>
            <p style={styles.subtitle}>Forklift Certificate: Verified/Unverified</p>
            <p style={styles.subtitle}>Scissor Lift Certificate: Verified/Unverified</p>
            <p style={styles.subtitle}>OSHA Certificate: Verified/Unverified</p>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: '#000' },
    title: { fontSize: 20, fontWeight: '600', marginBottom: 8, color: '#fff' },
    subtitle: { fontSize: 14, color: '#ccc' },
});
