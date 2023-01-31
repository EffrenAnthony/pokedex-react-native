import axios from 'axios';
import {API_HOST} from '../uitils/constants';

export async function getPokemonsApi(endpointUrl) {
  try {
    const url = `${API_HOST}/pokemon?limit=20&offset=0`;
    const {data} = await axios.get(endpointUrl || url);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonDetailsByUrlApi(url) {
  try {
    const {data} = await axios.get(url);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonDetailsApi(id) {
  try {
    const url = `${API_HOST}/pokemon/${id}`;
    const {data} = await axios.get(url);
    return data;
  } catch (error) {
    throw error;
  }
}
