import React, { createRef, useState } from "react";
import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import UploadFileButton from "./uploadFile/UploadFileButton";
import DownloadStateButton from "./downloadState/DownloadStateButton";

import { IItem, initialItem } from "../../../stores/types";

const ref: React.RefObject<HTMLDivElement> = createRef();

interface INewItemByUrlProps {
  filter: boolean
  items: IItem[]
  onChangeFilterValue: (value: string) => void
  addItem: (item: IItem) => void
  importItems: (file: string) => void
  exportItems: () => void
}

const NewItemByUrl: React.FC<INewItemByUrlProps> = ({
  filter,
  items,
  onChangeFilterValue,
  addItem,
  importItems,
  exportItems,
}) => {
  const [urlValue, setUrlValue] = useState("");

  const handleAddItem = () => {
    addItem({ ...initialItem, name: "noname"+items.length, url: urlValue });
    setUrlValue("");
    onChangeFilterValue("");
    if (ref.current !== null) {
      ref.current.focus();
    }
  };

  function handleKeyPress({ key }) {
    if (key === "Enter") {
      handleAddItem();
    }
  }

  function handleChange({ target: { value } }) {
    setUrlValue(value);
    onChangeFilterValue(value);
  }

  return (
    <List>
      <ListItem>
        <TextField
          fullWidth
          label="Add an item"
          ref={ref}
          value={urlValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  title="Click to add"
                  disabled={filter || !urlValue.trim()}
                  onClick={handleAddItem}
                >
                  <AddCircleIcon />
                </IconButton>
                <UploadFileButton
                  disabled={filter || !!urlValue.trim()}
                  onImport={importItems}
                />
                <DownloadStateButton
                  disabled={filter}
                  onExport={exportItems}
                />
              </InputAdornment>
            )
          }}
        />
      </ListItem>
    </List>
  );
}

export default NewItemByUrl;