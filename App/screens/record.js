import { Audio } from 'expo-av';
import { PermissionsAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
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
      }
    } catch (error) {
      console.error('Error preparing recording:', error);
    }
  };

  const startRecording = async () => {
    await prepareRecording();
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        await recording.startAsync();
        setIsRecording(true);

        // Start the recording timer to update the recording duration
        Timer.setInterval('recordingTimer', () => {
          recording.getStatusAsync().then((status) => {
            setRecordingDuration(status.durationMillis / 1000);
          });
        }, 1000);
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
        await recording.stopAndUnloadAsync();
        

        // Create a new recording object and save it to the recordings state
        const newRecording = {
          duration: formatTime(recordingDuration),
          file: recording.getURI(),
        
        };
        setRecordings([...recordings, newRecording]);

        setIsRecording(false);
        setRecordingDuration(0);
        setRecording(null);
      }
    } catch (err) {
      console.error('Failed to stop recording:', err);
    }
  };

  function getRecordingsLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
          <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
        </View>
      );
    });
  }
  
  const playRecordedAudio = async () => {
    try {
      if (recordedAudioPath) {
        hn;{ uri: recordedAudioPath };
        await sound.playAsync();
        setIsPlaying(true);
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
        console.log('Playing recorded audio:', recordedAudioPath);
      }
    } catch (err) {
      console.error('Failed to play recorded audio:', err);
    }
  };

  const deleteRecordedAudio = async () => {
    try {
      if (recordedAudioPath) {
        const { sound } = await Audio.Sound.createAsync({ uri: recordedAudioPath });
        await sound.unloadAsync();
        await audioRecorderPlayer.removeRecordFile(recordedAudioPath);
        setRecordedAudioPath('');
        console.log('Recorded audio deleted.');
      }
    } catch (err) {
      console.error('Failed to delete recorded audio:', err);
    }
  };

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
      <TouchableOpacity onPress={playRecordedAudio}>
        <Text style={styles.titleText}>{isPlaying ? 'Stop Audio' : 'Play Recorded Audio'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteRecordedAudio}>
        <Text style={styles.titleText}>Delete Recorded Audio</Text>
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
