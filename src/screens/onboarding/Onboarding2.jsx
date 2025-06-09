import React from 'react';
import { Text, StyleSheet, ImageBackground, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Onboarding2({ navigation }) {
  return (
    <ImageBackground source={require('../../assets/images/onboarding2.png')} style={styles.bg}>
      <SafeAreaView style={styles.overlay}>
        <Text style={styles.title}>Track Your Progress</Text>
        <Text style={styles.text}>Visualize your improvements over time with our tools.</Text>

        <Button title="Next" onPress={() => navigation.navigate('Onboarding3')} />
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: 'flex-end' },
  overlay: { backgroundColor: 'rgba(0,0,0,0.5)', padding: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  text: { fontSize: 16, color: '#fff', marginBottom: 20 },
  skip: { color: '#ccc', textAlign: 'center', marginTop: 10 },
});