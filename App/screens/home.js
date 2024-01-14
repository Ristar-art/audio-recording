import react from "react";
import { useNavigation } from "@react-navigation/native"; // Make sure to import this
import { useState } from "react";
import CustomInputs from "../components/customInputs/customInputs";
import {
  ImageBackground,
  StyleSheet,
  View,
  Button,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/customButtons/customButtons";

export default function Home({ navigation }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [signedIn, setSignedIn] = useState(false);

  const onSignInPressed = () => {
    // validate user
    navigation.navigate("Record");
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUpScreen");
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
          <View
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
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
          
            onPress={() => setSignedIn(true)}
          >
            <Text style={{ color: "white" }}>Sign in</Text>
          </TouchableOpacity>
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
});
