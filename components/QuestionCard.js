import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const QuestionCard = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.url
          ? props.navigation.navigate('Question', {url: props.url})
          : '';
      }}
      style={[styles.card, !props.url ? styles.inactive : '']}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default QuestionCard;

const styles = StyleSheet.create({
  card: {
    elevation: 1,
    backgroundColor: '#fff',
    marginBottom: 5,
    paddingHorizontal: 8,
    height: 50,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  inactive: {
    opacity: 0.85,
  },
});
