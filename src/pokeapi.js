import axios from 'axios'

export const wait2SecondsAsync = async (showError = false) => {
    const promiseTest = new Promise((resolve, reject) => {
        setTimeout(() => !showError ? resolve('Process finished') : reject('Process error'), 2000);
    });
    return promiseTest;
};

export const reqPokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
});
