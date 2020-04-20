import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';



const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "http://192.168.1.13:8000";

// const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {

    if (token) {
        req.set('authorization', `Token ${token}`);
    }
}

// check if it returned 403 and redirect to the login if the user isn't logged in
const chech403 = err => {
    if (err.response.statusCode == 403) {
        window.location.href = "/login"
    }
}

const requests = {
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody).catch(chech403),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody).catch(chech403),
}

const Auth = {
    login: (username, password) =>
        requests.post("/login", { user: { username, password } }),
    current: () =>
        requests.get("/logged_user"),
}

const Host = {
    get: (hostname,property) =>
        requests.get(`/host/${hostname}/${property}`),
}

const Users = {
    getAll: () =>
        requests.get("/users"),
    get: username => 
        requests.get(`/user/${username}`),
}

export default {
    Auth,
    Host,
    Users,
    setToken: _token => { token = _token; }
}
