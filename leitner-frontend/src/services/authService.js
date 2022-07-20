import axiosInstance from '../utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = async (user) => {
	const res = await axiosInstance({
		method: 'post',
		url: '/api/login',
		data: user,
		headers: { 'Content-Type': 'multipart/form-data' },
	});

	if (res.status === 200 && res.data.access_token)
		await AsyncStorage.setItem('token', res.data.access_token);

	return res;
};

export { SignIn };
