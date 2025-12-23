import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../services/supabase';
import styles from './HomeScreen.styles';

export default function HomeScreen({ onNavigate }) {
    const [firstName, setFirstName] = useState('');
    const [verificationStats, setVerificationStats] = useState({
        total: 6,
        verified: 0,
        pending: 0,
        expired: 0,
    });
    const hasFetched = useRef(false);

    useEffect(() => {
        // Only fetch if we haven't fetched yet
        if (!hasFetched.current) {
            fetchProfile();
            hasFetched.current = true;
        }
    }, []);

    const fetchProfile = async () => {
        try {
            // Get the current user
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                console.error('Error getting user:', userError);
                return;
            }

            // Fetch profile data
            const { data, error } = await supabase
                .from('profiles')
                .select('first_name')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
            } else if (data) {
                setFirstName(data.first_name || '');
            }
        } catch (error) {
            console.error('Error in fetchProfile:', error);
        }
    };

    const verificationItems = [
        { name: 'Contractor License', status: 'pending', icon: 'document-text' },
        { name: 'Forklift Certificate', status: 'pending', icon: 'car' },
        { name: 'Scissor Lift Certificate', status: 'pending', icon: 'car-sport' },
        { name: 'OSHA Certificate', status: 'pending', icon: 'shield-checkmark' },
    ];

    const quickActions = [
        {
            label: 'Upload Documents',
            path: '/DocumentUpload',
            icon: 'cloud-upload-outline',
            color: '#007AFF',
            description: 'Upload or update your certifications'
        },
        {
            label: 'View Account',
            path: '/AccountInfo',
            icon: 'person-outline',
            color: '#34C759',
            description: 'Check your verification status'
        },
        {
            label: 'Insurance Sign-In',
            path: '/InsuranceSignIn',
            icon: 'shield-outline',
            color: '#FF9500',
            description: 'Connect your insurance account'
        },
        {
            label: 'Settings',
            path: '/Settings',
            icon: 'settings-outline',
            color: '#007AFF',
            description: 'Manage account settings'
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'verified': return '#34C759';
            case 'pending': return '#FF9500';
            case 'expired': return '#FF3B30';
            default: return '#8E8E93';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'verified': return 'Verified';
            case 'pending': return 'Pending';
            case 'expired': return 'Expired';
            default: return 'Not Started';
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.content}>
                {/* Welcome Section */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeTitle}>Welcome Back{firstName ? `, ${firstName}` : ''}</Text>
                </View>

                {/* Verification Overview Card */}
                <View style={styles.statsCard}>
                    <Text style={styles.cardTitle}>Verification Overview</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{verificationStats.verified}</Text>
                            <Text style={styles.statLabel}>Verified</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{verificationStats.pending}</Text>
                            <Text style={styles.statLabel}>Pending</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{verificationStats.total}</Text>
                            <Text style={styles.statLabel}>Total</Text>
                        </View>
                    </View>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${(verificationStats.verified / verificationStats.total) * 100}%` }
                            ]}
                        />
                    </View>
                    <Text style={styles.progressText}>
                        {Math.round((verificationStats.verified / verificationStats.total) * 100)}% Complete
                    </Text>
                </View>

                {/* Quick Actions */}
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.quickActionsContainer}>
                    {quickActions.map((action, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.actionCard}
                            onPress={() => onNavigate && onNavigate(action.path)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.actionIconContainer, { backgroundColor: `${action.color}20` }]}>
                                <Ionicons name={action.icon} size={28} color={action.color} />
                            </View>
                            <Text style={styles.actionLabel}>{action.label}</Text>
                            <Text style={styles.actionDescription}>{action.description}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Recent Documents Status */}
                <Text style={styles.sectionTitle}>Document Status</Text>
                <View style={styles.documentsCard}>
                    {verificationItems.map((item, index) => (
                        <View key={index} style={styles.documentItem}>
                            <View style={styles.documentLeft}>
                                <Ionicons
                                    name={item.icon}
                                    size={24}
                                    color="#8E8E93"
                                    style={styles.documentIcon}
                                />
                                <Text style={styles.documentName}>{item.name}</Text>
                            </View>
                            <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
                                <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
                                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                                    {getStatusText(item.status)}
                                </Text>
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity
                        style={styles.viewAllButton}
                        onPress={() => onNavigate && onNavigate('/AccountInfo')}
                    >
                        <Text style={styles.viewAllText}>View All Documents →</Text>
                    </TouchableOpacity>
                </View>

                {/* Helpful Tips */}
                <View style={styles.tipsCard}>
                    <View style={styles.tipsHeader}>
                        <Ionicons name="bulb-outline" size={24} color="#FF9500" />
                        <Text style={styles.tipsTitle}>Helpful Tips</Text>
                    </View>
                    <View style={styles.tipItem}>
                        <Text style={styles.tipBullet}>•</Text>
                        <Text style={styles.tipText}>
                            Keep your certifications up to date to maintain compliance
                        </Text>
                    </View>
                    <View style={styles.tipItem}>
                        <Text style={styles.tipBullet}>•</Text>
                        <Text style={styles.tipText}>
                            Upload clear, readable images of your documents for faster verification
                        </Text>
                    </View>
                    <View style={styles.tipItem}>
                        <Text style={styles.tipBullet}>•</Text>
                        <Text style={styles.tipText}>
                            Connect your insurance account to automatically sync coverage information
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}


