import orderBy from 'lodash/orderBy';
import agent from "../../agent/agent"
import { useMediaQuery } from 'react-responsive';

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

// if it's sorted by state, return the string of the badge, not the element badge
export const customSort = (rows, field, direction) => {
    const handleField = row => {
        if (!row[field]) {
            return "";
        }
        if (field === "state") {
            return row[field].props.children;
        }
        return row[field];
    };
    return orderBy(rows, handleField, direction);
};


export const submitUser = e => {
    e.preventDefault();

    let data = {}
    e.target.forEach(element => {
        element.localName == "input" && (data[element.id] = element.value)
    });
    agent.Users.create(data).then(data => {
        console.log(data);

    })


}