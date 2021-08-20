import React from "react";
import {
  withSnackbar,
  WithSnackbarProps,
  SnackbarKey,
} from "notistack";
import {
  Button,
  Checkbox,
  IconButton,
  TextField,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
} from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleOutline';
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { HttpMethod, IItem, IHttpMethod } from "../../../stores/types";
import RequestItemExtra from "./RequestItemExtra";

const styles = (theme: Theme) => createStyles({
  Hidden: {
    visibility: "hidden"
  },
  Visible: {
    visibility: "visible"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60,
  },
  sendStarted: {
    color: "lightgray",
  },
  sendFinished: {
    color: "primary",
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{width: '100%'}}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{textAlign: 'left'}}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface IRequestItemProps extends WithSnackbarProps, WithStyles<typeof styles> {
  item: IItem
  tabNum: number
  index: number
  changeItem: (item: IItem) => void
  sendItem: (item: IItem) => void;
}

type TState = {
  edit: boolean;
  tabNum: number;
  snackbar?: SnackbarKey,
}

class RequestItem extends React.Component<IRequestItemProps, TState> {
  constructor(props: IRequestItemProps) {
    super(props);
    this.state = {
      edit: false,
      tabNum: 0,
      snackbar: null,
    };

    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleToggleItemCompleted = this.handleToggleItemCompleted.bind(this);
    this.handleSendItem = this.handleSendItem.bind(this);
    this.handleChangeHttpMethod = this.handleChangeHttpMethod.bind(this);
    this.handleChangeItemName = this.handleChangeItemName.bind(this);
    this.handleChangeItemUrl = this.handleChangeItemUrl.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
  }
  
  handleChangeTab = (event: React.ChangeEvent<{}>, newTabNum: number) => {
    this.setState({ tabNum: newTabNum });
  };
  
  handleToggleItemCompleted(event: React.MouseEvent<HTMLInputElement>) {
    this.props.changeItem({ ...this.props.item, completed: !this.props.item.completed });
  };

  handleSendItem = () => {
    this.props.sendItem(this.props.item);
  };

  handleChangeHttpMethod(
    event: React.ChangeEvent<{
        name?: string;
        value: unknown;
    }>, child: React.ReactNode) {
    this.props.changeItem({ ...this.props.item, httpMethod: event.currentTarget.value as IHttpMethod});
  };

  handleChangeItemName(event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) {
    this.props.changeItem({ ...this.props.item, name: event.currentTarget.value });
  };

  handleChangeItemUrl(event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) {
    this.props.changeItem({ ...this.props.item, url: event.currentTarget.value });
  };

  handleDelete() {
    this.props.changeItem({ ...this.props.item, deleted: true });
    const key = this.props.enqueueSnackbar("Item deleted", {
      action: (
        <Button color="inherit" onClick={this.handleUndo}>
          Undo
        </Button>
      )
    });
    this.setState({ snackbar: key });
  };

  handleUndo() {
    this.props.changeItem({ ...this.props.item, deleted: false });
    this.props.closeSnackbar(this.state.snackbar);
  };

  render () {
    return (
      <TabPanel key={this.props.item.uid} value={this.props.tabNum} index={this.props.index}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                title="Click to toggle"
                checked={this.props.item.completed}
                onClick={this.handleToggleItemCompleted}
              />
            </ListItemIcon>
            <IconButton
              onMouseDown={this.handleSendItem}
              title="Send item"
              className={this.props.item.sended === "SEND_STARTED" ?
                this.props.classes.sendStarted : this.props.classes.sendFinished}
            >
              <PlayCircleFilledIcon />
            </IconButton>
            <FormControl className={this.props.classes.formControl}>
              <InputLabel id="http-method">Http method</InputLabel>
              <Select
                labelId="http-method"
                id="http-method"
                value={this.props.item.httpMethod}
                onChange={this.handleChangeHttpMethod}
              >
                <MenuItem value={HttpMethod.GET}>Get</MenuItem>
                <MenuItem value={HttpMethod.POST}>Post</MenuItem>
                <MenuItem value={HttpMethod.JSON}>Json</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Name"
              name="Name"
              id={`Name-$this.props.item.uid`}
              value={this.props.item.name}
              onChange={this.handleChangeItemName}
            />
            {this.state.edit ? (
              <TextField
                label="Url"
                name="Url"
                id={`Url-$this.props.item.uid`}
                style={{width: '95%'}}
                autoFocus
                value={this.props.item.url}
                onBlur={() => this.setState({ edit: false })}
                onChange={this.handleChangeItemUrl}
              />
            ) : (
              <TextField 
                label="Url"
                name="Url"
                id={`Url-$this.props.item.uid`}
                style={{width: '95%'}}
                value={
                  this.props.item.url && this.props.item.url.length > 150
                    ? this.props.item.url.slice(0, 150)+' ...'
                    : this.props.item.url
                  }
                onClick={() => this.setState({ edit: true })}
              />
            )}
            {this.props.item.deleted ? (
              <ListItemSecondaryAction>
                <DeleteIcon />
              </ListItemSecondaryAction>
            ) : (
              <ListItemSecondaryAction
                className={this.state.edit ? this.props.classes.Visible : this.props.classes.Hidden}
              >
                <IconButton onMouseDown={this.handleDelete} title="Click to delete">
                  <CancelIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        </List>
        <RequestItemExtra item={this.props.item} />
      </TabPanel>
      //https://material-ui.com/ru/components/snackbars/
    );
  }
}

export default withStyles(styles, { withTheme: true })(withSnackbar(RequestItem));
