import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import { showNotify } from 'vant';

const white_list = ['/login'];

const api =
    import.meta.env.VITE_BASE_API === '/api'
        ? '/api'
        : import.meta.env.VITE_BASE_API;
const baseURL = document.location.protocol + api;

class CustomAxiosInstance {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL,
            timeout: 50000,
            headers: { 'Content-Type': 'application/json' },
        });
        this.setInterceptors();
    }

    setInterceptors() {
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                if (!white_list.includes(config.url as string)) {
                    const token = localStorage.getItem('token');
                    if (token)
                        config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            },
        );

        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                if (response.data.code === 200) {
                    return response;
                } else {
                    showNotify({
                        type: 'danger',
                        message:
                            response.data?.msg || '请求错误，请联系管理员#1',
                    });
                    return Promise.reject(response);
                }
            },
            (error: AxiosError<HttpClientResponse<object>>) => {
                showNotify({
                    type: 'danger',
                    message: error?.message || '请求错误，请联系管理员#2',
                });
                return new Promise(() => ({}));
            },
        );
    }
}

export default CustomAxiosInstance;
