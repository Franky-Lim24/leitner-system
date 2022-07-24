import axiosInstance from '../utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = async (user) => {
  const res = await axiosInstance({
    method: 'post',
    url: '/api/login',
    data: user, 
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  var isLoggedIn = false;

  if (res.status === 200 && res.data.access_token) {
    await AsyncStorage.setItem('token', res.data.access_token);
    await AsyncStorage.setItem('name', user.username);
    isLoggedIn = true;
  }

  return isLoggedIn;
};

const SignUp = async (user) => {
  const res = await axiosInstance({
    method: 'post',
    url: '/api/user/save',
    data: user,
  }); 

  return res.status === 201;
};

const LogOut = async () => {
  await AsyncStorage.removeItem('token');
}; 

const GetName = async () => {
  const name = await AsyncStorage.getItem('name');
  if (!name) name = '';
  return name.toString();
};

const GetBoxes = async () => {
  const res = await axiosInstance({
    method: 'get',
    url: '/api/box',
  }); 

  return res;
};

const CreateBox = async (box_name) => {
  const res = await axiosInstance({
    method: 'post',
    url: '/api/box',
  }); 

  return getAllBoxes();
};

export { SignIn, SignUp, LogOut, GetName, GetBoxes, CreateBox};