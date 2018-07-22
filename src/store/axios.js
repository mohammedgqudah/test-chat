import axios from 'axios';

const authenticated = axios.create({
    baseURL: window.location.origin + '/api',
    headers: {
        Authorization: "bearer " + localStorage.getItem('USER_TOKEN')
    }
});
const unauthenticated = axios.create({
    baseURL: window.location.origin + '/api'
});

export { authenticated };
export { unauthenticated };
