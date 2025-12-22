import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageUpload({ uploadUrl = '/upload', onUploaded } = {}) {
    const inputRef = useRef(null);
    const [status, setStatus] = useState('idle'); // 'idle' | 'uploading' | 'success' | 'error'
    const [error, setError] = useState(null);

    const openPicker = async (e) => {
        if (e) {
            e.stopPropagation?.();
        }
        if (Platform.OS === 'web') {
            inputRef.current?.click();
        } else {
            // Native: Use expo-image-picker
            try {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ['images'],
                    allowsEditing: false,
                    quality: 1,
                });

                if (!result.canceled && result.assets && result.assets[0]) {
                    const asset = result.assets[0];
                    await uploadImage(asset.uri, asset.type || 'image/jpeg');
                }
            } catch (err) {
                setError(err.message || 'Failed to open image picker');
                setStatus('error');
            }
        }
    };

    const uploadImage = async (uri, mimeType) => {
        setStatus('uploading');
        setError(null);

        try {
            const formData = new FormData();
            const fileName = uri.split('/').pop() || 'image.jpg';

            formData.append('image', {
                uri,
                name: fileName,
                type: mimeType,
            });

            const res = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) throw new Error(data.message || `Upload failed (${res.status})`);

            setStatus('success');
            if (typeof onUploaded === 'function') onUploaded(data);
        } catch (err) {
            setError(err.message || 'Upload error');
            setStatus('error');
        }
    };

    const handleChange = async (e) => {
        e.stopPropagation?.();
        const file = e.target?.files?.[0];
        if (!file) return;

        await uploadImage(file);
    };

    const uploadImage = async (fileOrUri, mimeType) => {
        setStatus('uploading');
        setError(null);

        try {
            const formData = new FormData();

            if (typeof fileOrUri === 'string') {
                // Native path - fileOrUri is a URI string
                const fileName = fileOrUri.split('/').pop() || 'image.jpg';
                formData.append('image', {
                    uri: fileOrUri,
                    name: fileName,
                    type: mimeType || 'image/jpeg',
                });
            } else {
                // Web path - fileOrUri is a File object
                formData.append('image', fileOrUri);
            }

            const res = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) throw new Error(data.message || `Upload failed (${res.status})`);

            setStatus('success');
            if (typeof onUploaded === 'function') onUploaded(data);
        } catch (err) {
            setError(err.message || 'Upload error');
            setStatus('error');
        }
    };

    if (Platform.OS === 'web') {
        return (
            <div className="image-upload" onPointerDown={(e) => e.stopPropagation()}>
                <input
                    ref={inputRef}
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleChange}
                />

                <button type="button" className="upload-button" onClick={openPicker}>
                    {status === 'uploading' ? 'Uploading...' : 'Upload Image'}
                </button>

                {status === 'success' && <div className="upload-success">Upload successful</div>}
                {status === 'error' && <div className="upload-error">Error: {error}</div>}
            </div>
        );
    }

    // Native (iOS/Android) version
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, status === 'uploading' && styles.buttonDisabled]}
                onPress={openPicker}
                disabled={status === 'uploading'}
            >
                <Text style={styles.buttonText}>
                    {status === 'uploading' ? 'Uploading...' : 'Upload Image'}
                </Text>
            </TouchableOpacity>

            {status === 'success' && (
                <Text style={styles.successText}>Upload successful</Text>
            )}
            {status === 'error' && (
                <Text style={styles.errorText}>Error: {error}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 8,
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#007aff',
        borderRadius: 8,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    successText: {
        color: '#4caf50',
        fontSize: 12,
        fontWeight: '500',
    },
    errorText: {
        color: '#f44336',
        fontSize: 12,
        fontWeight: '500',
    },
});