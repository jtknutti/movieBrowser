import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchPage from '../screens/search_page';
import MovieDetails from '../screens/movie_details';
import PersonDetails from '../screens/person_details';
const Stack = createStackNavigator();

export default class SearchNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchPage} />
        <Stack.Screen name="Movie Details" component={MovieDetails} />
        <Stack.Screen name="Person Details" component={PersonDetails} />
      </Stack.Navigator>
    );
  }
}
