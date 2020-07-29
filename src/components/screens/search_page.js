import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MovieService from '../../services/movie.service';
import MovieSummary from '../MovieSummary';
import PersonSummary from '../PersonSummary';

export default class SearchPage extends React.Component {
  state = {
    currentPage: 1,
    results: [],
    loading: true,
    allLoaded: false,
    searchTerm: '',
    selectedOption: 'movie',
  };
  getResultsFromSearchQuery = async () => {
    try {
      const results = await MovieService.search(
        this.state.searchTerm,
        this.state.selectedOption,
        1,
      );
      this.setState({results: results, loading: false, currentPage: 1});
    } catch (e) {
      console.log(e);
    }
  };
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedOption === this.state.selectedOption) {
      if (prevState.searchTerm === this.state.searchTerm) return;
    }
    this.getResultsFromSearchQuery();
  }
  loadMoreResults = () => {
    if (this.state.loading) return;
    if (this.state.allLoaded) return;

    this.setState({loading: true}, async () => {
      try {
        const newResults = await MovieService.search(
          this.state.searchTerm,
          this.state.selectedOption,
          this.state.currentPage + 1,
        );
        this.setState(state => {
          const newState = {...state};
          newState.results = [...state.results, ...newResults];
          newState.currentPage = state.currentPage + 1;
          newState.loading = false;
          if (newResults.length === 0) {
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.searchTerm}
            onChangeText={newText => {
              this.setState({searchTerm: newText, results: []});
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 30,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={
              this.state.selectedOption === 'movie'
                ? styles.switchButtonActive
                : styles.switchButtonInactive
            }
            onPress={() => {
              this.setState({selectedOption: 'movie', results: []});
            }}>
            <Text
              style={
                this.state.selectedOption === 'movie'
                  ? styles.textActive
                  : styles.textInactive
              }>
              Movies
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.selectedOption === 'person'
                ? styles.switchButtonActive
                : styles.switchButtonInactive
            }
            onPress={() => {
              this.setState({selectedOption: 'person', results: []});
            }}>
            <Text
              style={
                this.state.selectedOption === 'person'
                  ? styles.textActive
                  : styles.textInactive
              }>
              People
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.results}
          renderItem={dataEntry => {
            if (this.state.selectedOption === 'movie') {
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
            }
            return (
              <PersonSummary
                person={dataEntry.item}
                onPress={() => {
                  this.props.navigation.navigate('Person Details', {
                    person: dataEntry.item,
                  });
                }}
              />
            );
          }}
          onEndReached={this.loadMoreResults}
          keyExtractor={result => `result_${result.id}`}
          style={{marginBottom: 90}}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    marginTop: 10,
  },
  input: {
    height: 40,
  },
  switchButtonActive: {
    height: 30,
    width: 60,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  switchButtonInactive: {
    height: 30,
    width: 60,
    borderWidth: 1,
    borderRadius: 1,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textActive: {
    color: 'white',
  },
  textInactive: {
    color: 'blue',
  },
});
