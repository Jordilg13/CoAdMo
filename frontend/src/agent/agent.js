import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';



const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "http://192.168.1.13:8000";

// const encode = encodeURIComponent;
const responseBody = res => res.body

let token = null;
const tokenPlugin = req => {

    if (token) {
        req.set('authorization', `Token ${token}`);
    }
}


const requests = {
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    delete: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
}

const Auth = {
    login: (username, password) =>
        requests.post("/login", { user: { username, password } }),
    current: () =>
        requests.get("/logged_user"),
}

const Host = {
    get: (hostname, property) =>
        requests.get(`/host/${hostname}/${property}`),
}

const Users = {
    getAll: () =>
        requests.get("/users"),
    get: username =>
        requests.get(`/user/${username}`),
    create: data =>
        requests.post(`/user/create/${data['SamAccountName']}`, { data: data })
}

export default {
    Auth,
    Host,
    Users,
    setToken: _token => { token = _token; }
}
