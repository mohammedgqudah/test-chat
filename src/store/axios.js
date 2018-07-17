import axios from 'axios';

const authenticated = axios.create({
    baseURL: window.location.origin + '/api',
    headers: {
        Authorization: localStorage.getItem('USER-TOKEN')
    }
});
const unauthenticated = axios.create({
    baseURL: window.location.origin + '/api'
});

export { authenticated };
export { unauthenticated };
