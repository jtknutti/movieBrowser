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
import CreditSummary from '../CreditSummary';

export default class PersonDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credits: [],
      loading: true,
      person: {},
    };
    this.getMovieDetails();
    this.getPersonDetails();
  }
  getPersonDetails = async () => {
    try {
      let person = await MovieService.getPerson(
        this.props.route.params.person.id,
      );
      this.setState({person: person});
    } catch (e) {
      console.log(e);
    }
  };
  getMovieDetails = async () => {
    try {
      let credits = await MovieService.getCredits(
        this.props.route.params.person.id,
      );
      this.setState({credits, loading: false});
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
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>{this.state.person.name}</Text>
          <Image
            style={styles.image}
            source={{
              uri: MovieService.getImage(this.state.person.profile_path),
            }}
          />
          <Text style={styles.body}>{this.state.person.biography}</Text>
          <View style={styles.details}>
            <View style={styles.detail}>
              <Text>Popularity: {this.state.person.popularity}</Text>
            </View>
            <View style={styles.detail}>
              <Text>Born: {this.state.person.birthday}</Text>
            </View>
            <View style={styles.detail}>
              <Text>Place of Birth: {this.state.person.place_of_birth}</Text>
            </View>
            <View style={styles.detail}>
              {this.state.person.deathday === null ? null : (
                <Text>Died: {this.state.person.deathday}</Text>
              )}
            </View>
          </View>
          <View style={styles.castList}>
            <FlatList
              horizontal={true}
              data={this.state.credits}
              renderItem={dataEntry => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Movie Details', {
                        movie: dataEntry.item,
                        title: dataEntry.item.title,
                      });
                    }}>
                    <CreditSummary
                      info={dataEntry.item}
                      style={{marginRight: 10}}
                    />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={dataEntry => dataEntry.id.toString()}
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
  },
  image: {
    width: '100%',
    height: 125,
    marginTop: 5,
    resizeMode: 'contain',
  },
  body: {
    marginTop: 10,
    textAlign: 'center',
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
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
    marginLeft: 20,
    height: 250,
  },
});
