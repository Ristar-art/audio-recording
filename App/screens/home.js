import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/customButtons/customButtons';

export default function Home() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signedIn, setSignedIn] = useState(false);

  const onSignInPressed = async () => {
    try {
      // Fetch stored user details from AsyncStorage
      const storedUserDetailsJSON = await AsyncStorage.getItem('userDetails');

      if (storedUserDetailsJSON) {
        const storedUserDetails = JSON.parse(storedUserDetailsJSON);

        // Check if entered credentials match stored credentials
        if (username === storedUserDetails.username && password === storedUserDetails.password) {
          setSignedIn(true);
          // Navigate to the desired screen after successful sign-in
          navigation.navigate('Record');
        } else {
          console.log('Invalid credentials');
        }
      } else {
        console.log('User not registered');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUpScreen');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <View style={{ height: "50%", justifyContent: "center" }}>
        <Text
          style={{ fontFamily: "San Francisco", fontSize: 25, color: "white" }}
        >
          Welcome to your audio Record
        </Text>
      </View>
      {signedIn ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {/* <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "10vh",
              marginBottom: 5,
            }}
          >
            <TextInput
              placeholder="user name"
              value={username}
              setValue={setUsername}
              style={{
                width: "55vw",
                height: 25,
                backgroundColor: "white",
                borderRadius: 2,
              }}
            />
            <TextInput
              placeholder="Password"
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
              style={{
                width: "55vw",
                height: 25,
                backgroundColor: "white",
                borderRadius: 2,
              }}
            />
          </View>

          <TouchableOpacity
            onPress={onSignInPressed}
            style={{
              backgroundColor: "blue",
              height: 25,
              width: 300,
              width: "55vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
            }}
          >
            <Text style={{ color: "white" }}>Sigh In</Text>
          </TouchableOpacity>

          <CustomButton
            text="Don't have an account? Create one"
            onPress={onSignUpPress}
            type="TERTIARY"
          /> */}
        </View>
      ) : (
        <View style={{ flex: 1 }}>
        <View>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <TouchableOpacity onPress={onSignInPressed} style={styles.signInButton}>
          <Text style={{ color: 'white' }}>Sign In</Text>
        </TouchableOpacity>
  
        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    )}
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    // alignItems: "flex-end",
    // padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  image: {
    display: "flex",

    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    button: {
      width: 120,
      height: 40,
    },
  },
  input: {
    width: '55vw',
    height:"5vh",
    backgroundColor: 'white',
    borderRadius: 2,
    marginVertical: 5,
  },
  signInButton: {
    backgroundColor: "blue",
    height: 40,
    width: "55vw",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
});