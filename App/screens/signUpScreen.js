import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "../components/customInputs/customInputs";

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const onRegisterPressed = async () => {
    try {
      // Validate input and check if passwords match
      if (password !== passwordRepeat) {
        console.log("Passwords do not match");
        return;
      }

      // Assuming validation passes, store user details in AsyncStorage
      const userDetails = {
        username,
        email,
        password,
      };

      // Convert userDetails to JSON string before storing
      const userDetailsJSON = JSON.stringify(userDetails);

      // Store user details in AsyncStorage
      await AsyncStorage.setItem("userDetails", userDetailsJSON);

      console.log("User details stored successfully");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error storing user details:", error);
    }
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Create an account</Text>

      <View style={styles.form}>
        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomInput
          placeholder="Repeat Password"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={onRegisterPressed}
          style={styles.registerButton}
        >
          <Text style={{ color: "white" }}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onSignInPress} style={styles.signInButton}>
          <Text style={{ color: "#FDB075" }}>Have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  form: {
    width: "80%",
  },
  registerButton: {
    backgroundColor: "blue",
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  signInButton: {
    marginVertical: 10,
  },
});
