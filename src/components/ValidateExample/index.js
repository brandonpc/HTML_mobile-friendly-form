import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import {
    Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
// import { DisplayFormikState } from './formikHelper';
import MailRounded from '@material-ui/icons/MailRounded';
import Fab from '@material-ui/core/Fab';

const styles = {

};

const contactFormEndpoint = process.env.REACT_APP_CONTACT_ENDPOINT;


function ValidateExample(props) {
    const { classes } = props;
    const [open, setOpen] = useState(false);
    const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);

    function handleClose() {
        setOpen(false);
    }

    function handleClickOpen() {
        setSubmitionCompleted(false);
        setOpen(true);
    }

    return (
        <React.Fragment>
            <Fab color="secondary" aria-label="FormFab" className={classes.fab} onClick={handleClickOpen}>
                <MailRounded></MailRounded>
            </Fab>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                {!isSubmitionCompleted &&
                    <React.Fragment>
                        <DialogTitle id="form-dialog-title">Contact</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Send us a comment!
              </DialogContentText>
                            <Formik
                                initialValues={{ email: '', name: '', comment: '' }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setSubmitting(true);
                                    axios.post(contactFormEndpoint,
                                        values,
                                        {
                                            headers: {
                                                'Access-Control-Allow-Origin': '*',
                                                'Content-Type': 'application/json',
                                            }
                                        },
                                    ).then((resp) => {
                                        setSubmitionCompleted(true);
                                    }
                                    );
                                }}

                                validationSchema={Yup.object().shape({
                                    // use ex from Formik
                                    email: Yup.string()
                                        .email()
                                        .required('Required'),
                                    name: Yup.string()
                                        .required('Required')
                                        .min(2, 'As far as we know, the shortest name is at least two letters'),
                                    city: Yup.string()
                                        .required('Required'),
                                    usstates: Yup.string()
                                        .required('Required')
                                        .min(4, 'Fun fact: no state has less than 4 characters')
                                        .max(15, 'Hold up! Too many characters for a US state'),

                                    zip: Yup.number()
                                        .required('Required')
                                        .min(5, 'That is a little short for a zip code')
                                        .max(5, 'Just the 5-digit zip code, thank you')
                                        .integer()
                                        .positive(),
                                    phone: Yup.number()
                                        .required('Required')
                                        .min(9, 'You are missing a few digits there')
                                        .max(9, 'Sorry, we should clarify: a 9-digit US number')
                                        .integer()
                                        .positive(),

                                })}
                            >
                                {(props) => {
                                    const {
                                        values,
                                        touched,
                                        errors,
                                        dirty,
                                        isSubmitting,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        handleReset,
                                    } = props;
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <TextField
                                                label="name"
                                                name="name"
                                                className={classes.textField}
                                                value={values.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.name && touched.name) && errors.name}
                                                margin="normal"
                                            />

                                            <TextField
                                                error={errors.email && touched.email}
                                                label="email"
                                                name="email"
                                                className={classes.textField}
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.email && touched.email) && errors.email}
                                                margin="normal"
                                            />

                                            <TextField
                                                label="comment"
                                                name="comment"
                                                className={classes.textField}
                                                value={values.comment}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                helperText={(errors.comment && touched.comment) && errors.comment}
                                                margin="normal"
                                            />
                                            <DialogActions>
                                                <Button
                                                    type="button"
                                                    className="outline"
                                                    onClick={handleReset}
                                                    disabled={!dirty || isSubmitting}
                                                >
                                                    Reset
                        </Button>
                                                <Button type="submit" disabled={isSubmitting}>
                                                    Submit
                        </Button>
                                                {/* <DisplayFormikState {...props} /> */}
                                            </DialogActions>
                                        </form>
                                    );
                                }}
                            </Formik>
                        </DialogContent>
                    </React.Fragment>
                }
                {isSubmitionCompleted &&
                    <React.Fragment>
                        <DialogTitle id="form-dialog-title">Thanks!</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Thanks
              </DialogContentText>
                            <DialogActions>
                                <Button
                                    type="button"
                                    className="outline"
                                    onClick={handleClose}
                                >
                                    Back to app
                  </Button>
                                {/* <DisplayFormikState {...props} /> */}
                            </DialogActions>
                        </DialogContent>
                    </React.Fragment>}
            </Dialog>
        </React.Fragment >
    );
}

export default withStyles(styles)(ValidateExample);