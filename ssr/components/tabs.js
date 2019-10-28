import React from 'react';
import ReactDOM from 'react-dom';

import Paper from '@material-ui/core/Paper';
import TabsWrapper from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const tabHeaders = ["Phones", "Addresses", "Other Contacts"];

export default class Tabs extends React.Component {

  render() {
    return (
       <Paper>
         <TabsWrapper
           centered
           value={this.props.tabNumberActive}
         >
         {tabHeaders.map((tabHeader, ind) => <Tab key={ind} onClick={() => this.props.onTabClick(ind)} label={tabHeader} />)}

         </TabsWrapper>
       </Paper>

    )
  }
}

