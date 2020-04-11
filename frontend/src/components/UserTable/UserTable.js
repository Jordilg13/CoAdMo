import React from 'react'
import DataTable from 'react-data-table-component';
import { Badge, Button, Table } from 'reactstrap';
import orderBy from 'lodash/orderBy';
import styled from 'styled-components';
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

const data = [
    { id: 1, user: <a href="/host/django">django</a>, pc: "1192.168.1.150", state: <Badge color="danger">Bloqueado</Badge>, actions: <Button color="success">Desbloquear</Button> },
    { id: 2, user: <a href="/host/django">django</a>, pc: "pc-jordi", state: <Badge color="danger">Bloqueado</Badge> },
    { id: 3, user: <a href="/host/django">django</a>, pc: "pc-jordi" },
    { id: 4, user: <a href="/host/django">django</a>, pc: "pc-jordi" },
    { id: 5, user: <a href="/host/django">django</a>, pc: "pc-jordi", state: <Badge color="danger">Bloqueado</Badge> },
    { id: 6, user: <a href="/host/django">django</a>, pc: "pc-jordi", state: <Badge color="warning">Caducado</Badge>, actions: <Button color="success" disabled>Desbloquear</Button> },
    { id: 7, user: <a href="/host/django">django</a>, pc: "pc-jordi" },
    { id: 8, user: <a href="/host/django">django</a>, pc: "pc-jordi", state: <Badge color="danger">Bloqueado</Badge> },
    { id: 9, user: <a href="/host/django">django</a>, pc: "pc-jordi", state: <Badge color="danger">Bloqueado</Badge> },
    { id: 10, user: <a href="/host/django">django</a>, pc: "pc-jordi", state: <Badge color="danger">Bloqueado</Badge> },
    { id: 11, user: <a href="/host/django">pepe</a>, pc: "ptt-jordi", state: <Badge color="danger">Bloqueado</Badge> },
];

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <TextField id="search" type="text" placeholder="Filter By Name" value={filterText} onChange={onFilter} />
        <ClearButton type="button" onClick={onClear}>X</ClearButton>
    </>
);



function Tablee() {
    // HOOKS
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    // the filter text is searched in all fields of each row
    const filteredItems = data.filter(
        item => item.user && item.user.props.children.toLowerCase().includes(filterText) ||
                item.pc && item.pc.includes(filterText) ||
                item.state && item.state.props.children.toLowerCase().includes(filterText) 
                );

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
    }, [filterText, resetPaginationToggle]);

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
        <>
            {
                isTabletOrMobile ?
                    (
                        // <DataTable
                        //     title="Desbloquear"
                        //     columns={columns_mobile}
                        //     data={data_mobile}
                        //     pagination={true}
                        // />
                        <Table>
                            <tr>
                                <th>Desbloquear Usuario</th>
                            </tr>
                            <tr>
                                <td><Button color="success" >username1</Button></td>
                            </tr>
                            <tr>
                                <td><Button color="success" >username2</Button></td>
                            </tr>
                            <tr>
                                <td><Button color="success" disabled>username3</Button></td>
                            </tr>
                        </Table>
                        // <></>
                    ) : (
                        <DataTable
                            title="Usuarios"
                            columns={columns}
                            data={filteredItems}
                            pagination
                            paginationResetDefaultPage={resetPaginationToggle}
                            sortFunction={customSort}
                            subHeader
                            subHeaderComponent={subHeaderComponentMemo}
                            persistTableHead
                        />
                    )


            }
        </>
    )
};

export default Tablee;