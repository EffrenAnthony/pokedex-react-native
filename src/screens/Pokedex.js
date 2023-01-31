import {SafeAreaView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {getPokemonDetailsByUrlApi, getPokemonsApi} from '../api/pokemon';
import PokemonList from '../components/PokemonList';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  //TODO hacer hook useService para tener un error y un loading

  const loadPokemons = useCallback(async () => {
    try {
      setLoading(true);
      const {results: pokemonsResponse, next: nextPokemonListUrl} =
        await getPokemonsApi(nextUrl);
      setNextUrl(nextPokemonListUrl);
      const pokemonsArray = [];
      for await (const pokemon of pokemonsResponse) {
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.id,
          image: pokemonDetails.sprites.other['official-artwork'].front_default,
        });
      }
      setPokemons([...pokemons, ...pokemonsArray]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [pokemons, nextUrl]);

  return (
    <SafeAreaView>
      <PokemonList
        pokemons={pokemons}
        loadPokemons={loadPokemons}
        isNext={nextUrl}
        isLoading={loading}
      />
    </SafeAreaView>
  );
};

export default Pokedex;

// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import axios from 'axios';

// const Pokedex = () => {
//   const [pokemonList, setPokemonList] = useState([]);
//   const [searchText, setSearchText] = useState('');

//   useEffect(() => {
//     const fetchPokemon = async () => {
//       const response = await axios.get(
//         'https://pokeapi.co/api/v2/pokemon?limit=151',
//       );
//       setPokemonList(response.data.results);
//     };
//     fetchPokemon();
//   }, []);

//   const renderPokemon = ({item}) => {
//     return (
//       <TouchableOpacity
//         style={styles.cardContainer}
//         onPress={() => console.log('Pokemon Details')}>
//         <Image
//           style={styles.pokemonImage}
//           source={{
//             uri: `https://img.pokemondb.net/artwork/${item.name}.jpg`,
//           }}
//         />
//         <Text style={styles.pokemonName}>{item.name}</Text>
//       </TouchableOpacity>
//     );
//   };

//   const filteredPokemonList = pokemonList.filter(pokemon =>
//     pokemon.name.toLowerCase().includes(searchText.toLowerCase()),
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.searchContainer}>
//         <Text style={styles.searchText}>Search:</Text>
//         <TextInput
//           style={styles.searchInput}
//           onChangeText={text => setSearchText(text)}
//           value={searchText}
//         />
//       </View>
//       <FlatList
//         data={filteredPokemonList}
//         renderItem={renderPokemon}
//         keyExtractor={item => item.name}
//         numColumns={3}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 24,
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   searchText: {
//     fontSize: 18,
//     marginRight: 10,
//   },
//   searchInput: {
//     height: 40,
//     width: 200,
//     borderWidth: 1,
//     padding: 10,
//   },
//   cardContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 100,
//     height: 150,
//     margin: 10,
//     backgroundColor: '#f2f2f2',
//     borderRadius: 1,
//   },
//   pokemonName: {
//     fontSize: 15,
//     fontWeight: 'bold',
//   },
//   pokemonImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 5,
//   },
// });

// export default Pokedex;
// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   SafeAreaView,
//   FlatList,
//   StyleSheet,
// } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   pokemonContainer: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   pokemonName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 16,
//   },
//   pokemonImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
// });

// const PokemonList = () => {
//   const [pokemonData, setPokemonData] = useState([]);

//   useEffect(() => {
//     fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
//       .then(response => response.json())
//       .then(data => {
//         setPokemonData(data.results);
//       });
//   }, []);

//   const renderPokemon = ({item}) => {
//     return (
//       <View style={styles.pokemonContainer}>
//         <Image
//           source={{
//             uri: `https://img.pokemondb.net/artwork/${item.name}.jpg`,
//           }}
//           style={styles.pokemonImage}
//         />
//         <Text style={styles.pokemonName}>{item.name}</Text>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={pokemonData}
//         keyExtractor={item => item.name}
//         renderItem={renderPokemon}
//       />
//     </SafeAreaView>
//   );
// };

// export default PokemonList;

// import React, {useState, useEffect} from 'react';
// import {View, Text, Image, SafeAreaView, FlatList} from 'react-native';

// const PokeDex = () => {
//   const [pokemonData, setPokemonData] = useState([]);

//   useEffect(() => {
//     fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
//       .then(response => response.json())
//       .then(data => {
//         setPokemonData(data.results);
//       });
//   }, []);

//   const renderPokemon = ({item}) => {
//     // const id = item.url.split('/')[6];

//     return (
//       <View>
//         <Text>{item.name}</Text>
//         <Image
//           source={{
//             uri: `https://img.pokemondb.net/artwork/${item.name}.jpg`,
//           }}
//           style={{width: 100, height: 100}}
//         />
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView>
//       <FlatList
//         data={pokemonData}
//         keyExtractor={item => item.name}
//         renderItem={renderPokemon}
//       />
//     </SafeAreaView>
//   );
// };

// export default PokeDex;
