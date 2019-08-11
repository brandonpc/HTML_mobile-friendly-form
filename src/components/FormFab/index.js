import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import MailRounded from '@material-ui/icons/MailRounded';
import MobileForm from '../MobileForm';

const useStyles = makeStyles(theme => ({
    fab: {
        margin: 0,
        top: "auto",
        right: 20,
        bottom: 20,
        left: "auto",
        position: "fixed",

    },

}));

function FormFab() {
    const classes = useStyles();

    return (
        <div>
            <Fab color="secondary" aria-label="edit" className={classes.fab}>
                <MailRounded></MailRounded>
            </Fab>
        </div>
    );
}

export default FormFab;
