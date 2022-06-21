import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer HIWZwqyKn1-ooRX4K_Q6Y_E1EewneDZdwh9HK1zO1I1KHmfmN0UgQYl6uWcnETzDLMgxhVjCJ7_kVBMxwetAaYz1Z1ZSZpw_w7BxINFXVQ_EFkxykpPdT0nQ0qszYHYx',
  },
});
