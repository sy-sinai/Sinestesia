import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default {
  // Items
  getItems: (type) => axios.get(`${API_URL}/${type}`),
  getItemById: (type, id) => axios.get(`${API_URL}/${type}/${id}`),
  getTopRatedItems: (type) => axios.get(`${API_URL}/${type}/top`),

  // Reviews
  createReview: (data, token) => axios.post(`${API_URL}/reviews`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }),
  getUserReviews: (token) => axios.get(`${API_URL}/reviews/my-reviews`, {
    headers: { Authorization: `Bearer ${token}` }
  }),

  // Auth
  login: (credentials) => axios.post(`${API_URL}/auth/login`, credentials),
  getProfile: (token) => axios.get(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
};