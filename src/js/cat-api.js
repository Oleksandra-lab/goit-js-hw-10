import axios from "axios";


const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'live_GY9nrOlvgJyWyzy2LZQbzeyoqBx9MUWKZ7QHgGLvrMlghHtvbTN8XOeaUza3OUtD';

axios.defaults.headers.common["x-api-key"] = API_KEY;

const BREED_URL = 'https://api.thecatapi.com/v1/breeds'
const SEARCH_URL = 'https://api.thecatapi.com/v1/images/search'

export function fetchBreeds() {
    return axios.get(BREED_URL)
    .then((resp) => {
        return resp.data
    } )

}
console.log(fetchBreeds());

export function fetchCatByBreed(breedId) {
    return axios.get(`${SEARCH_URL}?breed_ids=${breedId}`)
    .then((resp) => {
        return resp.data
    } )

}
