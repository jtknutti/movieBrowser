import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
} from 'react-native';
import MovieService from '../../services/movie.service';
import MovieSummary from '../MovieSummary';
export default class GenrePage extends React.Component {
  state = {
    movies: [],
    loading: true,
    currentPage: 1,
    allLoaded: false,
  };
  constructor(props) {
    super(props);
    this.getMovies(this.props.route.params.id);
    this.props.navigation.setOptions({title: this.props.route.params.name});
  }
  getMovies = async id => {
    try {
      let movies = await MovieService.browseGenre(id);
      this.setState({movies, loading: false, currentPage: 1});
    } catch (e) {
      console.log(e);
    }
  };
  loadMoreMovies = () => {
    console.log('loading more movies');
    if (this.state.loading) return;
    if (this.state.allLoaded) return;

    this.setState({loading: true}, async () => {
      try {
        let newMovies = await MovieService.browseGenre(
          this.props.route.params.id,
          this.state.currentPage + 1,
        );
        this.setState(state => {
          let newState = {...state};
          newState.movies = [...state.movies, ...newMovies];
          newState.currentPage = state.currentPage + 1;
          newState.loading = false;
          if (newMovies.length === 0) {
            console.log('End of list');
            newState.allLoaded = true;
          }
          return newState;
        });
      } catch (e) {
        console.log(e);
      }
    });
  };
  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.movies}
          renderItem={dataEntry => {
            return (
              <MovieSummary
                movieInfo={dataEntry.item}
                onPress={() => {
                  this.props.navigation.navigate('Movie Details', {
                    movie: dataEntry.item,
                    title: dataEntry.item.title,
                  });
                }}
              />
            );
          }}
          onEndReached={this.loadMoreMovies}
          keyExtractor={movie => `movie_${movie.id}`}
        />
      </SafeAreaView>
    );
  }
}
