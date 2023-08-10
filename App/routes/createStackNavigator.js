import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import SignUpScreen from '../screens/signUpScreen';
import Record from '../screens/record';
import Recordings from '../screens/recordings';



const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
  
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="Record" component={Record}/>
        <Stack.Screen name="Recordings" component={Recordings} />
      </Stack.Navigator>

  );
};

export default AppNavigator;
