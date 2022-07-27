import axiosInstance from '../utils/AxiosInstance';

const GetQuestion = async(boxId) => {
	const res = await axiosInstance({
		method: 'get',
		url: `api/question/${boxId}`,
	})
	return res; 
}

const PutQuestion = async(question) => {
	const res = await axiosInstance({
		method: 'put',
		url: 'api/question',
		data: question,
    })
}

const CreateQuestions = async (questionsData) => {
	const res = await axiosInstance({
	  method: 'post',
	  url: '/api/question/{boxID}',
	  data: questionsData
	})
  }

export {
	GetQuestion, 
	PutQuestion, 
	CreateQuestions
};