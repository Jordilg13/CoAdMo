import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Badge, Button, Table, Row, ButtonGroup } from 'reactstrap';
import { useMediaQuery } from 'react-responsive'
import { FilterComponent } from "./FilterComponent";
// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPlus, } from '@fortawesome/free-solid-svg-icons'
// USERS
import { CreateUser } from "../User/actions/CreateUser";
import { UnlockUser } from '../User/actions/UnlockUser';
// DATATABE
import { customSort, columns } from "./utils"
import { DeleteUser } from '../User/actions/DeleteUser';
import { UserForm } from '../User/actions/UserForm';



function Tablee(props) {
    // HOOKS
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [users, setusers] = useState([]);
    const [modal, setModal] = useState(false);
    const [showPassword, setshowPassword] = useState(false)
    const toggle = () => setModal(!modal);


    // componentdidmount like behavior
    useEffect(() => {
        // agent.Users.getAll().then((data) => {
        //     // setusers(data);
        let users = []
        props.users.map((user, index) => {
            let status = ""
            let actions = (
                <ButtonGroup>
                    <UserForm action="update" user={user} />
                    <DeleteUser user={user} />
                </ButtonGroup>)

            // adds the flags
            status = user.isExpired ? <Badge color="warning">Caducado</Badge> : status
            status = user.isBlocked ? <Badge color="danger">Bloqueado</Badge> : status

            actions = user.isBlocked ? (
                <ButtonGroup>
                    <UnlockUser user={user} />
                    <UserForm action="update" user={user} />
                    <DeleteUser user={user} />
                </ButtonGroup>) : actions
            if (props.filtered_users) {
                if (status != "") {
                    // create the data in the proper format to be displayed
                    users.push({
                        id: index,
                        user: <a href={`/user/${user.sAMAccountName}`}>{user.sAMAccountName}</a>,
                        status: status,
                        actions: actions
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
            // updates the state with the fformatted data
            setusers(users);
        })
        console.log("USERS", props.users);

    }, [props.users])


    // the filter text is searched in all fields of each row
    const filteredItems = users.filter(
        item => item.user && item.user.props.children.toLowerCase().includes(filterText) ||
            // item.pc && item.pc.includes(filterText) ||
            item.status && item.status.props.children.toLowerCase().includes(filterText)
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
                <UserForm action="create" />
                <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
            </>);
    }, [filterText, resetPaginationToggle]);



    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
        <>
            {/* CREATE USER MODAL */}
            <CreateUser
                modal={modal}
                toggle={toggle}
                classes={props}
                showPassword={showPassword}
                ssp={setshowPassword} />
            {
                isTabletOrMobile ?
                    (
                        <Table>
                            <tr>
                                <th>Desbloquear Usuario</th>
                                <Button
                                    color="secondary"
                                    onClick={toggle}
                                >
                                    <FontAwesomeIcon icon={faUserPlus} />
                                </Button>
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
                        />
                    </>)


            }
        </>
    )
};

export default Tablee;