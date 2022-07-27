import axiosInstance from "../utils/AxiosInstance";

const GetBoxes = async () => {
	const res = await axiosInstance({
		method: 'get',
		url: '/api/box',
	});

	return res;
};

const CreateBox = async (box) => {
	const res = await axiosInstance({
		method: 'post',
		url: '/api/box',
		data: { box_name: box, colour: 'green' },
	});
};

const PutBox = async (box) => {
	const res = await axiosInstance({
		method: 'put',
		url: '/api/box',
		data: box,
	});
};

const PostBox = async (box) => {
	const res = await axiosInstance({
		method: 'post',
		url: '/api/box',
		data: box,
	});
};

const GetTask = async () => {
	const res = await axiosInstance({
		method: 'get',
		url: '/api/box/tasks',
	});
	return res.data;
};

export { 
	GetBoxes, 
	CreateBox, 
	PutBox, 
	PostBox, 
	GetTask 
};
