import React from "react";
import { AppBar, Tabs, Tab, Box, TextField } from "@material-ui/core";
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { IItem, SendStatus, } from "../../../stores/types";

function a11yProps(index: any) {
  return {
    id: `horizontal-tab-${index}`,
    'aria-controls': `horizontal-tabpanel-${index}`,
  };
}

const styles = (theme: Theme) => createStyles({
  tabroot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  responseFailure: {
    color: "red",
  },
  responseSuccess: {
    color: "primary",
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
  item: IItem;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      style={{width: '100%'}}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{textAlign: 'left', padding: 0}}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface IRequestItemExtraProps extends WithStyles<typeof styles> {
  item: IItem
}

type TState = {
  edit: boolean;
  tabNum: number;
}

class RequestItemExtra extends React.Component<IRequestItemExtraProps, TState> {
  constructor(props: IRequestItemExtraProps) {
    super(props);
    this.state = {
      edit: false,
      tabNum: 1,
    };

    this.handleChangeTab = this.handleChangeTab.bind(this);
  }
  
  handleChangeTab = (event: React.ChangeEvent<{}>, newTabNum: number) => {
    this.setState({ tabNum: newTabNum });
  };
  
  render () {
    return (
      <div>
        <AppBar position="static">
          <Tabs
            variant="fullWidth"
            value={this.state.tabNum}
            onChange={this.handleChangeTab}
            aria-label="Item extra tabs"
            className={this.props.classes.tabs}
            centered
          >
            {["params", "response", "body"].map((caption, index) => (
              <Tab
                key={caption}
                label={caption}
                {...a11yProps(index)}
                disabled={caption === "body"}
                className={this.props.item.sended === SendStatus.SEND_FAILURE ?
                  this.props.classes.responseFailure : this.props.classes.responseSuccess
                }
              />
            ))}
          </Tabs>
        </AppBar>
        {["params", "response", "body"].map((caption, index) => (
          <TabPanel
            key={caption}
            value={this.state.tabNum}
            index={index}
            item={this.props.item}
          >
            { caption === "response" &&
              <TextField
                fullWidth
                multiline={true}
                value={this.props.item.sended === SendStatus.SEND_FAILURE ?
                  this.props.item.error : this.props.item.response}
                error={this.props.item.sended === SendStatus.SEND_FAILURE ?
                  true : false }
                InputProps={{
                  className: this.props.item.sended === SendStatus.SEND_FAILURE ?
                    this.props.classes.responseFailure : this.props.classes.responseSuccess
                }}
              />
            }
          </TabPanel>
        ))}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RequestItemExtra);
