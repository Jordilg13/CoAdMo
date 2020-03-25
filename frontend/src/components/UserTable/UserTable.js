import React from 'react'
import DataTable from 'react-data-table-component';
import { Badge, Button, Table } from 'reactstrap';
import orderBy from 'lodash/orderBy';

import { useMediaQuery } from 'react-responsive'


// if it's sorted by state, return the string of the badge, not the element badge
const customSort = (rows, field, direction) => {
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


const data_mobile = [
    { id: 1, desbloc_user: <Button color="success">Desbloquear rlv</Button> },
    { id: 2, desbloc_user: <Button color="success">Desbloquear rlv</Button> },
    { id: 3, desbloc_user: <Button color="success">Desbloquear rlv</Button> },
    { id: 4, desbloc_user: <Button color="success">Desbloquear rlv</Button> },
    { id: 5, desbloc_user: <Button color="success">Desbloquear rlv</Button> },
    { id: 6, desbloc_user: <Button color="success">Desbloquear rlv</Button> },
    { id: 7, desbloc_user: <Button color="success">Desbloquear rlv</Button> },
    { id: 8, desbloc_user: <Button color="success">Desbloquear rlv</Button> },
    { id: 9, desbloc_user: <Button color="success">Desbloquear rlv</Button> },
    { id: 10, desbloc_user: <Button color="success">Desbloquear rlv</Button> },
    { id: 11, desbloc_user: <Button color="success">Desbloquear rlv</Button> },
];

const columns = [
    {
        name: 'Usuario',
        selector: 'user',
        sortable: true,
    },
    {
        name: 'Equipo',
        selector: 'pc',
        sortable: true,
        right: true,
    },
    {
        name: 'Estado',
        selector: 'state',
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

const columns_mobile = [
    {
        name: 'Usuario',
        selector: 'desbloc_user',
        sortable: true,
    }
];

const data = [
    { id: 1, user: 'Rafa Llopis ', pc: "pc-rlv", state: <Badge color="danger">Bloqueado</Badge>, actions: <Button color="success">Desbloquear</Button> },
    { id: 2, user: 'Rafa Llopis', pc: "pc-rlv", state: <Badge color="danger">Bloqueado</Badge> },
    { id: 3, user: 'Rafa Llopis', pc: "pc-rlv" },
    { id: 4, user: 'Rafa Llopis', pc: "pc-rlv" },
    { id: 5, user: 'Rafa Llopis', pc: "pc-rlv", state: <Badge color="danger">Bloqueado</Badge> },
    { id: 6, user: 'Rafa Llopis', pc: "pc-rlv", state: <Badge color="warning">Caducado</Badge>, actions: <Button color="success" disabled>Desbloquear</Button> },
    { id: 7, user: 'Rafa Llopis', pc: "pc-rlv" },
    { id: 8, user: 'Rafa Llopis', pc: "pc-rlv", state: <Badge color="danger">Bloqueado</Badge> },
    { id: 9, user: 'Rafa Llopis', pc: "pc-rlv", state: <Badge color="danger">Bloqueado</Badge> },
    { id: 10, user: 'Rafa Llopis', pc: "pc-rlv", state: <Badge color="danger">Bloqueado</Badge> },
    { id: 11, user: 'Rafa Llopis  ', pc: "pc-rlv", state: <Badge color="danger">Bloqueado</Badge> },
];



function Tablee() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    return (
        <>
            {
                !isTabletOrMobile ?
                    (
                        // <DataTable
                        //     title="Desbloquear"
                        //     columns={columns_mobile}
                        //     data={data_mobile}
                        //     pagination={true}
                        // />
                        <Table>
                            <tr>
                                <th>Usuario</th>
                            </tr>
                            <tr>
                                <td><Button color="success" disabled>Desbloquear</Button></td>
                            </tr>
                        // </Table>
                        // <></>
                    ) : (
                        <DataTable
                            title="Usuarios"
                            columns={columns}
                            data={data}
                            pagination={true}
                            sortFunction={customSort}
                        />
                    )


            }
        </>
    )
};

export default Tablee;