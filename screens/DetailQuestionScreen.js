import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';

export default function DetailQuestionScreen(props) {
  const [question, setquestion] = useState({});
  const [flipLockNumber, setFlipLockNumber] = useState({});
  const [animatedValue, setanimatedValue] = useState([]);
  const [value, setvalue] = useState(0);
  const [visible, setvisible] = useState(false);

  function flip_Animation(index) {
    if (value >= 90) {
      Animated.spring(animatedValue[index], {
        toValue: 0,
        tension: 10,
        friction: 8,
      }).start();
      setvalue(0);
      setvisible(false);
    } else {
      Animated.spring(animatedValue[index], {
        toValue: 180,
        tension: 10,
        friction: 8,
      }).start();
      setvisible(true);
      setvalue(180);
    }
  }

  let SetInterpolate = animatedValue[0].interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const Rotate_Y_AnimatedStyle = {
    transform: [{rotateX: SetInterpolate}],
  };

  useEffect(() => {
    getQuestion().then(setquestion);
  }, [getQuestion]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getQuestion() {
    let result = fetch(props.route.params.url).then(response =>
      response.json().then(response => {
        response.answers.forEach(answer => {
          setanimatedValue([animatedValue, new Animated.Value(0)]);
        });
        return response;
      }),
    );
    return result;
  }

  return (
    <View contentInsetAdjustmentBehavior="automatic">
      <Text style={styles.question}>{question.question}</Text>
      <View style={styles.answersContainer}>
        {question.answers !== undefined ? (
          question.answers.map((answer, index) => {
            return (
              <TouchableOpacity onPress={() => flip_Animation(index)}>
                <View style={[styles.answerContainer]}>
                  <Animated.View
                    style={[
                      Rotate_Y_AnimatedStyle,
                      styles.imageStyle,
                      styles.flipLockContainer,
                    ]}>
                    <Text
                      style={[
                        styles.flipLockNumber,
                        {opacity: visible ? 1 : 0},
                      ]}>
                      {answer.number}
                    </Text>
                  </Animated.View>
                  <Text style={styles.answer}>{answer.answer}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  answer: {
    marginVertical: 5,
    padding: 10,
  },
  flipLockContainer: {
    height: 100,
    justifyContent: 'center',
    backgroundColor: '#29282a',
    width: 60,
    alignItems: 'center',
    borderTopColor: '#000',
    borderTopWidth: 3,
    borderBottomColor: '#000',
    borderBottomWidth: 3,
  },
  flipLockNumber: {
    color: '#fff',
    fontSize: 62,
  },
  imageStyle: {
    width: 150,
    height: 150,
  },
  answersContainer: {
    marginVertical: 10,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  question: {
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: '#fff',
  },
});
