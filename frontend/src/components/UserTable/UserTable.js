import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { Badge, Button, Table } from 'reactstrap';
import orderBy from 'lodash/orderBy';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive'
import agent from "../../agent/agent"

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
        name: 'Estado',
        selector: 'status',
        sortable: true,
        right: true,
    },
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



function Tablee(props) {
    console.log(props);

    // HOOKS
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [users, setusers] = React.useState([]);

    // componentdidmount like behavior
    useEffect(() => {
        // agent.Users.getAll().then((data) => {
        //     // setusers(data);
            let users = []
            props.users.map((user, index) => {
                let status = ""

                // adds the flags
                status = user.isExpired ? <Badge color="warning">Caducado</Badge> : status
                status = user.isBlocked ? <Badge color="danger">Bloqueado</Badge> : status
                if (props.filtered_users) {
                    if (status != "") {
                        // create the data in the proper format to be displayed
                        users.push({
                            id: index,
                            user: <a href={`/user/${user.sAMAccountName}`}>{user.sAMAccountName}</a>,
                            status: status
                        })
                    }

                } else {
                    // create the data in the proper format to be displayed
                    users.push({
                        id: index,
                        user: <a href={`/user/${user.sAMAccountName}`}>{user.sAMAccountName}</a>,
                        status: status
                    })
                }

            // })

            // updates the state with the fformatted data
            setusers(users);
        })
        console.log("USERS",props.users);
        
    }, [props.users])


    // the filter text is searched in all fields of each row
    const filteredItems = users.filter(
        item => item.user && item.user.props.children.toLowerCase().includes(filterText) ||
        // item.pc && item.pc.includes(filterText) ||
        item.status && item.status.props.children.toLowerCase().includes(filterText)
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