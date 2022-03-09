
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import RadioButtonsGroup from './radioButtons';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

class SimpleModal extends React.Component {

    constructor(props){
        super(props)

        this.handleRadioChangeNew = this.handleRadioChangeNew.bind(this)

        this.state = {radioValue: undefined}
    }

    handleRadioChangeNew(radioValue){
        if(this.state.radioValue !== radioValue){
            this.setState({radioValue: radioValue})
        }
    };

    render(){
    return (
            <Modal
            open={this.props.isOpen}
            onClose={() => this.props.onClose(this.state.radioValue)}
            >
                <div className={this.props.classes.paper}>
                  <RadioButtonsGroup 
                  modalLabelsPart={this.props.modalLabelsPart}
                  handleRadioChange={this.handleRadioChangeNew}
                >
                </RadioButtonsGroup>
                </div>
            </Modal>
        )};
}

export default function SimpleModalFunc(props) {
    const classes = useStyles();

    return (
        <SimpleModal classes={classes} isOpen={props.isOpen}
        modalLabelsPart={props.modalLabelsPart}
        onClose={props.onClose}
        radioValue={props.radioValue} handleRadioChange={props.handleRadioChange}></SimpleModal>
        );
}
