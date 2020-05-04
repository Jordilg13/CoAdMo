import React from 'react'
import {useStyles} from "./styles"
import { LinearProgress } from '@material-ui/core';

const LinearIndeterminate = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <LinearProgress />
        </div>
    );
};
export default LinearIndeterminate