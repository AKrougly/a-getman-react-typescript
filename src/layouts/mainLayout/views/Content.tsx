import React from 'react';
import clsx from 'clsx';

import { useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import { useStyles } from "../../PageTemplate";

export type TContentProps = {
  open: boolean;
}

const Content: React.FC<TContentProps> = ({open}) => {

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
      <Toolbar />
      mainContent
    </main>
 );
}

export default Content;
