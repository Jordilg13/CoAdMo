import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "http://192.168.1.107:8000";

// const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {

    if (token) {
        req.set('authorization', `Token ${token}`);
    }
}

const requests = {
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
}

const Auth = {
    login: (username, password) =>
        requests.post("/login", { user: { username, password } }),
}

const Host = {
    get: (hostname,property) =>
        requests.get(`/${hostname}/${property}`),
}

export default {
    Auth,
    setToken: _token => { token = _token; }
}
