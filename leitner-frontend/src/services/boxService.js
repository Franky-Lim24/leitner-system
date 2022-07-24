import axiosInstance from '../utils/AxiosInstance';

const GetBox = async() => {
	const res = await axiosInstance({
		method: 'get',
		url: 'api/box',
	})
	return res.data;  //or res?? idk
}

const PutBox = async(box) => {
	const res = await axiosInstance({
		method: 'put',
		url: 'api/box',
		data: box,
		//headers: { 'Content-Type': 'multipart/form-data' },  //idk if this is correct
		})
}

const PostBox = async(box) => {
	const res = await axiosInstance({
		method: 'post',
		url: 'api/box',
		data: box,
		})
}

const GetTask = async() => {
	const res = await axiosInstance({
		method: 'get',
		url: 'api/box/task',
	})
	return res.data;
}

export {GetBox, PutBox, PostBox, GetTask};