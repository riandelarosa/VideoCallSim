import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Transcript = ({ transcript }: { transcript: string[] }) => {
  return (
    <ScrollView style={styles.transcriptContainer}>
      {transcript.map((line, index) => (
        <Text key={index} style={styles.transcriptText}>
          {line}
        </Text>
      ))}
    </ScrollView>
  );
};

export default Transcript;

const styles = StyleSheet.create({
  transcriptContainer: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    width: '100%',
  },
  transcriptText: {
    fontSize: 14,
    marginBottom: 5,
  },
});
