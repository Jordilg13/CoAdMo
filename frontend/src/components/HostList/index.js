import React, { useEffect, useState } from 'react'
import { columns, customSort } from './utils';

import DataTable from 'react-data-table-component';
import { FilterComponent } from '../UserTable/FilterComponent';
import LinearIndeterminate from '../UserTable/LinearIndeterminate';
import agent from '../../agent/agent'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    ...state
})
const mapDispatchToProps = dispatch => ({
    getHosts: () =>
        dispatch({ type: "GET_HOSTS", payload: agent.Host.getAll() })
});



const HostList = props => {
    // HOOKS
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [hosts, setHosts] = useState([]);
    const [pending, setpending] = useState(true);

    // the filter text is searched in all fields of each row
    const filteredItems = hosts.filter(
        item => item.pc && item.pc.props.children.toLowerCase().includes(filterText));

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
                <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
            </>);
    }, [filterText, resetPaginationToggle]);

    useEffect(() => {
        props.getHosts()
    }, [])

    // format and set the data
    useEffect(() => {
        let formated_hosts = []
        if (props.hosts.hosts) {
            props.hosts.hosts.map((h, index) => {
                formated_hosts.push({
                    id: index,
                    pc: <a href={`/host/${h}`}>{h}</a>
                })
            })
            setHosts(formated_hosts)
            setpending(false)
        }
    }, [props.hosts.hosts])

    return (
        <div>
            <h4>
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
            </h4>
        </div>
    )
}



export default connect(mapStateToProps, mapDispatchToProps)(HostList)
