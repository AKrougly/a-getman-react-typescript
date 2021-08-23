import React from 'react';

import {
  ListSubheader,
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import CalculateIcon from '@material-ui/icons/Apps';
import SendIcon from '@material-ui/icons/Send';

import DrawerItem from "./DrawerItem";
import { useStyles } from "../../PageTemplate";

export const routeList = [
  // {
  //   header: "ListSubheader",
  //   items: [
  // {type: 'divider'},
  // {type: 'item', title: 'ItemName', href: '/', Icon: IconName}
  // ]
  // }
  {
    header: "",
    items: [
      { type: "item", title: "Requests", href: "/requests", Icon: SendIcon },
      { type: "item", title: "Calculator", href: "/calc", Icon: CalculateIcon },
      { type: "item", title: "Palette", href: "/palette", Icon: SettingsIcon },
    ]
  }
];

export interface IDrawerProps {
  open: boolean
  onClose: () => void
}

const PersistentDrawerLeft: React.FC<IDrawerProps> = ({ open, onClose }) => {  

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
        {routeList.map(
          ({ header, items }, listIndex) => (
            <List
              key={listIndex}
              subheader={<ListSubheader>{header}</ListSubheader>}
            >
              {items.map(
                (item, itemIndex) => (
                  <DrawerItem key={itemIndex} {...item} />
                )
              )}
            </List>
          )
        )}
    </Drawer>
  );
}

export default PersistentDrawerLeft;
