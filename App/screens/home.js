import React, { useState } from "react";
import CustomInputs from "../components/customInputs/customInputs";
import { ImageBackground, StyleSheet, View, Button, Dimensions,useWindowDimensions,
  ScrollView,} from "react-native";
import Header from "../components/header";
import { TextInput } from "react-native-gesture-handler";
import CustomButton from "../components/customButtons/customButtons";

 
const { width, height } = Dimensions.get("window");
const image = {
  width: width,
  height: height,
  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Urk%C3%A4llan.svg/240px-Urk%C3%A4llan.svg.png',
};

export default function Home({navigation}) {

  const [username,setUsername] = useState()
  const [password,setPassword]= useState()

  const onSignInPressed = () => {
    // validate user
    navigation.navigate('Audio Record');
  };

  
  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };



  return (
   

<View style={styles.container}>
    
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      
        <View style={styles.main}>
         
          <CustomInputs placeholder="user name" value={username} setValue={ setUsername}/>
          <CustomInputs placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
          <CustomButton text="Sign In" onPress={onSignInPressed} />

          
          <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
          />

        </View>
      </ImageBackground>
    </View>

   
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
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
    flex: 1,
    justifyContent: "center",
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
