import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Favorite from '../screens/Favorite';

const Stack = createStackNavigator();

const FavoriteNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavoriteStack"
        component={Favorite}
        options={{
          title: 'Favoritos',
        }}
      />
    </Stack.Navigator>
  );
};

export default FavoriteNavigation;
