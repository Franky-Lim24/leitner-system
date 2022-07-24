import axiosInstance from '../utils/AxiosInstance';

const GetQuestion = async(boxId) => {
	const res = await axiosInstance({
		method: 'get',
		url: `api/box/${boxId}`,
	})
	return res.data; //or res?? idk
}

const PutQuestion = async(question) => {
	const res = await axiosInstance({
		method: 'put',
		url: 'api/question',
		data: question,
		headers: { 'Content-Type': 'multipart/form-data' },  //idk if this is correct
		})
}

export {GetQuestion, PutQuestion};