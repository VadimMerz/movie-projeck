import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY;

// const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;



const url = `https://api.themoviedb.org/3`

async function getPopular() {
    const popular = `/movie/popular?api_key=${API_KEY}`
    const response = await axios.get(url + popular)
    const resPopular = response.data
    return resPopular
}

async function getTopRated() {
    const topRated = `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    const response = await axios.get(url + topRated)
    const resTopRated = response.data
    return resTopRated
}

async function getOneMovie(id: string | undefined) {
    const oneMovie = `/movie/${id}?api_key=${API_KEY}&language=en-US`
    const response = await axios.get(url + oneMovie)
    const resOneMovie = response.data
    return resOneMovie
}

async function getAge(id: string | undefined) {
    const ageUrl = `/movie/${id}/release_dates?api_key=${API_KEY}`
    const response = await axios.get(url + ageUrl)
    const resAge = response.data
    return resAge
}

async function searchMovie(name: string) {
    const search = `/search/movie?api_key=${API_KEY}&query=${name}`
    const response = await axios.get(url + search)
    const resSearch = response.data
    return resSearch
}


export { getAge, getOneMovie, getPopular, getTopRated, searchMovie };

