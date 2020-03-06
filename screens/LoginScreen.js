import React, {useEffect} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import VKLogin from 'react-native-vkontakte-login';

export default function HomeScreen(props) {
  useEffect(() => {
    VKLogin.initialize(7348040);
    isLoggined()
  }, [login]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function login() {
    const isLoggedIn = await VKLogin.isLoggedIn();
    VKLogin.getCertificateFingerprint().then(console.log)
    if (isLoggedIn) {
      props.navigation.replace('Home');
    } else {
      const auth = await VKLogin.login(['email']);
      global.email = auth.email;
      props.navigation.replace('Home');
     
    }
  }
  async function isLoggined(){
    const isLoggedIn = await VKLogin.isLoggedIn();
    VKLogin.getCertificateFingerprint().then(console.log)
    if (isLoggedIn) {
      props.navigation.replace('Home');
    }
  }

  return (
    <View style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <TouchableOpacity
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styles.loginButton, styles.button]}
        onPress={() => {
          props.navigation.replace('Home');
        }}
        title="">
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.vkButton, styles.button]}
        onPress={() => {
          login();
        }}>
        <Text style={styles.buttonText}>Войти через вк</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#2196f3',
  },
  vkButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
});
