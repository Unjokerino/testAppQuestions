import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import DetailQuestionScreen from '../screens/DetailQuestionScreen.js';

const Stack = createStackNavigator();

export default function AppNavigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Question"
          component={DetailQuestionScreen}
          options={{title: "Вопрос"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
