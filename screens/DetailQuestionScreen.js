import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';

export default function DetailQuestionScreen(props) {
  const [question, setquestion] = useState({});
  const [flipLockNumber, setFlipLockNumber] = useState({});
  const [animatedValue, setanimatedValue] = useState([]);
  const [value, setvalue] = useState(0);
  const [visible, setvisible] = useState([false, false]);

  function flip_Animation(index) {
    if (value >= 90) {
      Animated.spring(animatedValue[index], {
        toValue: 0,
        tension: 10,
        friction: 8,
      }).start();
      visible[index] = false;
      setvalue(0);
    } else {
      Animated.spring(animatedValue[index], {
        toValue: 180,
        tension: 10,
        friction: 8,
      }).start();
      visible[index] = true;

      setvalue(180);
    }
  }

  function closeEveryThing() {
    for (let i = 0; i < animatedValue.length; i++) {
      animatedValue[i] = new Animated.Value(180);

      flip_Animation(i);
      visible[i] = false;
    }
    setTimeout(() => {
      props.navigation.goBack();
    }, 1000);
  }

  useEffect(() => {
    getQuestion().then(setquestion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getQuestion() {
    let result = fetch(props.route.params.url).then(response =>
      response.json().then(response => {
        for (let i = 0; i < response.answers.length; i++) {
          animatedValue[i] = new Animated.Value(0);
        }
        return response;
      }),
    );
    return result;
  }

  return (
    <View contentInsetAdjustmentBehavior="automatic">
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => closeEveryThing()}
          style={styles.headerItem}>
          <Text style={styles.headerItemText}>👈 Назад</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.question}> {question.question} </Text>
      <View style={styles.answersContainer}>
        {question.answers !== undefined ? (
          question.answers.map((answer, index) => {
            return (
              <TouchableWithoutFeedback onPress={() => flip_Animation(index)}>
                <View style={[styles.answerContainer]}>
                  <Animated.View
                    style={[
                      {
                        transform: [
                          {
                            rotateX: animatedValue[index].interpolate({
                              inputRange: [0, 180],
                              outputRange: ['180deg', '360deg'],
                            }),
                          },
                        ],
                      },
                      styles.imageStyle,
                      styles.flipLockContainer,
                    ]}>
                    <Text
                      style={[
                        styles.flipLockNumber,
                        {opacity: visible[index] ? 1 : 0},
                      ]}>
                      {answer.number}
                    </Text>
                  </Animated.View>
                  <Text style={styles.answer}> {answer.answer} </Text>
                </View>
              </TouchableWithoutFeedback>
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
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    height: 50,
    elevation: 3,
  },
  headerItem: {
    height: '100%',
    marginLeft: 10,

    justifyContent: 'center',
  },
  headerItemText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  flipLockContainer: {
    height: 100,
    justifyContent: 'center',
    backgroundColor: '#29282a',
    width: 60,
    alignItems: 'center',
    borderRadius: 6,
  },
  flipLockNumber: {
    height: '100%',
    color: '#cccccc',
    fontSize: 72,
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
