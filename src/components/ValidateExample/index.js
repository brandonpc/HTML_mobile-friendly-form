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
    Formik,
    // Form,
    // Field,
    // ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
// import { DisplayFormikState } from './formikHelper';
import MailRounded from '@material-ui/icons/MailRounded';
import Fab from '@material-ui/core/Fab';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MultipleChoiceQ from '../MultipleChoiceQ';

const styles = {

};

const contactFormEndpoint = process.env.REACT_APP_CONTACT_ENDPOINT;



function ValidateExample(props) {
    const { classes } = props;
    const [open, setOpen] = useState(false);
    const [isSubmissionCompleted, setSubmissionCompleted] = useState(false);

    function handleClose() {
        setOpen(false);
    }

    function handleClickOpen() {
        setSubmissionCompleted(false);
        setOpen(true);
    }

    const [state, setState] = React.useState({
        checked: false,
    });

    const switchChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

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
                {!isSubmissionCompleted &&
                    <React.Fragment>
                        <DialogTitle id="form-dialog-title">Contact</DialogTitle>
                        <DialogContent>
                            <Formik
                                initialValues={{ email: '', name: '', city: '', usstate: '', zip: '', phone: '' }}
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
                                        setSubmissionCompleted(true);
                                    }
                                    );
                                }}

                                validationSchema={Yup.object().shape({
                                    // use ex from Formik
                                    email: Yup.string()
                                        .email()
                                        .required('Required'),
                                    name: Yup.string()
                                        .required('Required'),
                                    city: Yup.string()
                                        .required('Required'),
                                    usstate: Yup.string()
                                        .required('Required')
                                        .min(4, 'Fun fact: no state has less than 4 characters')
                                        .max(15, 'Hold up! Too many characters for a US state'),

                                    zip: Yup.string()
                                        .required('Required')
                                        .min(5, 'That is a little short for a zip code')
                                        .max(5),
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
                                        // handleBlur,
                                        handleSubmit,
                                        handleReset,
                                    } = props;
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <TextField
                                                label="Name"
                                                name="name"
                                                className={classes.textField}
                                                value={values.name}
                                                onChange={handleChange}
                                                // onBlur={handleBlur}
                                                helperText={(errors.name && touched.name) && errors.name}
                                                margin="normal"
                                            />

                                            <TextField
                                                error={errors.email && touched.email}
                                                label="Email"
                                                name="email"
                                                className={classes.textField}
                                                value={values.email}
                                                onChange={handleChange}
                                                // onBlur={handleBlur}
                                                helperText={(errors.email && touched.email) && errors.email}
                                                margin="normal"
                                            />

                                            <TextField
                                                error={errors.city && touched.city}
                                                label="City"
                                                name="city"
                                                className={classes.textField}
                                                value={values.city}
                                                onChange={handleChange}
                                                // onBlur={handleBlur}
                                                helperText={(errors.city && touched.city) && errors.city}
                                                margin="normal"
                                            />
                                            <TextField
                                                error={errors.usstate && touched.usstate}
                                                label="State"
                                                name="usstate"
                                                className={classes.textField}
                                                value={values.usstate}
                                                onChange={handleChange}
                                                // onBlur={handleBlur}
                                                helperText={(errors.usstate && touched.usstate) && errors.usstate}
                                                margin="normal"
                                            />
                                            <TextField
                                                error={errors.zip && touched.zip}
                                                label="Zip Code"
                                                name="zip"
                                                className={classes.textField}
                                                value={values.zip}
                                                onChange={handleChange}
                                                // onBlur={handleBlur}
                                                helperText={(errors.zip && touched.zip) && errors.zip}
                                                margin="normal"
                                            />

                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={state.checkedB}
                                                        onChange={switchChange('checked')}
                                                        value="checked"
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />
                                                }
                                                label="I agree to get email updates, but will probably ignore them"
                                            />
                                            <MultipleChoiceQ />
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
                {isSubmissionCompleted &&
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