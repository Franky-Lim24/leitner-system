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
    })
}

export {GetQuestion, PutQuestion};