import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegistrationForm({ onRegistrationSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyOM2Ywd4uYInG0EUazQqCT_IXJzfAznxWS2nmzGWvaHDsmgoIV-4X_hzF9Lee8jtEqGw/exec';
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);

    try {
      await fetch(scriptURL, {
        method: 'POST',
        body: formData,
      });

      await AsyncStorage.setItem('isRegistered', 'true');
      onRegistrationSuccess();
    } catch (error) {
      await AsyncStorage.setItem('isRegistered', 'true');
      onRegistrationSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title} accessibilityRole="header">Registration</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          accessibilityLabel="Full Name input field"
        />

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Email Address input field"
        />

        <TextInput
          style={styles.input}
          placeholder="WhatsApp Number"
          placeholderTextColor="#aaa"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          accessibilityLabel="WhatsApp Number input field"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={isSubmitting}
          accessibilityRole="button"
          accessibilityLabel="Register and Access Tools button"
        >
          {isSubmitting ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>Register & Access Tools</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0a101e',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#16243d',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#475569',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444444',
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#ffd700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
