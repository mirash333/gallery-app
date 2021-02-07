import axios from 'axios';

const instance = axios.create({
// .. where we make our configurations
    baseURL: process.env.BASE_URL
});

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Authorization'] = process.env.AUTH_TOKEN;

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

// Also add/ configure interceptors && all the other cool stuff

export default instance;
