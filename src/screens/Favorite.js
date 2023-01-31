/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';

const Favorite = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Hello World</Text>
        <Image
          source={{
            uri: 'https://source.unsplash.com/random',
          }}
          style={{width: 200, height: 200}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Favorite;
