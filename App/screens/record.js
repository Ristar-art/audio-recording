import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import Recordings from './recordings';

export default function Record() {
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recording, setRecording] = useState(null);
  const [playbackStates, setPlaybackStates] = useState({}); // New state for playback states
  const [playbackPositions, setPlaybackPositions] = useState({}); // New state for playback positions
  const [playbackIntervals, setPlaybackIntervals] = useState({}); // New state for playback intervals

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  const prepareRecording = async () => {
    try {
      if (recording === null) {
        const recordingObject = new Audio.Recording();
        await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recordingObject);
        return recordingObject;
      } else {
        return recording;
      }
    } catch (error) {
      console.error('Error preparing recording:', error);
    }
  };

  const startRecording = async () => {
    try {
      const recordingObject = await prepareRecording();

      if (recordingObject) {
        const permission = await Audio.requestPermissionsAsync();

        if (permission.status === 'granted') {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });

          await recordingObject.startAsync();
          setIsRecording(true);

          setRecordingDuration(0);
          recordingObject.intervalId = setInterval(() => {
            recordingObject.getStatusAsync().then((status) => {
              setRecordingDuration(status.durationMillis / 1000);
            });
          }, 1000);
        } else {
          // Handle permission not granted
        }
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        setIsRecording(false);
  
        await recording.stopAndUnloadAsync();
        const recordedData = await recording.getURI();
        clearInterval(recording.intervalId);
  
        const { sound } = await Audio.Sound.createAsync({ uri: recordedData });
        const newRecording = {
          duration: formatTime(recordingDuration),
          sound: sound,
        };
  
        setRecordings(prevRecordings => [...prevRecordings, newRecording]); // Use functional update
        setRecordingDuration(0);
        setRecording(null);
      }
    } catch (err) {
      console.error('Failed to stop recording:', err);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Recording Duration: {formatTime(recordingDuration)}</Text>
      {isRecording ? (
        <TouchableOpacity onPress={stopRecording} style={styles.stopButton}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={startRecording} style={styles.startButton}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}

        <Recordings
             recordings={recordings}
             setRecordings={setRecordings}
             playbackStates={playbackStates}
             setPlaybackStates={setPlaybackStates}
             playbackPositions={playbackPositions}
             setPlaybackPositions={setPlaybackPositions}
             playbackIntervals={playbackIntervals}
             setPlaybackIntervals={setPlaybackIntervals}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    width: '100%', 
    
  },
  titleText: {
    fontSize: 18,
  },
  startButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  stopButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
