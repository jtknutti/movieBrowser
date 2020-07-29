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
export default class MovieSummary extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
          <Image
            style={styles.images}
            source={{
              uri: MovieService.getImage(this.props.movieInfo.poster_path),
            }}
          />
          <Text numberOfLines={6} style={styles.title}>
            {`${this.props.movieInfo.title}\n`}
            <Text style={styles.body}>
              {`Released ${this.props.movieInfo.release_date}\nRating: ${
                this.props.movieInfo.vote_average
              }/10\n${this.props.movieInfo.overview}`}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  images: {
    height: 125,
    width: 125,
    marginRight: 25,
  },
  container: {
    width: '100%',
    height: 125,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
  },
  body: {
    textAlign: 'left',
    fontWeight: 'normal',
  },
});
