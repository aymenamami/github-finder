import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_GITHUB_API
});

if (process.env.NODE_ENV === "development") {
    instance.interceptors.request.use(request => {
        console.log('Sent request', request);
        return request;
    });
    
    instance.interceptors.response.use(response => {
        console.log('Received response:', response);
        return response;
    });
}

export default instance;
