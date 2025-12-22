import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DocumentUpload() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Document Upload</Text>
            <Text style={styles.subtitle}>Skeleton document upload page.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: '#000' },
    title: { fontSize: 20, fontWeight: '600', marginBottom: 8, color: '#fff' },
    subtitle: { fontSize: 14, color: '#ccc' },
});
