import { ClearButton, TextField } from "./styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from 'react'
import { faBackspace, } from '@fortawesome/free-solid-svg-icons'

export const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <TextField id="search" type="text" placeholder="Filtrar por nombre" value={filterText} onChange={onFilter} />
        <ClearButton type="button" onClick={onClear}><FontAwesomeIcon icon={faBackspace}/></ClearButton>
    </>
);