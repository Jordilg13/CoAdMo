import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Badge, Button, Table, ButtonGroup } from 'reactstrap';
import { useMediaQuery } from 'react-responsive'
import { FilterComponent } from "./FilterComponent";
// USERS
import { UnlockUser } from '../User/actions/UnlockUser';
// DATATABE
import { customSort, columns } from "./utils"
import { DeleteUser } from '../User/actions/DeleteUser';
import { UserForm } from '../User/actions/UserForm';
import agent from '../../agent/agent';
import LinearIndeterminate from "./LinearIndeterminate"


function UserTable(props) {
    // HOOKS
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [users, setusers] = useState([]);
    const [pending, setpending] = useState(true);

    // componentdidmount like behavior
    useEffect(() => {

        agent.Users.getAll().then(users => {
            console.log("UserTable -> users", users)
            users.map((user, index) => {
                let status = ""
                // default actions
                let actions = (
                    <ButtonGroup>
                        <UserForm action="update" user={user} />
                        <DeleteUser user={user} />
                    </ButtonGroup>)

                // adds the flags
                status = user.isExpired ? <Badge color="warning">Caducado</Badge> : status
                status = user.isBlocked ? <Badge color="danger">Bloqueado</Badge> : status

                // adds the actions
                actions = user.isBlocked ? (
                    <ButtonGroup>
                        <UnlockUser user={user} />
                        <UserForm action="update" user={user} />
                        <DeleteUser user={user} />
                    </ButtonGroup>) : actions

                // if the table should be filtered or not
                // if is filtered, only the users with something in the status
                // will be displayed
                if (props.filtered_users) {
                    if (status !== "") {
                        // create the data in the proper format to be displayed
                        users.push({
                            id: index,
                            user: <a href={`/user/${user.sAMAccountName}`}>{user.sAMAccountName}</a>,
                            status: status,
                            actions: actions,
                            number: user.employeeNumber
                        })
                    }
                } else {
                    // create the data in the proper format to be displayed
                    users.push({
                        id: index,
                        user: <a href={`/user/${user.sAMAccountName}`}>{user.sAMAccountName}</a>,
                        status: status,
                        actions: actions,
                        number: user.employeeNumber
                    })
                }
            })
            // updates the state with the fformatted data
            setusers(users)
            setpending(false);
        })
    }, [])

    // the filter text is searched in all fields of each row
    const filteredItems = users.filter(
        item => (
            item.user && item.user.props.children.toLowerCase().includes(filterText) || item.status && item.status.props.children.toLowerCase().includes(filterText)
        )
    );

    // COMPONENT SUBHEADER
    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        return (
            // SUBHEADER OF THE DATATABLE (search bar and add user btn)
            <>
                <UserForm action="create" style={{ position: "absolute", top: "-40px", right: "16px" }} />
                <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
            </>);
    }, [filterText, resetPaginationToggle]);



    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
        <>
            {/* CREATE USER MODAL */}
            {
                isTabletOrMobile ?
                    (
                        <Table>
                            <tr>
                                <th>Desbloquear Usuario <UserForm action="create" /></th>
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
                    ) : (<>
                        {/* DATATABLE WITH USERS */}
                        <DataTable
                            columns={columns}
                            data={filteredItems}
                            pagination
                            paginationResetDefaultPage={resetPaginationToggle}
                            sortFunction={customSort}
                            subHeader
                            subHeaderComponent={subHeaderComponentMemo}
                            persistTableHead
                            progressPending={pending}
                            progressComponent={<LinearIndeterminate />}
                        />
                    </>)


            }
        </>
    )
};

export default UserTable;