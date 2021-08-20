import React from "react";
import clsx from 'clsx';

import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import MenuIcon from "@material-ui/icons/Menu";
import Typography from '@material-ui/core/Typography';

import { useStyles } from "../../PageTemplate";

export type THeaderProps = {
  open: boolean;
  onOpen: () => void;
}

const Header: React.FC<THeaderProps> = ({ open, onOpen }) => {

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          title="Open"
          onClick={onOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          a-app
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
