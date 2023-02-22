import axios, { AxiosInstance } from 'axios'

export const wait2SecondsAsync = async () => {
    const promiseTest: Promise<string> = new Promise((resolve, reject) => {
        setTimeout(() =>  resolve('Process finished'), 2000);
    });
    return promiseTest;
};

export const reqPokeApi: AxiosInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
});
