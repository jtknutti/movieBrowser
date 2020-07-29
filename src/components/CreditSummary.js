import React from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import MovieService from '../services/movie.service.js';

export default class CreditSummary extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: MovieService.getImage(this.props.info.poster_path)}}
        />
        <Text>{`${this.props.info.title}\n${this.props.info.character}`}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    height: 125,
    width: 125,
  },
  container: {
    height: 150,
    width: 125,
    flex: 1,
    marginRight: 10,
    marginTop: 20,
  },
});
