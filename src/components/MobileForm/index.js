import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MailRounded from '@material-ui/icons/MailRounded';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';


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

function MobileForm() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <div>
            <Fab color="secondary" aria-label="FormFab" className={classes.fab} onClick={handleClickOpen}>
                <MailRounded></MailRounded>
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Subscribe
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default MobileForm;
