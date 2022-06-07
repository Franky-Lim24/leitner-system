import {useEffect, useState} from 'react';
import yelp from '../api/yelp';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async searchTerm => {
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: searchTerm,
          location: 'san jose',
        },
      });
      setResults(response.data.businesses);
      setErrorMessage('');
    } catch (err) {
      console.log(err);
      setErrorMessage('Something went wrong');
    }
  };
  // /searchApi('pasta');
  useEffect(() => {
    searchApi('steak');
  }, []);
  return [searchApi, results, errorMessage];
};
