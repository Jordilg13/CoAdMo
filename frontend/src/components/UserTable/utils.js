import agent from "../../agent/agent"
import orderBy from 'lodash/orderBy';
import { store } from "../../store/store"
import toast from "toastr"

// COLUMNS THAT WILL HAVE THE DATATABLE
export const columns = [
    {
        name: 'Usuario',
        selector: 'user',
        sortable: true,
    },
    {
        name: 'Estado',
        selector: 'status',
        sortable: true,
        right: true,
    },
    {
        name: 'Acciones',
        selector: 'actions',
        sortable: true,
        right: true,
    },
];

export const columnsMobile = [
    {
        name: 'Usuario',
        selector: 'user',
        sortable: true,
    },
    {
        name: 'Acciones',
        selector: 'actions',
        sortable: true,
        right: true,
    },
];

// if it's sorted by state, return the string of the badge, not the element badge
export const customSort = (rows, field, direction) => {
    // IF IS CLICKED ON A FIELD
    // ORDER BY THIS FIELD
    if (field) {
        const handleField = row => {
            console.log("customSort -> field", field)
            console.log("customSort -> row", row)

            if (!row[field]) return "" // if the value is empty
            // if the field is status or user, check the props.children value
            if (field === "status") return row[field][0]?.props.children;
            if (field === "user") return row[field].props.children;
            return row[field]; // any other case sort by the normal value of the field
        };
        return orderBy(rows, handleField, direction);
    } else {
        // BY DEFAULT ORDER BY STATUS TO MAKE BLOCKED USERS
        // APPEAR FIRST
        const handleField = row => {
            if (!row[field]) return "" // if the value is empty
            // if the user is blocked, put at the top of the list
            if (row["status"].props.children === "Bloqueado") return row["status"][0].props.children
            return row["name"] // any other case sort by name
        };
        return orderBy(rows, handleField, "desc");
    }
};


export const createUser = (e, formdata, toggleJust, toggleUserInfo) => {
    e.preventDefault()
    const userinfo = formdata
    const justify = e.target

    let data = {
        "userinfo": {},
        "just": {}
    }

    // set the user info
    userinfo.forEach(element => {
        element.localName === "input" && (data['userinfo'][element.id] = element.value)
    });

    // set the jstify info
    justify.forEach(element => {
        element.localName === "textarea" && (data['just'][element.id] = element.value)
    })
    console.log(data);

    // POST REQUEST
    agent.Users.create(data['userinfo']['sAMAccountName'], data).then(data => {
        console.log(data);
        toggleJust()
        toggleUserInfo()
        toast.success("Usuario creado correctamente.", "Creado")
        store.dispatch({ type: "GET_USERS", payload: agent.Users.getAll() })
    })


}

export const updateUser = (e, data, toggle) => {
    let new_data = {}

    e.target.forEach(element => {
        console.log(element);
        if (element.localName === "input" && data[element.id] !== element.value && !element.disabled) {
            console.log("ELEM", element);
            new_data[element.id] = element.value
        }
    });

    console.log("updateUser -> e", e.target[0].value)
    agent.Users.update(data['distinguishedName'], new_data).then(data => {
        console.log(data);
        if (data == 2) {
            toggle()
            toast.success("Usuario actualizado correctamente.", "Actualizado")
            store.dispatch({ type: "GET_USERS", payload: agent.Users.getAll() })
        }
    })


}