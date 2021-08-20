import React from 'react';
import { Tabs, Tab } from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';

import NewItem from "../components/NewItem";
import RequestItem from "../components/RequestItem";

import { IItem } from "../../../stores/types";
import { useStyles } from "../../PageTemplate";

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export interface IRequestList {
  filter: boolean;
  filterValue: string;
  items: IItem[];
  onChangeFilterValue: (value: string) => void
  addItem: (item: IItem) => void;
  changeItem: (item: IItem) => void;
  sendItem: (item: IItem, items: IItem[]) => void;
  importItems: (file: string) => void;
  exportItems: () => void;
}

const RequestList: React.FC<IRequestList> = ({
  filter,
  filterValue,
  items,
  onChangeFilterValue,
  addItem, changeItem, sendItem,
  importItems, exportItems,
}) => {
  // Toogle to switch tab
  const [tabNum, setTabNum] = React.useState(0);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newTabNum: number) => {
    setTabNum(newTabNum);
  };
  
  const handleFilterValue = (value: string) => { onChangeFilterValue(value); };
  const handleSendItem = (item: IItem) => { sendItem(item, items); };

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.tabroot}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tabNum}
        onChange={handleChangeTab}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {items.map((item, index) => (
          <Tab key={item.uid} label={item.name} {...a11yProps(index)} />
        ))}
        <NewItem
          filter={filter}
          onChangeFilterValue={handleFilterValue}
          addItem={addItem}
          importItems={importItems}
          exportItems={exportItems}
        />
      </Tabs>
      {items.map((item, index) => (
        <RequestItem
          key={item.uid}
          item={item}
          tabNum={tabNum}
          index={index}
          sendItem={handleSendItem}
          changeItem={changeItem}
        />
      ))}
    </div>
  );
}

export default RequestList;
