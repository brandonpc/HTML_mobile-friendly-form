import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const checkboxStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

function MultipleChoiceQ() {
    const multiChoiceQ = checkboxStyle();
    const [state, setState] = React.useState({
        call: false,
        text: false,
        email: false,
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    const { gilad, jason, antoine } = state;
    const error = [gilad, jason, antoine].filter(v => v).length !== 2;

    return (
        <div className={multiChoiceQ.root}>

            <FormControl required error={error} component="fieldset" className={multiChoiceQ.formControl}>
                <FormLabel component="legend">Preferred method of contact</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={gilad} onChange={handleChange('')} value="call" />}
                        label="I prefer you call"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={jason} onChange={handleChange('jason')} value="text" />}
                        label="I prefer you text"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={antoine} onChange={handleChange('antoine')} value="email" />
                        }
                        label="I prefer you email"
                    />
                </FormGroup>
                <FormHelperText>Pick Two</FormHelperText>
            </FormControl>
        </div>
    );
}

export default MultipleChoiceQ;