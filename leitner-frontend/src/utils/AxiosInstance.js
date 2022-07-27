import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
	baseURL: 'https://heap-leitner.uc.r.appspot.com',
	headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem('token');
		if (
			!(
				config.url.includes('/api/login') ||
				config.url.includes('/api/user/save')
			)
		) {
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
