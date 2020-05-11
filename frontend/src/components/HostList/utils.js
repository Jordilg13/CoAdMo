import orderBy from 'lodash/orderBy';

// COLUMNS THAT WILL HAVE THE DATATABLE
export const columns = [
    {
        name: 'PC',
        selector: 'pc',
        sortable: true,
    }
];

// if it's sorted by state, return the string of the badge, not the element badge
export const customSort = (rows, field, direction) => {
    // IF IS CLICKED ON A FIELD
    // ORDER BY THIS FIELD
    const handleField = row => {
        if (!row[field]) return "" // if the value is empty
        if (field === "pc") return row[field].props.children;
        return row[field]; // any other case sort by the normal value of the field
    };
    return orderBy(rows, handleField, direction);

};
