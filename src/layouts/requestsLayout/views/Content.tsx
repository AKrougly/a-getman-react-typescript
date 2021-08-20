import React, { useState } from 'react';
import clsx from 'clsx';

import Toolbar from '@material-ui/core/Toolbar';
import { useTheme } from '@material-ui/core/styles';

import { useStyles } from "../../PageTemplate";
import ProgressBar from "../components/ProgressBar";
import NewItemByUrl from "../components/NewItemByUrl";
import RequestList from '../components/RequestList';

import { IItem } from "../../../stores/types";

export interface IContentProps {
  open: boolean;
  filter: boolean;
  items: IItem[];
  showProgressBar: boolean;
  addItem: (item: IItem) => void;
  changeItem: (item: IItem) => void;
  sendItem: (item: IItem, items: IItem[]) => void;
  importItems: (file: string) => void;
  exportItems: () => void;
}

const Content: React.FC<IContentProps> = ({
  open,
  filter,
  items, showProgressBar,
  addItem, changeItem,
  sendItem,
  importItems, exportItems,
}) => {
  // String to filter items
  const [filterValue, setFilterValue] = useState("");

  const handleFilterValue = (value: string) => { setFilterValue(value); };
  
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: !open,
      })}
    >
      <Toolbar />
      <NewItemByUrl
        filter={filter}
        items={items}
        onChangeFilterValue={handleFilterValue}
        addItem={addItem}
        importItems={importItems}
        exportItems={exportItems}
      />
      <ProgressBar
        showProgressBar={showProgressBar}
        items={items}
      />
      <RequestList
        filter={filter}
        filterValue={filterValue}
        items={items}
        onChangeFilterValue={handleFilterValue}
        addItem={addItem}
        changeItem={changeItem}
        sendItem={sendItem}
        importItems={importItems}
        exportItems={exportItems}
      />
    </main>
 );
}

export default Content;
