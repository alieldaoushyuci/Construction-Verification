import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AccountInfo() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account Information</Text>
            <Text style={styles.subtitle}>Email: john_doe</Text>
            <Text style={styles.subtitle}>Contractor Name: ABC DEF</Text>
            <Text style={styles.subtitle}>DBA: ABC DEF</Text>
            <Text style={styles.subtitle}>Contractor License: Verified/Unverified</Text>
            <Text style={styles.subtitle}>Forklift Certificate: Verified/Unverified</Text>
            <Text style={styles.subtitle}>Scissor Lift Certificate: Verified/Unverified</Text>
            <Text style={styles.subtitle}>OSHA Certificate: Verified/Unverified</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: '#000' },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 30, color: '#fff' },
    subtitle: { fontSize: 16, color: '#fff', marginBottom: 8, fontWeight: '500' },
});
