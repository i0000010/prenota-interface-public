import axios, { AxiosInstance } from 'axios'
import { API_URL } from '../../config.js'
import { userAgent } from '../browser/index.js'

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'User-Agent': userAgent,
    }
});
