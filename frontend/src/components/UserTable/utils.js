import orderBy from 'lodash/orderBy';
import agent from "../../agent/agent"
import { useMediaQuery } from 'react-responsive';

// COLUMNS THAT WILL HAVE THE DATATABLE
export const columns = [
    // {
    //     name: 'Numero',
    //     selector: 'number',
    //     sortable: true,
    // },
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

// if it's sorted by state, return the string of the badge, not the element badge
export const customSort = (rows, field, direction) => {
    const handleField = row => {
        if (!row[field]) {
            return "";
        }
        if (field === "status" || field === "user") {
            return row[field].props.children;
        }
        return row[field];
    };
    return orderBy(rows, handleField, direction);
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
        element.localName == "input" && (data['userinfo'][element.id] = element.value)
    });

    // set the jstify info
    justify.forEach(element => {
        element.localName == "textarea" && (data['just'][element.id] = element.value)
    })
    console.log(data);
    
    // POST REQUEST
    agent.Users.create(data['userinfo']['sAMAccountName'], data).then(data => {
        console.log(data);
        toggleJust()
        toggleUserInfo()
    })


}

export const updateUser = (e, data) => {
    let new_data = {}

    e.target.forEach(element => {
        console.log(element);
        if (element.localName == "input" && data[element.id] != element.value && !element.disabled) {
            console.log("ELEM", element);
            new_data[element.id] = element.value
        }
    });

    console.log("updateUser -> new_data", new_data)
    agent.Users.update(data['distinguishedName'], new_data).then(data => {
        console.log(data);

    })


}