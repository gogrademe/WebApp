import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

client.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('id_token')}`;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export function logout() {
  return client.delete('/session');
}

export function login(email, password) {
  return client.post('/session', {
    email,
    password,
  });
}

export function tokenInfo(id_token) {
  return client.post('https://gogrademe.auth0.com/tokeninfo', {id_token: id_token})
}


export function getGrades(courseId, termId) {
  return client.get(`/course/${courseId}/term/${termId}/gradebook`)
}

export const getTerms = () => client.get('/term')
