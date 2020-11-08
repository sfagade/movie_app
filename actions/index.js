import axios from 'axios';

const BASE_URL = "http://localhost:3000";

const MOVIE_DATA = [
];

const CATEGORY_DATA = [
    { id: 'c-1', name: 'drama' },
    { id: 'c-2', name: 'action' },
    { id: 'c-3', name: 'adventeru' },
    { id: 'c-4', name: 'historical' },
];

// 1. get categoeries function
// 2. get categories in index page  

export const getCategories = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(CATEGORY_DATA);
        }, 50)
    })
}

export const getMovies = () => {

    return axios.get(`${BASE_URL}/api/v1/movies`).then((res) => {
        return res.data;
    })
}

export const createMovie = (movie) => {

    return new Promise((resolve, reject) => {
        movie.id = Math.random().toString(36).substr(2, 7);
        console.log("Movie id is: ", movie.id);
        MOVIE_DATA.push(movie);
        setTimeout(() => {
            resolve(MOVIE_DATA);
        }, 50)
    })
}

export const getMovieById = (movie_id) => {

    return axios.get(`${BASE_URL}/api/v1/movies/${movie_id}`).then(res => res.data);


    /** return new Promise((resolve) => {
        const movieIndex = MOVIE_DATA.findIndex(m => m.id === movie_id)
        const movie = MOVIE_DATA[movieIndex];
        setTimeout(() => resolve(movie), 50)
    }) */
}