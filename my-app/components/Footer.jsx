import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

// Footer component
// Props - onNavigate(path) optional callback (e.g. navigation.navigate)
export default function Footer({ onNavigate } = {}) {
    const links = [
        { label: 'Account', path: '/AccountInfo' },
        { label: 'Insurance', path: '/InsuranceSignIn' },
        { label: 'Upload', path: '/DocumentUpload' },
        { label: 'Settings', path: '/Settings' },
    ];

    function handlePress(path) {
        if (onNavigate && typeof onNavigate === 'function') {
            onNavigate(path);
            return;
        }

        if (Platform.OS === 'web') {
            window.location.assign(path);
            return;
        }

        // Fallback: console log the path so developers can wire navigation
        console.log('Navigate to', path);
    }

    // Render anchors on web for proper right-click / open-in-new-tab behavior
    if (Platform.OS === 'web') {
        return (
            <View style={styles.container}>
                {links.map((l) => (
                    <a key={l.path} href={l.path} style={webStyles.link}>
                        {l.label}
                    </a>
                ))}
            </View>
        );
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
    container: { flexDirection: 'row', justifyContent: 'space-around', padding: 12, borderTopWidth: 1, borderColor: '#eee' },
    button: { padding: 8 },
    text: { color: '#007aff', fontSize: 14 },
});

const webStyles = {
    link: {
        color: '#007aff',
        textDecoration: 'none',
        padding: 8,
        fontSize: 14,
    },
};
