import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RegistrationForm from './RegistrationForm';
import SmartPlayer from './SmartPlayer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('MainMenu');

  useEffect(() => {
    checkRegistration();
  }, []);

  const checkRegistration = async () => {
    try {
      const userStatus = await AsyncStorage.getItem('isRegistered');
      if (userStatus === 'true') {
        setIsRegistered(true);
      }
    } catch (error) {
      console.log("Error checking registration status", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openYouTube = () => {
    const url = 'https://youtube.com/@blindcommunicationworld';
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Failed to open YouTube link.");
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container} accessibilityLiveRegion="assertive">
        <ActivityIndicator size="large" color="#ffd700" />
        <Text style={styles.loadingText}>Loading, please wait...</Text>
      </View>
    );
  }

  if (!isRegistered) {
    return (
      <RegistrationForm onRegistrationSuccess={() => setIsRegistered(true)} />
    );
  }

  if (currentScreen === 'SmartPlayer') {
    return <SmartPlayer onBack={() => setCurrentScreen('MainMenu')} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header} accessibilityRole="header">
        <Text style={styles.headerTitle}>Blind Communication World</Text>
        <Text style={styles.tagline}>Providing Solutions for Everyone</Text>
      </View>

      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle} accessibilityRole="text">Main Menu Tools</Text>

        <TouchableOpacity 
          style={styles.toolBtn} 
          onPress={openYouTube}
          accessibilityRole="button"
          accessibilityLabel="YouTube Channel, double tap to open Blind Communication World YouTube page"
        >
          <Text style={styles.btnText}>YouTube Channel</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.toolBtn, { backgroundColor: '#1e3a8a' }]} 
          onPress={() => setCurrentScreen('SmartPlayer')}
          accessibilityRole="button"
          accessibilityLabel="Smart Player, double tap to open audio and video player"
        >
          <Text style={styles.btnText}>Smart Player</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a101e',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#16243d',
    padding: 25,
    borderRadius: 15,
    borderColor: '#ffd700',
    borderWidth: 1,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  tagline: {
    color: '#ffd700',
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'top',
    marginTop: 10,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  toolBtn: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#475569',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  }
});
