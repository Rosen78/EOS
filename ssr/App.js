import React from 'react';
import path from 'path';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Tabs from './components/tabs';
import {SimpleTableFunc} from './components/table';
import SimpleModalFunc from './components/modal';

export default class App extends React.Component {
    constructor(props){
        super(props)

        this.onTabClick = this.onTabClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.onClickButtonRow = this.onClickButtonRow.bind(this)
        this.handleRadioChange = this.handleRadioChange.bind(this)
        this.lazyLoad = this.lazyLoad.bind(this)

        this.state = {tabNumber: undefined, isOpenModal: false, tableRow: undefined, tablesData: [[], [], []], radioValue: undefined}
    }

    lazyLoad(tabNumber){
        let that = this;
        axios.get(`/tablesdata?tabnumber=${tabNumber}`)
        .then(function (response) {
            that.setState(state => {
                const tablesData = state.tablesData.map((tabData, ind) => {
                    if(tabNumber === ind){
                        return response.data
                    }
                    else {
                        return tabData
                    }
                })
                return {tabNumber, tablesData: tablesData}
            })
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
        });
    }

    onTabClick(tabNumber){
        if(tabNumber !== this.state.tabNumber){
            if(this.state.tablesData[tabNumber].length === 0){
                this.lazyLoad(tabNumber);
            } else {
                this.setState({tabNumber})
            }
        }
    }

    onClickButtonRow(ind){
        if(!this.state.isOpenModal){
            this.setState({isOpenModal: true, tableRow: ind})
        }
    };

    handleClose(radioValue){
        if(this.state.isOpenModal){
            if(radioValue !== undefined){
                this.setState(state => {
                    const newTabRow = Object.assign({}, state.tablesData[state.tabNumber][state.tableRow],
                        {[state.tablesData[state.tabNumber][0][0]]: radioValue})
                    const tablesData = state.tablesData.map((tabData, ind1) =>
                        tabData.map((rowData, ind2) => {
                        if (ind1 === state.tabNumber && ind2 === state.tableRow){
                            return newTabRow
                        } else {
                            return rowData
                        }
                    }))
                    return {isOpenModal: false,  radioValue: undefined, tablesData: tablesData}
                })
            } else {
                this.setState({isOpenModal: false, radioValue: undefined})
            }
        }
    };

    handleRadioChange(radioValue){
        if(this.state.radioValue !== radioValue){
            this.setState({radioValue: radioValue})
        }
    };

    render(){

        const tabsDesignData = [
            {
                tableName: 'Phones',
                onClickButtonRow: this.onClickButtonRow,
            },
            {
                tableName: 'Addresses',
                onClickButtonRow: this.onClickButtonRow,
            },
            {
                tableName: 'Other Contacts',
                onClickButtonRow: this.onClickButtonRow,
            }
        ]

        const modalLabels = [
            ['valid', 'unvalid', 'unknown'],
            ['visited', 'notVisited', 'unknown'],
            ['valid', 'unvalid', 'forDeletion']
        ]

        return (
    <Container>
      <Box my={4}>
          <Tabs onTabClick={this.onTabClick} tabNumberActive={this.state.tabNumber}></Tabs>

      { tabsDesignData.map((data, ind) => (
            (this.state.tabNumber === ind) && <SimpleTableFunc
                key={data.tableName}
                tableName={data.tableName}
                tabNumberActive={this.state.tabNumber}
                rowState={this.state.rowState}
                tablesDataPart={this.state.tablesData[ind]}
                onClickButtonRow={data.onClickButtonRow}
                >
            </SimpleTableFunc>
          ))}

          <SimpleModalFunc isOpen={this.state.isOpenModal}
          modalLabelsPart={modalLabels[this.state.tabNumber]}
          onClose={this.handleClose}
          radioValue={this.state.radioValue} handleRadioChange={this.handleRadioChange}></SimpleModalFunc>
      </Box>
    </Container>
  )};
}
