import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
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

export default function DocumentUpload({ items = DEFAULT_ITEMS, baseWidth = 300 }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(1));

    const currentItem = items[activeIndex];

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
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Upload Documents</Text>

            <View style={[styles.itemContainer, { width: baseWidth }]}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{currentItem.title}</Text>
                </View>

                <Animated.View style={[styles.itemContent, { opacity: fadeAnim }]}>
                    <Text style={styles.itemDescription}>{currentItem.description}</Text>

                    {currentItem.hasUpload && (
                        <View style={styles.uploadContainer}>
                            <ImageUpload
                                uploadUrl="/upload"
                                onUploaded={(data) => console.log(data)}
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
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
        color: '#000',
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 12,
        backgroundColor: '#56545a',
        overflow: 'hidden',
        marginBottom: 16,
    },
    itemHeader: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#fff',
    },
    itemContent: {
        padding: 16,
    },
    itemDescription: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 12,
    },
    uploadContainer: {
        marginTop: 12,
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#007aff',
        borderRadius: 8,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        opacity: 0.5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
        gap: 8,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#555',
    },
    indicatorActive: {
        backgroundColor: '#fff',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
});
