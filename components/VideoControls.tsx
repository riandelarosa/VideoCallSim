import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface VideoControlsProps {
  muted: boolean;
  onMutePress: () => void;
  cameraOn: boolean;
  onCameraPress: () => void;
  onSwitchCamera: () => void;
  onLeaveCall: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({ muted, onMutePress, cameraOn, onCameraPress, onSwitchCamera, onLeaveCall }) => {
  return (
    <View style={styles.container}>
      <Button title={muted ? "Unmute" : "Mute"} onPress={onMutePress} />
      <Button title={cameraOn ? "Turn Camera Off" : "Turn Camera On"} onPress={onCameraPress} />
      {cameraOn && <Button title="Switch Camera" onPress={onSwitchCamera} />}
      <Button title="Leave Call" onPress={onLeaveCall} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
});

export default VideoControls;
