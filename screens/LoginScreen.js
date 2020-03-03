import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';

export default function HomeScreen(props) {
    console.log(props)
  return (
    <View contentInsetAdjustmentBehavior="automatic">
      <TouchableOpacity
        style={{height: '100%',backgroundColor:'#2196f3',justifyContent:'center',alignItems:'center'}}
        onPress={() => {
          props.navigation.replace('Home');
        }}
        title="">
        <Text style={{color:'#fff',fontSize:24}}>Войти</Text>
      </TouchableOpacity>
    </View>
  );
}
