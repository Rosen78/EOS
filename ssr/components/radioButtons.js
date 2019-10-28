import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default class RadioButtonsGroup extends React.Component {
    render() {
    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup name="radioOptions" value={this.props.radioValue}
                onChange={(event) => this.props.handleRadioChange(event.target.value)}>
                {this.props.modalLabelsPart.map(data => (
                    <FormControlLabel
                    key={data}
                    value={data}
                    control={<Radio color="primary" />}
                    label={data}
                    labelPlacement="start"
                    />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
        );
    }
}
