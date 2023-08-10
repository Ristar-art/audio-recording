import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Audio } from 'expo-av';

export default function Recordings({ recordings, setRecordings, isPlaying, setIsPlaying }) {
    const [playbackStates, setPlaybackStates] = useState({}); // New state for playback states
    const [playbackPositions, setPlaybackPositions] = useState({}); // New state for playback positions
    const [playbackIntervals, setPlaybackIntervals] = useState({}); // New state for playback intervals
  
    const playRecording = async (sound, index) => {
        try {
          if (playbackStates[index] === 'playing') {
            await sound.pauseAsync();
            await sound.setPositionAsync(0); // Move playback to the beginning
            setPlaybackStates(prevStates => ({ ...prevStates, [index]: 'paused' }));
            clearInterval(playbackIntervals[index]);
          } else {
            await sound.playAsync();
            setPlaybackStates(prevStates => ({ ...prevStates, [index]: 'playing' }));
            const playbackInterval = setInterval(async () => {
              const status = await sound.getStatusAsync();
              if (status.positionMillis === status.durationMillis) {
                // Playback reached the end, reset to beginning
                await sound.stopAsync();
                await sound.setPositionAsync(0);
                setPlaybackStates(prevStates => ({ ...prevStates, [index]: 'paused' }));
                clearInterval(playbackIntervals[index]);
              }
              setPlaybackPositions(prevPlaybackPositions => ({
                ...prevPlaybackPositions,
                [index]: status.positionMillis / 1000,
              }));
            }, 1000);
            setPlaybackIntervals(prevPlaybackIntervals => ({
              ...prevPlaybackIntervals,
              [index]: playbackInterval,
            }));
          }
        } catch (error) {
          console.error('Failed to play or pause recording:', error);
        }
      };
      
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      };
    const deleteRecording = (index) => {
      const updatedRecordings = [...recordings];
      const deletedRecording = updatedRecordings[index];
      if (deletedRecording.sound) {
        deletedRecording.sound.unloadAsync(); // Unload the sound before deleting
      }
      updatedRecordings.splice(index, 1);
      setRecordings(updatedRecordings);
    };
    const renderItem = ({ item, index }) => (
        <View style={styles.row}>
          {playbackStates[index] !== 'playing' && ( // Conditionally render recording information when not playing
            <Text style={styles.recordText}>
              Recording {index + 1} - {item.duration}
            </Text>
          )}
          <Text style={styles.playbackText}>
            {playbackStates[index] === 'playing' && playbackPositions[index]
              ? `Playing: ${formatTime(playbackPositions[index])}`
              : ''}
          </Text>
          <TouchableOpacity
            onPress={() => playRecording(item.sound, index)}
            style={styles.playButton}
          >
            <Text style={styles.buttonText}>
              {playbackStates[index] === 'playing' ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>
      
          
          <TouchableOpacity
            onPress={() => deleteRecording(index)}
            style={styles.deleteButton}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      );
      
      
      
      
  
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Recordings</Text>
        <FlatList
          data={recordings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    
  },
  titleText: {
    fontSize: 18,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fill: {
    flex: 1,   
  },
  playButton: {
    backgroundColor: '#2196F3',
    padding: 5,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  recordText:{
    color:'white',
    fontSize:12
  },
  playbackText: {
    fontSize: 12,
    color: 'gray',
  },
});
