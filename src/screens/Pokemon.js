import {ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPokemonDetailsApi} from '../api/pokemon';
import Header from '../components/Pokemon/Header';
import Type from '../components/Pokemon/Type';
import Stats from '../components/Pokemon/Stats';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Pokemon = props => {
  const {
    route: {params},
    navigation,
  } = props;
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => null,
      headerLeft: () => (
        <Icon
          name="arrow-left"
          color="#fff"
          size={25}
          style={styles.leftIcon}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsApi(params.id);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params, navigation]);

  if (!pokemon) {
    return null;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header
        name={pokemon.name}
        order={pokemon.id}
        image={pokemon.sprites.other['official-artwork'].front_default}
        type={pokemon.types[0].type.name}
      />
      <Type types={pokemon.types} />
      <Stats stats={pokemon.stats} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  leftIcon: {
    marginLeft: 20,
    marginBottom: 5,
  },
});

export default Pokemon;
