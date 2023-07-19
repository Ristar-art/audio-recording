import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import SignUpScreen from '../screens/signUpScreen';
import Record from '../screens/record';



const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
  
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Record" component={Record} options={{ headerShown: false }} />
      </Stack.Navigator>

  );
};

export default AppNavigator;
