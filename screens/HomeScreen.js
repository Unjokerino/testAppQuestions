import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import QuestionCard from '../components/QuestionCard';
import VKLogin from 'react-native-vkontakte-login';

export default function HomeScreen(props) {
  const [questions, setquestions] = useState([]);
  const [refreshing, setrefreshing] = useState(false);

  useEffect(() => {
    getQuestions().then(setquestions);
  }, []);

  async function getQuestions() {
    setrefreshing(true);
    let result = await fetch('https://api.myjson.com/bins/8561o').then(
      response =>
        response.json().then(response => {
          response = response.sort(function(a, b) {
            return b.url ? 1 : -1;
          });
          return response;
        }),
    );
    setrefreshing(false);
    return result;
  }
  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getQuestions} />
        }
        style={styles.scrollContainer}
        data={questions}
        renderItem={({item}) => <QuestionCard {...item} {...props} />}
        keyExtractor={item => item.title}
      />
      <Text style={styles.greetingsText}>Привет {global.email} 👋 </Text>
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.footerItem, styles.active]}>
          <Text style={{color: '#fff'}}>Список вопросов</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            VKLogin.logout();
            global.name = undefined;
            props.navigation.replace('Login');
          }}
          style={styles.footerItem}>
          <Text>Выйти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  scrollContainer: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    flex: 1,
  },
  active: {
    backgroundColor: '#2196f3',
    color: '#fff',
  },
  footerItem: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingsText:{
    textAlign:'center',
    paddingVertical:10,
  },
  footer: {
    elevation: 2,
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 50,
  },
});
