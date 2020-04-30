import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { Badge, Button, Table, Row, ButtonGroup, Spinner } from 'reactstrap';
import { useMediaQuery } from 'react-responsive'
import { FilterComponent } from "./FilterComponent";
// FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPlus, } from '@fortawesome/free-solid-svg-icons'
// USERS
import { UnlockUser } from '../User/actions/UnlockUser';
// DATATABE
import { customSort, columns } from "./utils"
import { DeleteUser } from '../User/actions/DeleteUser';
import { UserForm } from '../User/actions/UserForm';
import agent from '../../agent/agent';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const CustomLoader = () => (<Spinner></Spinner>);
const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
const LinearIndeterminate = () => {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    );
  };



function Tablee(props) {
    // HOOKS
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [users, setusers] = useState([]);
    const [modal, setModal] = useState(false);
    const [pending, setpending] = useState(true);
    const [showPassword, setshowPassword] = useState(false);
    const toggle = () => setModal(!modal);

    // componentdidmount like behavior
    useEffect(() => {

        agent.Users.getAll().then(users => {
            console.log("Tablee -> users", users)
            users.map((user, index) => {
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
            console.log("USERS", props.users);
        })



    }, [])


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

export default Tablee;