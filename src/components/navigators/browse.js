import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BrowsePage from '../screens/browse_screen';
import MovieDetails from '../screens/movie_details';
import GenrePage from '../screens/genre_screen';
import PersonDetails from '../screens/person_details';
const Stack = createStackNavigator();

export default class BrowseNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Browse" component={BrowsePage} />
        <Stack.Screen name="Genre Page" component={GenrePage} />
        <Stack.Screen name="Movie Details" component={MovieDetails} />
        <Stack.Screen name="Person Details" component={PersonDetails} />
      </Stack.Navigator>
    );
  }
}
