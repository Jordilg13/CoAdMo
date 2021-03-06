import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

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
        superagent.del(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    update: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
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
    shutdown: (hostname) =>
        requests.get(`/host/${hostname}/shutdown`),
    restart: (hostname) =>
        requests.get(`/host/${hostname}/restart`),
    getAll: () => 
        requests.get("/host/all")
}


const Users = {
    getAll: () =>
        requests.get("/users"),
    get: username =>
        requests.get(`/user/${username}`),
    create: (username, data) =>
        requests.post(`/user/create/${username}`, { data: data }),
    update: (username, data) =>
        requests.update(`/user/update/${username}`, { data: data }),
    unlock: (dn) =>
        requests.get(`/user/unlock/${dn}`),
    delete: (dn) =>
        requests.delete(`/user/delete/${dn}`)
}
const Services = {
    getSpecific: (service, hostname) =>
        requests.get(`/monitor/${service}/${hostname}`),
    getDefault: (service) =>
        requests.get(`/monitor/${service}`),
}

export default {
    Auth,
    Host,
    Users,
    Services,
    setToken: _token => { token = _token; }
}
