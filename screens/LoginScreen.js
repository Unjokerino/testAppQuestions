import React, {useEffect} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import VKLogin from 'react-native-vkontakte-login';

export default function HomeScreen(props) {
  useEffect(() => {
    VKLogin.initialize(7345034);
    login();
  }, []);

  async function login() {
    const isLoggedIn = await VKLogin.isLoggedIn();
    if(isLoggedIn){
      props.navigation.replace('Home')
    }
   
  }

  return (
    <View contentInsetAdjustmentBehavior="automatic">
      <TouchableOpacity
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: '100%',
          backgroundColor: '#2196f3',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          props.navigation.replace('Home');
        }}
        title="">
        <Text style={{color: '#fff', fontSize: 24}}>Войти</Text>
      </TouchableOpacity>
    </View>
  );
}
