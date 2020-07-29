import React from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import MovieService from '../../services/movie.service';
import CastSummary from '../CastSummary';

export default class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        genres: [],
      },
      cast: [],
      loading: true,
    };
    this.getMovieDetails();
  }
  getMovieDetails = async () => {
    try {
      let movieDetail = await MovieService.getMovie(
        this.props.route.params.movie.id,
      );
      let castDetail = await MovieService.getCast(
        this.props.route.params.movie.id,
      );

      this.setState({movie: movieDetail, cast: castDetail, loading: false});
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    if (this.state.loading)
      return (
        <View style={{alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      );
    let genres = this.state.movie.genres.map((genre, i) => {
      return <Text key={genre.id}>{genre.name} </Text>;
    });
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>
            {this.props.route.params.movie.title}
          </Text>
          <Image
            style={styles.image}
            source={{
              uri: MovieService.getImage(
                this.props.route.params.movie.backdrop_path,
              ),
            }}
          />
          <Text style={styles.body}>
            {this.props.route.params.movie.overview}
          </Text>
          <View style={styles.details}>
            <View style={styles.detail}>
              <Text>{this.props.route.params.movie.vote_average}/10</Text>
            </View>
            <View style={styles.detail}>
              <Text>Released {this.props.route.params.movie.release_date}</Text>
            </View>
            <View style={styles.detail}>
              <Text>Genres: {genres}</Text>
            </View>
            <View style={styles.detail}>
              <Text>Budget ${this.state.movie.budget}</Text>
            </View>

            <View style={styles.detail}>
              <Text>Revenue ${this.state.movie.revenue}</Text>
            </View>
          </View>
          <View style={styles.castList}>
            <FlatList
              horizontal={true}
              data={this.state.cast}
              renderItem={dataEntry => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Person Details', {
                        person: dataEntry.item,
                      });
                    }}>
                    <CastSummary
                      info={dataEntry.item}
                      style={{marginRight: 10}}
                    />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={dataEntry => dataEntry.name.toString()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 20,
  },
  image: {
    width: '100%',
    height: 125,
    resizeMode: 'contain',
  },
  body: {
    marginTop: 10,
    textAlign: 'center',
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    flex: 1,
  },
  detail: {
    textAlign: 'left',
    width: 125,
    marginTop: 10,
    marginLeft: 5,
    height: 30,
  },
  castList: {
    height: 250,
  },
});
