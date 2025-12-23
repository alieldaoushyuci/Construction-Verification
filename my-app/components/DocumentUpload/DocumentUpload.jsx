import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import ImageUpload from './ImageUpload';

const DEFAULT_ITEMS = [
    {
        title: 'Contractor Name',
        description: 'Upload contractor information.',
        id: 1,
    },
    {
        title: 'DBA',
        description: 'Upload DBA information.',
        id: 2,
    },
    {
        title: 'Contractor License',
        description: 'Upload contractor license',
        id: 3,
        hasUpload: true,
    },
    {
        title: 'Forklift Certificate',
        description: 'Upload forklift certificate.',
        id: 4,
        hasUpload: true,
    },
    {
        title: 'Scissor Lift Certificate',
        description: 'Upload scissor lift certificate.',
        id: 5,
        hasUpload: true,
    },
    {
        title: 'OSHA Certificate',
        description: 'Upload OSHA certificate.',
        id: 6,
        hasUpload: true,
    }
];

export default function DocumentUpload({ items = DEFAULT_ITEMS }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(1));
    const [uploadStatuses, setUploadStatuses] = useState({}); // Track status per item ID

    // Get responsive width - use 100% of available width minus padding
    const windowWidth = Dimensions.get('window').width;
    const containerPadding = 16;
    const maxWidth = Math.min(windowWidth - containerPadding * 2, 800);

    const currentItem = items[activeIndex];

    const handleUploadStatusChange = (result) => {
        const { itemId, status, error } = result;
        setUploadStatuses(prev => ({
            ...prev,
            [itemId]: { status, error }
        }));
    };

    const handleNext = () => {
        if (activeIndex < items.length - 1) {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
            setActiveIndex(activeIndex + 1);
        }
    };

    const handlePrev = () => {
        if (activeIndex > 0) {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
            setActiveIndex(activeIndex - 1);
        }
    };

    const handleIndicatorPress = (index) => {
        if (index !== activeIndex) {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
            setActiveIndex(index);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Upload Documents</Text>

            <View style={[styles.itemContainer, { width: maxWidth }]}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{currentItem.title}</Text>
                </View>

                <Animated.View style={[styles.itemContent, { opacity: fadeAnim }]}>
                    <Text style={styles.itemDescription}>{currentItem.description}</Text>

                    {currentItem.hasUpload && (
                        <View style={styles.uploadContainer}>
                            <ImageUpload
                                uploadUrl="/upload"
                                itemId={currentItem.id}
                                status={uploadStatuses[currentItem.id]?.status}
                                error={uploadStatuses[currentItem.id]?.error}
                                onUploaded={handleUploadStatusChange}
                            />
                        </View>
                    )}
                </Animated.View>
            </View>

            <View style={styles.controlsContainer}>
                <TouchableOpacity
                    style={[styles.button, activeIndex === 0 && styles.buttonDisabled]}
                    onPress={handlePrev}
                    disabled={activeIndex === 0}
                >
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>

                <View style={styles.indicatorContainer}>
                    {items.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.indicator,
                                activeIndex === index && styles.indicatorActive
                            ]}
                            onPress={() => handleIndicatorPress(index)}
                        />
                    ))}
                </View>

                <TouchableOpacity
                    style={[styles.button, activeIndex === items.length - 1 && styles.buttonDisabled]}
                    onPress={handleNext}
                    disabled={activeIndex === items.length - 1}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#000',
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 24,
        color: '#fff',
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 16,
        backgroundColor: '#56545a',
        overflow: 'hidden',
        marginBottom: 24,
        alignSelf: 'center',
    },
    itemHeader: {
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#fff',
    },
    itemContent: {
        padding: 24,
    },
    itemDescription: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 16,
    },
    uploadContainer: {
        marginTop: 12,
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        paddingHorizontal: 16,
        paddingBottom: 16,
        flexWrap: 'wrap',
    },
    button: {
        paddingHorizontal: 24,
        paddingVertical: 14,
        backgroundColor: '#007aff',
        borderRadius: 8,
        minWidth: 100,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        opacity: 0.5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        gap: 8,
        flexWrap: 'wrap',
        minWidth: 100,
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#555',
    },
    indicatorActive: {
        backgroundColor: '#fff',
        width: 12,
        height: 12,
        borderRadius: 6,
    },
});
