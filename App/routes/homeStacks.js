import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Record from '../screens/record';

import Home from "../screens/home";
import SignUpScreen from "../screens/signUpScreen";



const screens = {
  Home: {
    screen: Home,
    navigationOptions:{
      title:'SingIn',     
    }
  },
  Record: {
    screen: Record,
    navigationOptions:{
      title:'Adio Record',
      // headerStyle:{backgraundColor: '#eee'}
    }
  },
  SignUpscreen: {
    screen:SignUpScreen,
    navigationOptions:{
      title:'singUp',
      // headerStyle:{backgraundColor: '#eee'}
    }
  }, 
  
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
