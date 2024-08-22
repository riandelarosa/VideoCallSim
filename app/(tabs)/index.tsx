import { Image, StyleSheet, Platform} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import VideoCallScreen from '../../components/VideoCallScreen';  // Correct path for VideoCallScreen
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image/>
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Incoming call...</ThemedText>
        <HelloWave />
        </ThemedView>
      <SafeAreaView style={styles.container}>
        <VideoCallScreen />
      </SafeAreaView>
      <ThemedView style={styles.stepContainer}>
       
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
