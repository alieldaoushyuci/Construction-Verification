import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Footer({ onNavigate } = {}) {
    const links = [
        { label: 'Account', path: '/AccountInfo' },
        { label: 'Insurance', path: '/InsuranceSignIn' },
        { label: 'Home', path: '/' },
        { label: 'Upload', path: '/DocumentUpload' },
        { label: 'Settings', path: '/Settings' },
    ];

    function handlePress(path) {
        if (onNavigate && typeof onNavigate === 'function') {
            onNavigate(path);
        }
    }

    return (
        <View style={styles.container}>
            {links.map((l) => (
                <TouchableOpacity key={l.path} onPress={() => handlePress(l.path)} style={styles.button}>
                    <Text style={styles.text}>{l.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', justifyContent: 'space-around', padding: 12, borderTopWidth: 1, borderColor: '#333', backgroundColor: '#000' },
    button: { padding: 8 },
    text: { color: '#007aff', fontSize: 14 },
});
