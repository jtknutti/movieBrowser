import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import MovieService from '../../services/movie.service.js';

export default class Genre extends React.Component {
  state = {
    genres: [],
  };
  constructor() {
    super();
    this.getGenres();
  }
  getGenres = async () => {
    try {
      let genres = await MovieService.getGenreList();
      this.setState({genres});
    } catch (e) {
      console.log(e);
    }
  };
  navigateToGenre = async (genreName, genreId) => {
    this.props.navigation.navigate('Genre Page', {
      name: genreName,
      id: genreId,
    });
  };
  render() {
    let genres = this.state.genres.map((genre, i) => {
      return (
        <TouchableOpacity
          key={i}
          style={styles.item}
          onPress={() => {
            this.navigateToGenre(genre.name, genre.id);
          }}>
          <Text>{genre.name}</Text>
        </TouchableOpacity>
      );
    });
    return <ScrollView style={styles.list}>{genres}</ScrollView>;
  }
}
const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    flex: 1,
    height: 30,
    marginTop: 10,
  },
});
