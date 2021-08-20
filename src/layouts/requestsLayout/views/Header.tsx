import React from "react";
import clsx from 'clsx';
import { RouteComponentProps, withRouter } from "react-router-dom";

import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from '@material-ui/core/Typography';

import { useStyles } from "../../PageTemplate";

interface IHeaderProps extends RouteComponentProps<any> {
  open: boolean
}

const Header: React.FC<IHeaderProps> = ({ open, history: { goBack } }) => {

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
          title="Go Back"
          onClick={() => goBack()}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          Requests
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);
