import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, Switch, Dimensions } from 'react-native';
import VideoControls from './VideoControls';

const { height, width } = Dimensions.get('window');

const VideoCallScreen: React.FC = () => {
  const [cameraOn, setCameraOn] = useState(false);
  const [frontCamera, setFrontCamera] = useState(true);
  const [muted, setMuted] = useState(false);
  const [transcriptOn, setTranscriptOn] = useState(true);
  const [transcriptions, setTranscriptions] = useState<string[]>([]);
  const [inCall, setInCall] = useState(false);

  // Simulate transcript generation and randomize messages
  useEffect(() => {
    const phrases = [
      'Hello!', 'How are you?', 'Let’s get started.', 'Please check your microphone.', 'I will share my screen.',
      'Goodbye!', 'Nice to meet you.', 'What’s the agenda?', 'Can you hear me?', 'See you next time!',
    ];

    const interval = setInterval(() => {
      if (inCall) {
        setTranscriptions((prev) => {
          if (prev.length >= 20) {
            return [...prev.slice(1), phrases[Math.floor(Math.random() * phrases.length)]];
          }
          return [...prev, phrases[Math.floor(Math.random() * phrases.length)]];
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [inCall]);

  const toggleMute = () => setMuted(!muted);
  const toggleCamera = () => setCameraOn(!cameraOn);
  const switchCamera = () => setFrontCamera(!frontCamera);
  const toggleTranscript = () => setTranscriptOn(!transcriptOn);
  const handleJoinCall = () => setInCall(true);
  const handleLeaveCall = () => {
    setInCall(false);
    setCameraOn(false); // Reset camera state on leaving
    setTranscriptions([]); // Clear transcript on leave
  };

  return (
    <View style={styles.container}>
      {/* Join/Leave Call Button */}
      {!inCall ? (
        <View style={styles.joinCallContainer}>
          <Button title="Join Meeting" onPress={handleJoinCall} />
        </View>
      ) : (
        <>
          {/* Simulated Video Call Window */}
          <View style={[styles.video, { backgroundColor: cameraOn ? (frontCamera ? 'red' : 'blue') : 'black' }]} />

          {/* Video Controls */}
          <VideoControls
            muted={muted}
            onMutePress={toggleMute}
            cameraOn={cameraOn}
            onCameraPress={toggleCamera}
            onSwitchCamera={switchCamera}
            onLeaveCall={handleLeaveCall}
          />

          {/* Transcript with toggle */}
          <View style={styles.transcriptContainer}>
            <View style={styles.transcriptHeader}>
              <Text style={styles.transcriptTitle}>Transcript</Text>
              <Switch value={transcriptOn} onValueChange={toggleTranscript} />
            </View>
            {transcriptOn && (
              <ScrollView style={styles.transcript}>
                {transcriptions.map((text, index) => (
                  <Text key={index} style={styles.transcriptText}>{text}</Text>
                ))}
              </ScrollView>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default VideoCallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  joinCallContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    height: height * 0.6, // Adjust height for iPhone view
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transcriptContainer: {
    width: width,
    padding: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.5)', // Gray transparent overlay
  },
  transcriptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  transcriptTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transcript: {
    maxHeight: height * 0.2, // Keep transcript height manageable
  },
  transcriptText: {
    fontSize: 14,
    color: '#000',
  },
});
