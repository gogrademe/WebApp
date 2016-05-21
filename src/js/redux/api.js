import axios from 'axios';
//
// axios.interceptors.request.use(config => {
//   const headers = Object.assign({}, config.headers, { 'X-CSRF-Token': window.__DATA__.csrfToken });
//   return Object.assign({}, config, { headers });
// }, error => Promise.reject(error));

const client = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 1000,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('id_token')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export function logout() {
  return client.delete('/session');
}

export function tokenInfo(id_token) {
  return client.post('https://gogrademe.auth0.com/tokeninfo', {id_token: id_token})
}
export function login(email, password) {
  return client.post('/session', {
    email,
    password,
  });
}


export function getGrades(courseId, termId) {
  return client.get(`/course/${courseId}/term/${termId}/gradebook`)
}
