import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import getColorByPokemonType from '../uitils/getColorByPokemonType';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
const PokemonCard = ({id, name, type, order, image}) => {
  const {navigate} = useNavigation();

  const pokemonColor = getColorByPokemonType(type);

  const bgStyles = {
    backgroundColor: pokemonColor,
    ...styles.bgStyles,
  };

  const goToPokemon = () => {
    navigate('Pokemon', {id});
  };

  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={bgStyles}>
            <Text style={styles.number}>#{`${order}`.padStart(3, 0)}</Text>
            <Text style={styles.name}>{_.capitalize(name)}</Text>
            <Image source={{uri: image}} style={styles.image} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },
  image: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 90,
    height: 90,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 10,
  },
  number: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: '#fff',
    fontSize: 11,
  },
});
