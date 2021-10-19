import axios from 'axios';

const predictionsUrl = 'https://services.lingapps.dk/';
const access_token: string = 'Bearer MjAyMS0xMC0xMw==.cHJhZnVsbHNoZWxrZTI1QGdtYWlsLmNvbQ==.ZTM0ZjMzOTA2NDFiMDcxYWQwMjAyNGY5MzI1ZWNlOGI=';
export const apiRequestTimeout = 1000;


export enum apiSupportedLanguages {
    en = 'en-GB',
    dk = 'da-DK'
}

const axiosInstance = axios.create({
    baseURL: predictionsUrl,
    timeout: apiRequestTimeout,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${access_token}`
    }
});

export const getPredictions = async (text: String = '', lang: string = apiSupportedLanguages.dk): Promise<string[]> => {
    const url = `misc/getPredictions?locale=${lang}&text=${text}`;
    const res = await axiosInstance.get(url);
    return res.data as string[];
}