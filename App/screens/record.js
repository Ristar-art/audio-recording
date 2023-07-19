import { useNavigation } from '@react-navigation/native'; // Make sure to import this
import { Audio } from 'expo-av';
import { PermissionsAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity,Button } from 'react-native';
import Timer from 'react-native-timer';

export default function Record() {
  const [recordedAudioPath, setRecordedAudioPath] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordings, setRecordings] = useState([]);
  const [recording, setRecording] = useState(null);

  useEffect(() => {
    return () => {
      // Cleanup: Stop the recording if it's still in progress
      stopRecording();
    };
  }, []);

  const prepareRecording = async () => {
    try {
      if (recording === null) {
        const recordingObject = new Audio.Recording();
        await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recordingObject);
        return recordingObject; // Add this line to return the recording object
      }
    } catch (error) {
      console.error('Error preparing recording:', error);
    }
  };
  

  const startRecording = async () => {
    const recordingObject = await prepareRecording();
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        await recordingObject.startAsync();
        setIsRecording(true);

        // Start updating the recording duration
        setRecordingDuration(0);
        const intervalId = Timer.setInterval('recordingTimer', () => {
          recordingObject.getStatusAsync().then((status) => {
            setRecordingDuration(status.durationMillis / 1000);
          });
        }, 1000);

        // Store the intervalId in the recordingObject to clear it later
        recordingObject.intervalId = intervalId;
      } else {
        setMessage('Please grant permission to the app to access the microphone');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        setIsRecording(false);

        // Stop the recording and get the recorded data
        await recording.stopAndUnloadAsync();
        const recordedData = await recording.getURI();

        // Clear the recording timer
        if (recording.intervalId) {
          Timer.clearInterval(recording.intervalId);
        }

        // Create a new Audio.Sound object from the recorded data
        const { sound } = await Audio.Sound.createAsync({ uri: recordedData });

        // Create a new recording object and save it to the recordings state
        const newRecording = {
          duration: formatTime(recordingDuration),
          file: recordedData,
          sound: sound,
        };
        setRecordings([...recordings, newRecording]);

        setRecordingDuration(0);
        setRecording(null);
      }
    } catch (err) {
      console.error('Failed to stop recording:', err);
    }
  };
  
  const deleteRecording = (index) => {
    // Create a new array without the recordingLine to be deleted
    const updatedRecordings = [...recordings];
    updatedRecordings.splice(index, 1);
    setRecordings(updatedRecordings);
  };

  function getRecordingsLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
          <Button style={styles.button} onPress={() => deleteRecording(index)} title="Delete"></Button>
        </View>
      );
    });
  }
  
  
  

  

  // Helper function to format the time in seconds to "mm:ss" format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>      
      <Text style={styles.titleText}>Recording Duration: {formatTime(recordingDuration)}</Text>
      <TouchableOpacity onPress={startRecording}>
        <Text style={styles.titleText}>Start Recording</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={stopRecording}>
        <Text style={styles.titleText}>Stop Recording</Text>
      </TouchableOpacity>    
      
      {getRecordingsLines()}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 38,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  titleText: {
    fontSize: 18,
  },
});
